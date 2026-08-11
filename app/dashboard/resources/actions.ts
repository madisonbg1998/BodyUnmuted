'use server';

import { getSessionToken } from '@/app/lib/adhara-auth';
import { fetchResourceDownloadUrl } from '@/app/lib/adhara-portal';

export async function getResourceDownloadUrlAction(resourceId: string): Promise<string | null> {
  const sessionToken = await getSessionToken();
  if (!sessionToken) return null;
  return fetchResourceDownloadUrl(sessionToken, resourceId);
}
