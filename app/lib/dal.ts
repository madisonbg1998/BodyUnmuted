import 'server-only';
import { cache } from 'react';
import { redirect } from 'next/navigation';
import { fetchAdharaUser, getAccessToken, type AdharaUser } from './adhara-auth';

/**
 * Verifies the current session against Adhara (a real API call — this is the
 * "secure" check, not just an optimistic cookie-presence check). Redirects to
 * /login if there's no valid session. Cached per-request so calling it from
 * multiple places in a render pass only hits Adhara once.
 */
export const verifySession = cache(async (): Promise<{ user: AdharaUser }> => {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    // TEMPORARY: preview the dashboard locally while Adhara login is still
    // being sorted out. Only ever active in `next dev` — never in a
    // production build/deploy. Remove once real login works end-to-end.
    if (process.env.NODE_ENV !== 'production') {
      return {
        user: {
          id: 'preview-user',
          email: 'preview@bodyunmuted.local',
          full_name: 'Madison (Preview)',
        },
      };
    }
    redirect('/login');
  }

  const user = await fetchAdharaUser(accessToken);

  if (!user) {
    redirect('/login');
  }

  return { user };
});
