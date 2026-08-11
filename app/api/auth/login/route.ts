import { NextRequest, NextResponse } from 'next/server';
import { portalAuthUrl, setAuthCookies } from '@/app/lib/adhara-auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email?.trim() || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    const response = await fetch(portalAuthUrl('/login'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Adhara login failed:', response.status, errorText);
      return NextResponse.json({ error: 'Incorrect email or password.' }, { status: 401 });
    }

    const session = await response.json();
    await setAuthCookies(session);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
