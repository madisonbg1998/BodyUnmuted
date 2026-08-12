import { NextRequest, NextResponse } from 'next/server';
import { submitAdharaForm, validateEmail } from '@/app/lib/adhara-forms';

// Adhara "Founding Membership Checkout Started" form field IDs, set at
// creation time — reused here as a lead-capture backup in case someone
// abandons Stripe checkout.
const CHECKOUT_FIELD_IDS = {
  fullName: 'full_name',
  email: 'email',
  phone: 'phone',
};

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
    const checkoutFormId = process.env.ADHARA_CHECKOUT_STARTED_FORM_ID;
    const priceId = process.env.ADHARA_MEMBERSHIP_PRICE_ID;

    if (!baseUrl || !apiKey || !workspaceId || !priceId) {
      console.error('Missing Adhara environment variables for join checkout');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const siteUrl = body.sourceUrl ? new URL(body.sourceUrl).origin : request.nextUrl.origin;

    // Capture the lead in the CRM before sending them to Stripe, so an
    // abandoned checkout is still a lead, not a lost one.
    if (checkoutFormId) {
      const response_data: Record<string, string> = {
        [CHECKOUT_FIELD_IDS.fullName]: fullName,
        [CHECKOUT_FIELD_IDS.email]: email,
      };
      if (phone) response_data[CHECKOUT_FIELD_IDS.phone] = phone;

      submitAdharaForm(checkoutFormId, response_data, body.sourceUrl).catch((err) =>
        console.error('Adhara lead-capture submission failed:', err)
      );
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
