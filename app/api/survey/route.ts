import { NextRequest, NextResponse } from 'next/server';
import { submitAdharaForm, validateEmail } from '@/app/lib/adhara-forms';
import { subscribeToConvertKit } from '@/app/lib/convertkit';

// Adhara "Market Research Survey" form field IDs, set at creation time via
// POST /api/v1/workspaces/{id}/forms.
const FIELD_IDS = {
  name: 'name',
  email: 'email',
  biggestChallenge: 'biggest_challenge',
  alreadyTried: 'already_tried',
  sustainableVision: 'sustainable_vision',
  topThreeHelp: 'top_three_help',
  supportPreferences: 'support_preferences',
  emailOptIn: 'email_opt_in',
};

const REQUIRED_FIELDS = [
  'name',
  'email',
  'biggestChallenge',
  'alreadyTried',
  'sustainableVision',
  'topThreeHelp',
  'supportPreferences',
  'emailOptIn',
] as const;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const missing = REQUIRED_FIELDS.filter(
      (field) => !body[field] || (typeof body[field] === 'string' && body[field].trim() === '')
    );

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(', ')}` },
        { status: 400 }
      );
    }

    if (!validateEmail(body.email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    if (body.emailOptIn !== 'yes' && body.emailOptIn !== 'no') {
      return NextResponse.json({ error: 'Invalid opt-in value' }, { status: 400 });
    }

    const formId = process.env.ADHARA_SURVEY_FORM_ID;
    if (!formId) {
      console.error('Missing ADHARA_SURVEY_FORM_ID');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const response_data: Record<string, string> = {};
    for (const [key, fieldId] of Object.entries(FIELD_IDS)) {
      const value = body[key];
      if (value) response_data[fieldId] = value;
    }

    const result = await submitAdharaForm(
      formId,
      response_data,
      body.sourceUrl || request.headers.get('referer') || undefined
    );

    if (!result.ok) {
      console.error('Adhara survey submission failed:', result.status, result.body);
      return NextResponse.json({ error: 'Failed to submit survey' }, { status: result.status });
    }

    if (body.emailOptIn === 'yes') {
      subscribeToConvertKit(body.email, body.name, process.env.CONVERTKIT_SURVEY_FORM_ID).catch((err) =>
        console.error('ConvertKit subscribe error:', err)
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Survey submission error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
