import { NextRequest, NextResponse } from 'next/server';
import { submitAdharaForm, validateEmail } from '@/app/lib/adhara-forms';

// Adhara "Footer Quick Contact" form field IDs, set at creation time.
const FIELD_IDS = {
  fullName: 'full_name',
  email: 'email',
  message: 'message',
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
    if (!body.message || !body.message.trim()) {
      return NextResponse.json({ error: 'Please enter a message.' }, { status: 400 });
    }

    const formId = process.env.ADHARA_FOOTER_CONTACT_FORM_ID;
    if (!formId) {
      console.error('Missing ADHARA_FOOTER_CONTACT_FORM_ID');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const result = await submitAdharaForm(
      formId,
      {
        [FIELD_IDS.fullName]: body.fullName,
        [FIELD_IDS.email]: body.email,
        [FIELD_IDS.message]: body.message,
      },
      body.sourceUrl || request.headers.get('referer') || undefined
    );

    if (!result.ok) {
      console.error('Adhara footer contact submission failed:', result.status, result.body);
      return NextResponse.json({ error: 'Failed to send message' }, { status: result.status });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Footer contact submission error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
