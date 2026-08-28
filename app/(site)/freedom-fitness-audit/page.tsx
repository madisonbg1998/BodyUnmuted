import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import FfaApp from '@/components/ffa/FfaApp';
import { LANDING_HEADLINE } from '@/app/lib/ffa/config';
import { MOCK_ADAPTER_ACTIVE } from '@/app/lib/ffa/leadAdapter';

export const metadata: Metadata = {
  title: `The Freedom Fitness Audit | Body Unmuted`,
  description: LANDING_HEADLINE,
};

/**
 * Unlinked route (matches the /survey, /workshop, /intake pattern — reachable
 * by direct URL, not in nav). Hard-gated to 404 in production while the mock
 * lead adapter is active, so this can never go live collecting "successful"
 * submissions that are secretly discarded. See README.md and
 * app/lib/ffa/leadAdapter.ts for how to remove this gate once a real
 * LeadCaptureAdapter is wired in.
 */
export default function FreedomFitnessAuditPage() {
  if (MOCK_ADAPTER_ACTIVE && process.env.NODE_ENV === 'production') {
    notFound();
  }

  return (
    <section style={{ backgroundColor: '#fbf4e9', padding: '64px 20px 96px', minHeight: '70vh' }}>
      <FfaApp />
    </section>
  );
}
