import { NextResponse } from 'next/server';
import { clearAuthCookies, getSessionToken, portalAuthUrl } from '@/app/lib/adhara-auth';

export async function POST() {
  const sessionToken = await getSessionToken();

  if (sessionToken) {
    try {
      await fetch(portalAuthUrl('/logout'), {
        method: 'POST',
        headers: { Authorization: `Bearer ${sessionToken}` },
      });
    } catch (error) {
      console.error('Adhara logout call failed (clearing local session anyway):', error);
    }
  }

  await clearAuthCookies();
  return NextResponse.json({ success: true });
}
