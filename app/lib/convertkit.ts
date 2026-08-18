import 'server-only';

export async function subscribeToConvertKit(email: string, firstName: string | undefined, formId: string | undefined): Promise<void> {
  const apiKey = process.env.CONVERTKIT_API_KEY;

  if (!apiKey || !formId) {
    console.error('Missing ConvertKit environment variables');
    return;
  }

  const response = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_key: apiKey,
      email,
      ...(firstName ? { first_name: firstName } : {}),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('ConvertKit subscribe failed:', response.status, errorText);
  }
}
