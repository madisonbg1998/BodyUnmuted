import { NextRequest, NextResponse } from 'next/server';
import { submitAdharaForm, validateEmail } from '@/app/lib/adhara-forms';

// Adhara "1:1 Coaching Application" form field IDs, set at creation time.
const FIELD_IDS = {
  fullName: 'full_name',
  email: 'email',
  instagram: 'instagram',
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
      return NextResponse.json({ error: 'Tell me a little about why you want to work together.' }, { status: 400 });
    }

    const formId = process.env.ADHARA_COACHING_APPLICATION_FORM_ID;
    if (!formId) {
      console.error('Missing ADHARA_COACHING_APPLICATION_FORM_ID');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const response_data: Record<string, string> = {
      [FIELD_IDS.fullName]: body.fullName,
      [FIELD_IDS.email]: body.email,
      [FIELD_IDS.message]: body.message,
    };
    if (body.instagram) response_data[FIELD_IDS.instagram] = body.instagram;

    const result = await submitAdharaForm(
      formId,
      response_data,
      body.sourceUrl || request.headers.get('referer') || undefined
    );

    if (!result.ok) {
      console.error('Adhara coaching application failed:', result.status, result.body);
      return NextResponse.json({ error: 'Failed to send your application' }, { status: result.status });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Coaching application error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
