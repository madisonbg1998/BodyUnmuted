import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { convertkitLeadAdapter } from './convertkitLeadAdapter';
import type { LeadCapturePayload } from '../types';

function samplePayload(): LeadCapturePayload {
  return {
    primaryResult: 'A',
    secondaryResult: 'B',
    scores: { A: 6, B: 5, C: 0, D: 0 },
    goal: 'fat_loss',
    firstName: 'Jamie',
    email: 'jamie@example.com',
    consent: true,
    completedAt: new Date().toISOString(),
  };
}

describe('convertkitLeadAdapter', () => {
  let fetchSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchSpy = vi.fn();
    // @ts-expect-error — stubbing global fetch for the test environment
    globalThis.fetch = fetchSpy;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    // @ts-expect-error — cleanup
    delete globalThis.fetch;
  });

  it('POSTs the full payload as JSON to /api/ffa-lead', async () => {
    fetchSpy.mockResolvedValue({ ok: true });
    const payload = samplePayload();

    await convertkitLeadAdapter.submit(payload);

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    const [url, init] = fetchSpy.mock.calls[0];
    expect(url).toBe('/api/ffa-lead');
    expect(init.method).toBe('POST');
    expect(init.headers).toEqual({ 'Content-Type': 'application/json' });
    expect(JSON.parse(init.body)).toEqual(payload);
  });

  it('resolves with { success: true } on a 2xx response', async () => {
    fetchSpy.mockResolvedValue({ ok: true });
    const result = await convertkitLeadAdapter.submit(samplePayload());
    expect(result).toEqual({ success: true });
  });

  it('throws when the response is not ok', async () => {
    fetchSpy.mockResolvedValue({ ok: false, status: 502 });
    await expect(convertkitLeadAdapter.submit(samplePayload())).rejects.toThrow();
  });

  it('propagates a network-level rejection (e.g. offline)', async () => {
    fetchSpy.mockRejectedValue(new Error('network error'));
    await expect(convertkitLeadAdapter.submit(samplePayload())).rejects.toThrow('network error');
  });
});
