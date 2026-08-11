import 'server-only';
import { cache } from 'react';
import { redirect } from 'next/navigation';
import { fetchAdharaCustomer, getSessionToken, isAuthBypassEnabled, type AdharaCustomer } from './adhara-auth';

/**
 * Verifies the current session against Adhara (a real API call — this is the
 * "secure" check, not just an optimistic cookie-presence check). Redirects to
 * /login if there's no valid session. Cached per-request so calling it from
 * multiple places in a render pass only hits Adhara once.
 */
export const verifySession = cache(async (): Promise<{ user: AdharaCustomer }> => {
  const sessionToken = await getSessionToken();

  if (!sessionToken) {
    // Lets the dashboard be previewed without signing up first. See
    // isAuthBypassEnabled's doc comment for exactly when this applies.
    if (isAuthBypassEnabled()) {
      return {
        user: {
          id: 'preview-user',
          email: 'preview@bodyunmuted.local',
          name: 'Madison (Preview)',
          onboarding_completed: true,
        },
      };
    }
    redirect('/login');
  }

  const user = await fetchAdharaCustomer(sessionToken);

  if (!user) {
    redirect('/login');
  }

  return { user };
});
