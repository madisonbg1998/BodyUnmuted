import { NextRequest, NextResponse } from 'next/server';
import { submitAdharaForm, validateEmail } from '@/app/lib/adhara-forms';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { answers, sourceUrl } = body;

    if (!answers || typeof answers !== 'object') {
      return NextResponse.json({ error: 'Missing form answers.' }, { status: 400 });
    }
    if (!answers.full_name || !String(answers.full_name).trim()) {
      return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 });
    }
    if (!answers.email || !validateEmail(answers.email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const formId = process.env.ADHARA_INTAKE_FORM_ID;
    if (!formId) {
      console.error('Missing ADHARA_INTAKE_FORM_ID');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const response_data: Record<string, string> = {};
    for (const [key, value] of Object.entries(answers)) {
      if (value === undefined || value === null || value === '') continue;
      response_data[key] = Array.isArray(value) ? value.join(', ') : String(value);
    }

    const result = await submitAdharaForm(formId, response_data, sourceUrl || request.headers.get('referer') || undefined);

    if (!result.ok) {
      console.error('Adhara intake submission failed:', result.status, result.body);
      return NextResponse.json({ error: 'Failed to submit intake form' }, { status: result.status });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Intake submission error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
