import 'server-only';

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function submitAdharaForm(
  formId: string,
  response_data: Record<string, string>,
  sourceUrl?: string
): Promise<{ ok: boolean; status: number; body: unknown }> {
  const baseUrl = process.env.ADHARA_BASE_URL;
  const apiKey = process.env.ADHARA_API_KEY;
  const workspaceId = process.env.ADHARA_WORKSPACE_ID;

  if (!baseUrl || !apiKey || !workspaceId) {
    throw new Error('Missing Adhara environment variables');
  }

  const response = await fetch(`${baseUrl}/api/v1/forms/${formId}/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': apiKey,
      'X-Workspace-ID': workspaceId,
    },
    body: JSON.stringify({ response_data, source_url: sourceUrl }),
  });

  const body = await response.json().catch(() => null);
  return { ok: response.ok, status: response.status, body };
}
