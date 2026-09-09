// Ported near-verbatim from BU APP's src/data/presets.ts. Tailwind class
// names reference the roadmap-tool theme tokens added to app/globals.css.
import type { LifeEventTypePreset, PhasePreset, PhaseTypeId } from './types';

export const PHASE_PRESETS: PhasePreset[] = [
  { id: 'build', label: 'Build', color: 'bg-olive', border: 'border-olive-deep', text: 'text-cream' },
  { id: 'cut', label: 'Cut', color: 'bg-rust', border: 'border-rust-deep', text: 'text-cream' },
  { id: 'maintenance', label: 'Maintenance', color: 'bg-caramel', border: 'border-caramel-deep', text: 'text-espresso' },
];

export const CUSTOM_PHASE_COLORS: { color: string; border: string; text: string }[] = [
  { color: 'bg-olive', border: 'border-olive-deep', text: 'text-cream' },
  { color: 'bg-rust', border: 'border-rust-deep', text: 'text-cream' },
  { color: 'bg-caramel', border: 'border-caramel-deep', text: 'text-espresso' },
  { color: 'bg-sage-deep', border: 'border-olive-soft', text: 'text-espresso' },
  { color: 'bg-espresso-soft', border: 'border-espresso', text: 'text-cream' },
  { color: 'bg-stone', border: 'border-stone-deep', text: 'text-cream' },
  { color: 'bg-olive-soft', border: 'border-olive-deep', text: 'text-cream' },
  { color: 'bg-caramel-deep', border: 'border-espresso-soft', text: 'text-cream' },
];

export function getPhasePreset(id: PhaseTypeId): PhasePreset {
  return PHASE_PRESETS.find((p) => p.id === id) ?? PHASE_PRESETS[0];
}

export const LIFE_EVENT_TYPE_PRESETS: LifeEventTypePreset[] = [
  { id: 'travel', label: 'Travel', color: 'bg-caramel', border: 'border-caramel-deep', text: 'text-espresso', icon: '✈️' },
  { id: 'work', label: 'Work Event', color: 'bg-espresso-soft', border: 'border-espresso', text: 'text-cream', icon: '💼' },
  { id: 'other', label: 'Other', color: 'bg-sage-deep', border: 'border-olive-soft', text: 'text-espresso', icon: '📌' },
];

export function getLifeEventPreset(id: string): LifeEventTypePreset {
  return LIFE_EVENT_TYPE_PRESETS.find((p) => p.id === id) ?? LIFE_EVENT_TYPE_PRESETS[2];
}
