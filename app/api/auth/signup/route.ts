import { NextRequest, NextResponse } from 'next/server';
import { portalAuthUrl, setAuthCookies } from '@/app/lib/adhara-auth';
import { isStrongPassword, PASSWORD_REQUIREMENTS_MESSAGE } from '@/app/lib/password';

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name?.trim() || !email?.trim() || !password) {
      return NextResponse.json({ error: 'Name, email, and password are required.' }, { status: 400 });
    }

    if (!validateEmail(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    if (!isStrongPassword(password)) {
      return NextResponse.json({ error: PASSWORD_REQUIREMENTS_MESSAGE }, { status: 400 });
    }

    const response = await fetch(portalAuthUrl('/register'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Adhara signup failed:', response.status, errorText);

      let detail = '';
      try {
        detail = JSON.parse(errorText)?.detail ?? '';
      } catch {
        // Non-JSON error body (e.g. rate limit response) — fall through to the generic message.
      }

      const message = detail.toLowerCase().includes('already registered')
        ? 'An account with this email already exists.'
        : 'Could not create your account.';
      return NextResponse.json({ error: message }, { status: response.status });
    }

    const session = await response.json();
    await setAuthCookies(session);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
