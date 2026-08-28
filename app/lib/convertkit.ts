import 'server-only';

export async function subscribeToConvertKit(
  email: string,
  firstName: string | undefined,
  formId: string | undefined,
  fields?: Record<string, string>
): Promise<{ ok: boolean }> {
  const apiKey = process.env.CONVERTKIT_API_KEY;

  if (!apiKey || !formId) {
    console.error('Missing ConvertKit environment variables');
    return { ok: false };
  }

  const response = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_key: apiKey,
      email,
      ...(firstName ? { first_name: firstName } : {}),
      ...(fields && Object.keys(fields).length > 0 ? { fields } : {}),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('ConvertKit subscribe failed:', response.status, errorText);
    return { ok: false };
  }

  return { ok: true };
}

/**
 * Enrolls an existing (or new) subscriber directly into a sequence —
 * bypasses Kit's visual-automation builder entirely, since Kit's API has no
 * endpoint to create/configure automations. The caller decides which
 * sequence based on whatever branching logic it needs (e.g. quiz result).
 */
export async function subscribeToConvertKitSequence(
  email: string,
  firstName: string | undefined,
  sequenceId: string | undefined
): Promise<{ ok: boolean }> {
  const apiKey = process.env.CONVERTKIT_API_KEY;

  if (!apiKey || !sequenceId) {
    console.error('Missing ConvertKit environment variables (sequence)');
    return { ok: false };
  }

  const response = await fetch(`https://api.convertkit.com/v3/sequences/${sequenceId}/subscribe`, {
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
    console.error('ConvertKit sequence subscribe failed:', response.status, errorText);
    return { ok: false };
  }

  return { ok: true };
}
