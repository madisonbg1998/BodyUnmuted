import { NextResponse } from 'next/server';
import { clearAuthCookies, getAccessToken } from '@/app/lib/adhara-auth';

export async function POST() {
  const baseUrl = process.env.ADHARA_BASE_URL;
  const accessToken = await getAccessToken();

  if (baseUrl && accessToken) {
    try {
      await fetch(`${baseUrl}/api/v1/auth/logout`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    } catch (error) {
      console.error('Adhara logout call failed (clearing local session anyway):', error);
    }
  }

  await clearAuthCookies();
  return NextResponse.json({ success: true });
}
