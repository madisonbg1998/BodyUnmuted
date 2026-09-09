'use client';

// Ported verbatim from BU APP's src/components/PhasePalette.tsx.
import { useState } from 'react';
import { PHASE_PRESETS, CUSTOM_PHASE_COLORS } from '@/app/lib/roadmap/presets';
import { SELECT_TOOL, type ActiveTool } from '@/app/lib/roadmap/tool';

export function PhasePalette({ tool, onToolChange }: { tool: ActiveTool; onToolChange: (tool: ActiveTool) => void }) {
  const [showCustom, setShowCustom] = useState(false);
  const [customLabel, setCustomLabel] = useState('');
  const [customColorIdx, setCustomColorIdx] = useState(0);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={() => onToolChange(SELECT_TOOL)}
        className={`flex items-center gap-1.5 rounded-[4px] border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition ${
          tool.mode === 'select'
            ? 'border-olive bg-olive text-cream'
            : 'border-border-warm bg-paper text-stone-deep hover:border-stone'
        }`}
      >
        <span aria-hidden>↖</span> Select / Move
      </button>

      <div className="mx-1 h-5 w-px bg-border-warm" />

      {PHASE_PRESETS.map((p) => (
        <button
          key={p.id}
          onClick={() =>
            onToolChange({ mode: 'paint', typeId: p.id, label: p.label, color: p.color, border: p.border, text: p.text })
          }
          className={`flex items-center gap-1.5 rounded-[4px] border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition ${
            tool.mode === 'paint' && tool.typeId === p.id
              ? `${p.color} ${p.border} ${p.text} shadow-sm`
              : 'border-border-warm bg-paper text-stone-deep hover:border-stone'
          }`}
        >
          <span className={`h-2.5 w-2.5 rounded-full ${p.color}`} aria-hidden />
          {p.label}
        </button>
      ))}

      <div className="relative">
        <button
          onClick={() => setShowCustom((s) => !s)}
          className={`flex items-center gap-1.5 rounded-[4px] border border-dashed px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition ${
            showCustom ? 'border-stone text-espresso-soft' : 'border-border-warm text-stone hover:border-stone'
          }`}
        >
          + Custom
        </button>

        {showCustom && (
          <div className="absolute left-0 top-full z-20 mt-2 w-64 rounded-md border border-border-warm bg-paper p-3 shadow-lg">
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-stone">Phase name</label>
            <input
              autoFocus
              value={customLabel}
              onChange={(e) => setCustomLabel(e.target.value)}
              placeholder="e.g. Travel Prep"
              className="mb-3 w-full rounded-[4px] border border-border-warm px-2 py-1.5 text-sm outline-none focus:border-stone"
            />
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-stone">Color</label>
            <div className="mb-3 flex flex-wrap gap-1.5">
              {CUSTOM_PHASE_COLORS.map((c, i) => (
                <button
                  key={c.color}
                  onClick={() => setCustomColorIdx(i)}
                  className={`h-6 w-6 rounded-full ${c.color} ${
                    customColorIdx === i ? 'ring-2 ring-offset-1 ring-espresso-soft' : ''
                  }`}
                  aria-label={c.color}
                />
              ))}
            </div>
            <button
              disabled={!customLabel.trim()}
              onClick={() => {
                const c = CUSTOM_PHASE_COLORS[customColorIdx];
                onToolChange({ mode: 'paint', typeId: 'custom', label: customLabel.trim(), color: c.color, border: c.border, text: c.text });
                setShowCustom(false);
                setCustomLabel('');
              }}
              className="w-full rounded-[4px] bg-olive py-1.5 text-xs font-semibold uppercase tracking-wide text-cream disabled:opacity-40"
            >
              Use this phase
            </button>
          </div>
        )}
      </div>

      {tool.mode === 'paint' && (
        <span className="ml-1 font-display text-sm italic text-stone-deep">
          Click or drag across months to paint <strong className="not-italic">{tool.label}</strong>
        </span>
      )}
    </div>
  );
}
