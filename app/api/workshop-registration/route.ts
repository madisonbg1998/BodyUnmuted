import { NextRequest, NextResponse } from 'next/server';
import { submitAdharaForm, validateEmail } from '@/app/lib/adhara-forms';
import { subscribeToConvertKit } from '@/app/lib/convertkit';

// Adhara "Fitness Plan Workshop Registration" form field IDs, set at creation time.
const FIELD_IDS = {
  fullName: 'full_name',
  email: 'email',
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

    const formId = process.env.ADHARA_WORKSHOP_FORM_ID;
    if (!formId) {
      console.error('Missing ADHARA_WORKSHOP_FORM_ID');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const result = await submitAdharaForm(
      formId,
      {
        [FIELD_IDS.fullName]: body.fullName,
        [FIELD_IDS.email]: body.email,
      },
      body.sourceUrl || request.headers.get('referer') || undefined
    );

    if (!result.ok) {
      console.error('Adhara workshop registration failed:', result.status, result.body);
      return NextResponse.json({ error: 'Failed to register' }, { status: result.status });
    }

    subscribeToConvertKit(body.email, body.fullName, process.env.CONVERTKIT_WORKSHOP_FORM_ID).catch((err) =>
      console.error('ConvertKit subscribe error:', err)
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Workshop registration error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
