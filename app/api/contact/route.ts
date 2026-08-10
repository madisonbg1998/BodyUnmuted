import { NextRequest, NextResponse } from 'next/server';

// Adhara "Contact Us" form (dfcd42ea-bc46-453b-8309-035f99521b50) field IDs,
// from GET /api/v1/forms/{id}/schema
const FIELD_IDS = {
  fullName: 's13tdw5rr',
  email: 'xc0p0a88h',
  phone: 'dwl6pv89k',
  instagram: 'field-79ecd561',
  message: 'oj6bc8us4',
};

const REQUIRED_FIELDS = ['fullName', 'email'] as const;

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

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

    const baseUrl = process.env.ADHARA_BASE_URL;
    const formId = process.env.ADHARA_CONTACT_FORM_ID;
    const apiKey = process.env.ADHARA_API_KEY;
    const workspaceId = process.env.ADHARA_WORKSPACE_ID;

    if (!baseUrl || !formId || !apiKey) {
      console.error('Missing Adhara environment variables for contact form');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const response_data: Record<string, string> = {};
    for (const [key, fieldId] of Object.entries(FIELD_IDS)) {
      const value = body[key];
      if (value) response_data[fieldId] = value;
    }

    const response = await fetch(`${baseUrl}/api/v1/forms/${formId}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
        ...(workspaceId ? { 'X-Workspace-ID': workspaceId } : {}),
      },
      body: JSON.stringify({
        response_data,
        source_url: body.sourceUrl || request.headers.get('referer') || undefined,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Adhara contact submission failed:', response.status, errorText);
      return NextResponse.json({ error: 'Failed to send message' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
