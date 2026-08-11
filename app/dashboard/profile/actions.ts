'use server';

import { revalidatePath } from 'next/cache';
import { getSessionToken } from '@/app/lib/adhara-auth';
import { updateProfile } from '@/app/lib/adhara-portal';

export interface ProfileActionState {
  error: string | null;
  success: boolean;
}

const SOCIAL_PLATFORMS = ['instagram', 'twitter', 'linkedin', 'website'] as const;

export async function updateProfileAction(
  _prevState: ProfileActionState,
  formData: FormData
): Promise<ProfileActionState> {
  const sessionToken = await getSessionToken();
  if (!sessionToken) {
    return { error: 'Your session has expired. Please log in again.', success: false };
  }

  const socialLinks: Record<string, string> = {};
  for (const platform of SOCIAL_PLATFORMS) {
    const value = formData.get(`social_${platform}`);
    if (typeof value === 'string' && value.trim()) socialLinks[platform] = value.trim();
  }

  try {
    await updateProfile(sessionToken, {
      name: String(formData.get('name') || '').trim() || undefined,
      headline: String(formData.get('headline') || '').trim() || undefined,
      avatar_url: String(formData.get('avatar_url') || '').trim() || undefined,
      bio: String(formData.get('bio') || '').trim() || undefined,
      location: String(formData.get('location') || '').trim() || undefined,
      social_links: socialLinks,
      profile_visibility: String(formData.get('profile_visibility') || 'public'),
      show_in_directory: formData.get('show_in_directory') === 'on',
    });
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Could not update your profile.', success: false };
  }

  revalidatePath('/dashboard/profile');
  revalidatePath('/dashboard'); // greeting/settings both read the customer's name
  revalidatePath('/dashboard/settings');
  return { error: null, success: true };
}
