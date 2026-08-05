'use client';

import { useState } from 'react';
import { ARCHETYPES } from '@/app/lib/quiz/config';
import { ARCHETYPE_IDS } from '@/app/lib/quiz/types';
import type { ArchetypeId } from '@/app/lib/quiz/types';
import QuizResults from '@/components/quiz/QuizResults';

const selectStyle: React.CSSProperties = {
  border: '1px solid rgba(45,21,6,0.2)',
  borderRadius: '4px',
  padding: '10px 14px',
  fontFamily: 'var(--font-inter-sans), sans-serif',
  fontSize: '14px',
  color: '#2d1506',
  backgroundColor: '#faf9f5',
};

export default function QuizResultsPreviewClient() {
  const [primary, setPrimary] = useState<ArchetypeId>(ARCHETYPE_IDS[0]);
  const [secondary, setSecondary] = useState<ArchetypeId>(ARCHETYPE_IDS[1]);

  return (
    <section style={{ backgroundColor: '#fbf4e9', padding: '32px 20px 96px' }}>
      <div
        style={{
          maxWidth: '720px',
          margin: '0 auto 32px',
          backgroundColor: '#faf9f5',
          border: '2px dashed #ce965a',
          borderRadius: '12px',
          padding: '20px 24px',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#ce965a',
            marginBottom: '12px',
          }}
        >
          Dev-only preview — never shown in production
        </p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#45220d' }}>
            Primary
            <select value={primary} onChange={(e) => setPrimary(e.target.value as ArchetypeId)} style={selectStyle}>
              {ARCHETYPE_IDS.map((id) => (
                <option key={id} value={id}>
                  {ARCHETYPES[id].name}
                </option>
              ))}
            </select>
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#45220d' }}>
            Secondary
            <select value={secondary} onChange={(e) => setSecondary(e.target.value as ArchetypeId)} style={selectStyle}>
              {ARCHETYPE_IDS.map((id) => (
                <option key={id} value={id}>
                  {ARCHETYPES[id].name}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <QuizResults primary={primary} secondary={secondary} onRestart={() => {}} />
    </section>
  );
}
