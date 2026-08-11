'use client';

import { useState, useTransition } from 'react';
import { getResourceDownloadUrlAction } from './actions';

export default function DownloadButton({ resourceId }: { resourceId: string }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    setError(null);
    startTransition(async () => {
      // Fetch a fresh link right before navigating rather than trusting a URL
      // captured whenever the page was rendered — it may have since expired.
      const url = await getResourceDownloadUrlAction(resourceId);
      if (url) {
        window.location.href = url;
      } else {
        setError('Could not get a download link. Try again.');
      }
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        className="btn-copper"
        style={{ opacity: isPending ? 0.6 : 1, cursor: isPending ? 'not-allowed' : 'pointer' }}
      >
        {isPending ? 'Preparing…' : 'Download'}
      </button>
      {error && <p style={{ color: '#b3261e', fontFamily: 'var(--font-inter-sans), sans-serif', fontSize: '12px' }}>{error}</p>}
    </div>
  );
}
