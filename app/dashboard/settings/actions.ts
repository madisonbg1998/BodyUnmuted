'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { clearAuthCookies, fetchAdharaCustomer, getSessionToken } from '@/app/lib/adhara-auth';
import { deleteAccount, requestPasswordReset, submitPreferencesStep } from '@/app/lib/adhara-portal';

export interface SettingsActionState {
  error: string | null;
  success: string | null;
}

export async function updateNotificationPreferencesAction(
  _prevState: SettingsActionState,
  formData: FormData
): Promise<SettingsActionState> {
  const sessionToken = await getSessionToken();
  if (!sessionToken) return { error: 'Your session has expired. Please log in again.', success: null };

  try {
    await submitPreferencesStep(sessionToken, {
      email_notifications: formData.get('email_notifications') === 'on',
      push_notifications: formData.get('push_notifications') === 'on',
      digest_frequency: String(formData.get('digest_frequency') || 'weekly'),
    });
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Could not save preferences.', success: null };
  }

  revalidatePath('/dashboard/settings');
  return { error: null, success: 'Notification preferences saved.' };
}

// Deliberately ignores any client input for the recipient — the reset link
// always goes to the account's own email, derived from the session, never
// from the request. See the Server Actions security note on not trusting
// client-supplied identity.
export async function sendPasswordResetAction(
  _prevState: SettingsActionState,
  _formData: FormData
): Promise<SettingsActionState> {
  const sessionToken = await getSessionToken();
  if (!sessionToken) return { error: 'Your session has expired. Please log in again.', success: null };

  const customer = await fetchAdharaCustomer(sessionToken);
  if (!customer) return { error: 'Could not verify your account.', success: null };

  try {
    await requestPasswordReset(customer.email);
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Could not send the reset email.', success: null };
  }

  return { error: null, success: `Check ${customer.email} for a password reset link.` };
}

export async function deleteAccountAction(
  _prevState: SettingsActionState,
  formData: FormData
): Promise<SettingsActionState> {
  const sessionToken = await getSessionToken();
  if (!sessionToken) return { error: 'Your session has expired. Please log in again.', success: null };

  if (String(formData.get('confirm') || '') !== 'DELETE') {
    return { error: 'Type DELETE to confirm.', success: null };
  }

  try {
    await deleteAccount(sessionToken);
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Could not delete your account.', success: null };
  }

  await clearAuthCookies();
  redirect('/login');
}
