import { NextRequest, NextResponse } from 'next/server';
import { setAuthCookies } from '@/app/lib/adhara-auth';

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

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 });
    }

    const baseUrl = process.env.ADHARA_BASE_URL;
    if (!baseUrl) {
      console.error('Missing ADHARA_BASE_URL environment variable');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const response = await fetch(`${baseUrl}/api/v1/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, full_name: name }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Adhara signup failed:', response.status, errorText);
      const message = response.status === 409 ? 'An account with this email already exists.' : 'Could not create your account.';
      return NextResponse.json({ error: message }, { status: response.status });
    }

    const tokens = await response.json();
    await setAuthCookies(tokens);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
