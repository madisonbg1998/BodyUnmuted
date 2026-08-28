import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MOCK_ADAPTER_ACTIVE, mockLeadCaptureAdapter } from './leadAdapter';
import type { LeadCapturePayload } from './types';

const SENSITIVE_NAME = 'Definitely Not Persisted';
const SENSITIVE_EMAIL = 'should-never-appear-anywhere@example.com';

function samplePayload(): LeadCapturePayload {
  return {
    primaryResult: 'A',
    secondaryResult: 'B',
    scores: { A: 6, B: 5, C: 0, D: 0 },
    goal: 'fat_loss',
    firstName: SENSITIVE_NAME,
    email: SENSITIVE_EMAIL,
    consent: true,
    completedAt: new Date().toISOString(),
  };
}

describe('mockLeadCaptureAdapter', () => {
  it('MOCK_ADAPTER_ACTIVE reflects whether the real Kit integration is wired in', () => {
    // Flips to false once a real LeadCaptureAdapter is active (see
    // app/lib/ffa/leadAdapter.ts) — this also lifts the production
    // safeguard in app/(site)/freedom-fitness-audit/page.tsx. This mock
    // implementation and its tests below stay valid regardless, for local
    // and offline development.
    expect(MOCK_ADAPTER_ACTIVE).toBe(false);
  });

  it('resolves with { success: true }', async () => {
    const result = await mockLeadCaptureAdapter.submit(samplePayload());
    expect(result).toEqual({ success: true });
  });

  describe('non-persistence guarantee', () => {
    let consoleLogSpy: ReturnType<typeof vi.spyOn>;
    let consoleErrorSpy: ReturnType<typeof vi.spyOn>;
    let consoleWarnSpy: ReturnType<typeof vi.spyOn>;
    let fetchSpy: ReturnType<typeof vi.fn>;
    let localStorageSetSpy: ReturnType<typeof vi.fn>;

    beforeEach(() => {
      consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      fetchSpy = vi.fn();
      // @ts-expect-error — stubbing global fetch for the test environment
      globalThis.fetch = fetchSpy;

      localStorageSetSpy = vi.fn();
      // @ts-expect-error — minimal localStorage stub for the node test environment
      globalThis.localStorage = { setItem: localStorageSetSpy, getItem: vi.fn(), removeItem: vi.fn() };
    });

    afterEach(() => {
      vi.restoreAllMocks();
      // @ts-expect-error — cleanup
      delete globalThis.fetch;
      // @ts-expect-error — cleanup
      delete globalThis.localStorage;
    });

    it('never calls fetch', async () => {
      await mockLeadCaptureAdapter.submit(samplePayload());
      expect(fetchSpy).not.toHaveBeenCalled();
    });

    it('never calls localStorage.setItem', async () => {
      await mockLeadCaptureAdapter.submit(samplePayload());
      expect(localStorageSetSpy).not.toHaveBeenCalled();
    });

    it('never calls console.log, console.error, or console.warn', async () => {
      await mockLeadCaptureAdapter.submit(samplePayload());
      expect(consoleLogSpy).not.toHaveBeenCalled();
      expect(consoleErrorSpy).not.toHaveBeenCalled();
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });

    it('the name and email strings never appear in any spy call, anywhere', async () => {
      await mockLeadCaptureAdapter.submit(samplePayload());

      const allCallArgs = [...consoleLogSpy.mock.calls, ...consoleErrorSpy.mock.calls, ...consoleWarnSpy.mock.calls, ...fetchSpy.mock.calls, ...localStorageSetSpy.mock.calls]
        .flat()
        .map((arg) => JSON.stringify(arg));

      const serialized = allCallArgs.join('\n');
      expect(serialized).not.toContain(SENSITIVE_NAME);
      expect(serialized).not.toContain(SENSITIVE_EMAIL);
    });
  });
});
