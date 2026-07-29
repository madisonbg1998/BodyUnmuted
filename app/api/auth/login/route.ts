import { NextRequest, NextResponse } from 'next/server';
import { setAuthCookies } from '@/app/lib/adhara-auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email?.trim() || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    const baseUrl = process.env.ADHARA_BASE_URL;
    if (!baseUrl) {
      console.error('Missing ADHARA_BASE_URL environment variable');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const response = await fetch(`${baseUrl}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ username: email, password }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Adhara login failed:', response.status, errorText);
      return NextResponse.json({ error: 'Incorrect email or password.' }, { status: 401 });
    }

    const tokens = await response.json();
    await setAuthCookies(tokens);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
