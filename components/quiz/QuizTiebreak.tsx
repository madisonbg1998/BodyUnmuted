import { ARCHETYPES } from '@/app/lib/quiz/config';
import type { ArchetypeId } from '@/app/lib/quiz/types';
import AnswerCard from './AnswerCard';

export default function QuizTiebreak({
  prompt,
  subprompt,
  candidates,
  order,
  onSelect,
}: {
  prompt: string;
  subprompt: string;
  candidates: ArchetypeId[];
  order: ArchetypeId[];
  onSelect: (id: ArchetypeId) => void;
}) {
  const orderedCandidates = order.filter((id) => candidates.includes(id));

  return (
    <div className="quiz-fade-in" style={{ maxWidth: '640px', margin: '0 auto' }}>
      <h2
        style={{
          fontFamily: 'var(--font-instrument-serif), serif',
          color: '#2d1506',
          fontSize: 'clamp(26px, 3.6vw, 36px)',
          lineHeight: '1.15',
          fontWeight: 400,
          marginBottom: '12px',
        }}
      >
        {prompt}
      </h2>
      <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: '#45220d', fontSize: '15px', marginBottom: '28px' }}>
        {subprompt}
      </p>

      <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
        <legend className="sr-only-input">{prompt}</legend>
        {orderedCandidates.map((id) => {
          const archetype = ARCHETYPES[id];
          return (
            <label key={id} style={{ display: 'block', cursor: 'pointer', marginBottom: '12px' }}>
              <input type="radio" className="sr-only-input" name="tiebreak" value={id} onChange={() => onSelect(id)} />
              <div
                className="quiz-answer-card"
                style={{
                  padding: '18px 20px',
                  borderRadius: '12px',
                  border: '1.5px solid rgba(206,150,90,0.3)',
                  backgroundColor: '#faf9f5',
                  boxShadow: '0 2px 12px rgba(45,21,6,0.04)',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-instrument-serif), serif',
                    color: '#2d1506',
                    fontSize: '18px',
                    marginBottom: '4px',
                  }}
                >
                  {archetype.name}
                </p>
                <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: '#45220d', fontSize: '14px', lineHeight: '1.4' }}>
                  {archetype.tiebreakDescription}
                </p>
              </div>
            </label>
          );
        })}
      </fieldset>
    </div>
  );
}
