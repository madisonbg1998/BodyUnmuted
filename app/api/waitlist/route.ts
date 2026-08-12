import { NextRequest, NextResponse } from 'next/server';
import { submitAdharaForm, validateEmail } from '@/app/lib/adhara-forms';

// Adhara "Membership Waitlist" form field IDs, set at creation time.
const FIELD_IDS = {
  fullName: 'full_name',
  email: 'email',
  phone: 'phone',
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.fullName || !body.fullName.trim()) {
      return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 });
    }
    if (!body.email || !validateEmail(body.email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const formId = process.env.ADHARA_WAITLIST_FORM_ID;
    if (!formId) {
      console.error('Missing ADHARA_WAITLIST_FORM_ID');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const response_data: Record<string, string> = {
      [FIELD_IDS.fullName]: body.fullName,
      [FIELD_IDS.email]: body.email,
    };
    if (body.phone) response_data[FIELD_IDS.phone] = body.phone;

    const result = await submitAdharaForm(
      formId,
      response_data,
      body.sourceUrl || request.headers.get('referer') || undefined
    );

    if (!result.ok) {
      console.error('Adhara waitlist submission failed:', result.status, result.body);
      return NextResponse.json({ error: 'Failed to join the waitlist' }, { status: result.status });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Waitlist submission error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
