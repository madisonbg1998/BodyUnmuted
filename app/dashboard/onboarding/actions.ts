'use server';

import { revalidatePath } from 'next/cache';
import { getSessionToken } from '@/app/lib/adhara-auth';
import {
  completeOnboarding,
  skipOnboarding,
  submitAboutStep,
  submitPreferencesStep,
  submitSocialStep,
  submitWelcomeStep,
} from '@/app/lib/adhara-portal';

export interface OnboardingActionState {
  error: string | null;
  nextStep: string | null;
  completed: boolean;
}

const EXPIRED_SESSION: OnboardingActionState = {
  error: 'Your session has expired. Please log in again.',
  nextStep: null,
  completed: false,
};

export async function submitWelcomeStepAction(
  _prevState: OnboardingActionState,
  formData: FormData
): Promise<OnboardingActionState> {
  const sessionToken = await getSessionToken();
  if (!sessionToken) return EXPIRED_SESSION;

  try {
    const result = await submitWelcomeStep(sessionToken, {
      name: String(formData.get('name') || '').trim() || undefined,
      headline: String(formData.get('headline') || '').trim() || undefined,
    });
    revalidatePath('/dashboard/onboarding');
    revalidatePath('/dashboard');
    return { error: null, nextStep: result.next_step ?? null, completed: result.onboarding_completed };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Could not save.', nextStep: null, completed: false };
  }
}

export async function submitAboutStepAction(
  _prevState: OnboardingActionState,
  formData: FormData
): Promise<OnboardingActionState> {
  const sessionToken = await getSessionToken();
  if (!sessionToken) return EXPIRED_SESSION;

  try {
    const result = await submitAboutStep(sessionToken, {
      bio: String(formData.get('bio') || '').trim() || undefined,
      location: String(formData.get('location') || '').trim() || undefined,
    });
    revalidatePath('/dashboard/onboarding');
    return { error: null, nextStep: result.next_step ?? null, completed: result.onboarding_completed };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Could not save.', nextStep: null, completed: false };
  }
}

export async function submitSocialStepAction(
  _prevState: OnboardingActionState,
  formData: FormData
): Promise<OnboardingActionState> {
  const sessionToken = await getSessionToken();
  if (!sessionToken) return EXPIRED_SESSION;

  const socialLinks: Record<string, string> = {};
  for (const platform of ['instagram', 'twitter', 'linkedin', 'website']) {
    const value = formData.get(`social_${platform}`);
    if (typeof value === 'string' && value.trim()) socialLinks[platform] = value.trim();
  }

  try {
    const result = await submitSocialStep(sessionToken, socialLinks);
    revalidatePath('/dashboard/onboarding');
    revalidatePath('/dashboard/profile');
    return { error: null, nextStep: result.next_step ?? null, completed: result.onboarding_completed };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Could not save.', nextStep: null, completed: false };
  }
}

export async function submitPreferencesStepAction(
  _prevState: OnboardingActionState,
  formData: FormData
): Promise<OnboardingActionState> {
  const sessionToken = await getSessionToken();
  if (!sessionToken) return EXPIRED_SESSION;

  try {
    const result = await submitPreferencesStep(sessionToken, {
      email_notifications: formData.get('email_notifications') === 'on',
      push_notifications: formData.get('push_notifications') === 'on',
      digest_frequency: String(formData.get('digest_frequency') || 'weekly'),
    });

    // Preferences is the last step in this wizard — finish onboarding
    // explicitly rather than assuming the backend infers completion from it.
    if (!result.onboarding_completed) {
      await completeOnboarding(sessionToken);
    }

    revalidatePath('/dashboard/onboarding');
    revalidatePath('/dashboard');
    return { error: null, nextStep: null, completed: true };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Could not save.', nextStep: null, completed: false };
  }
}

export async function skipOnboardingAction(
  _prevState: OnboardingActionState,
  _formData: FormData
): Promise<OnboardingActionState> {
  const sessionToken = await getSessionToken();
  if (!sessionToken) return EXPIRED_SESSION;

  try {
    await skipOnboarding(sessionToken);
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Could not skip onboarding.', nextStep: null, completed: false };
  }

  revalidatePath('/dashboard/onboarding');
  return { error: null, nextStep: null, completed: true };
}
