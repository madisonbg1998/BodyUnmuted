'use client';

import { useEffect, useState } from 'react';

function getGreeting(hour: number) {
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export default function DashboardGreeting({ firstName }: { firstName: string }) {
  // Start with a stable value for SSR, then correct to the viewer's local time on mount.
  const [greeting, setGreeting] = useState('Hello');

  useEffect(() => {
    setGreeting(getGreeting(new Date().getHours()));
  }, []);

  return (
    <h1
      style={{
        fontFamily: 'var(--font-instrument-serif), serif',
        color: '#2d1506',
        fontSize: 'clamp(32px, 5vw, 48px)',
        lineHeight: '1',
        fontWeight: 400,
      }}
    >
      {greeting}, {firstName}.
    </h1>
  );
}
