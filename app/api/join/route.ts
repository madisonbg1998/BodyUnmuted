import { NextRequest, NextResponse } from 'next/server';

// Adhara "Contact Us" form (dfcd42ea-bc46-453b-8309-035f99521b50) field IDs,
// from GET /api/v1/forms/{id}/schema — reused here as a lead-capture backup
// in case someone abandons Stripe checkout.
const CONTACT_FIELD_IDS = {
  fullName: 's13tdw5rr',
  email: 'xc0p0a88h',
  phone: 'dwl6pv89k',
  message: 'oj6bc8us4',
};

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, phone } = body;

    if (!fullName || !fullName.trim()) {
      return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 });
    }
    if (!email || !validateEmail(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const baseUrl = process.env.ADHARA_BASE_URL;
    const apiKey = process.env.ADHARA_API_KEY;
    const workspaceId = process.env.ADHARA_WORKSPACE_ID;
    const contactFormId = process.env.ADHARA_CONTACT_FORM_ID;
    const priceId = process.env.ADHARA_MEMBERSHIP_PRICE_ID;

    if (!baseUrl || !apiKey || !workspaceId || !priceId) {
      console.error('Missing Adhara environment variables for join checkout');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const siteUrl = body.sourceUrl ? new URL(body.sourceUrl).origin : request.nextUrl.origin;

    // Capture the lead in the CRM before sending them to Stripe, so an
    // abandoned checkout is still a lead, not a lost one.
    if (contactFormId) {
      const response_data: Record<string, string> = {
        [CONTACT_FIELD_IDS.fullName]: fullName,
        [CONTACT_FIELD_IDS.email]: email,
        [CONTACT_FIELD_IDS.message]: 'Started Founding Membership checkout',
      };
      if (phone) response_data[CONTACT_FIELD_IDS.phone] = phone;

      fetch(`${baseUrl}/api/v1/forms/${contactFormId}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
          'X-Workspace-ID': workspaceId,
        },
        body: JSON.stringify({ response_data, source_url: body.sourceUrl }),
      }).catch((err) => console.error('Adhara lead-capture submission failed:', err));
    }

    const checkoutResponse = await fetch(`${baseUrl}/api/v1/commerce/checkout?workspace_id=${workspaceId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      body: JSON.stringify({
        mode: 'subscription',
        line_items: [{ price_id: priceId, quantity: 1 }],
        customer_email: email,
        success_url: `${siteUrl}/join/success`,
        cancel_url: `${siteUrl}/join`,
      }),
    });

    if (!checkoutResponse.ok) {
      const errorText = await checkoutResponse.text();
      console.error('Adhara checkout session failed:', checkoutResponse.status, errorText);
      return NextResponse.json({ error: 'Failed to start checkout' }, { status: checkoutResponse.status });
    }

    const checkoutData = await checkoutResponse.json();
    return NextResponse.json({ checkoutUrl: checkoutData.checkout_url });
  } catch (error) {
    console.error('Join checkout error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
