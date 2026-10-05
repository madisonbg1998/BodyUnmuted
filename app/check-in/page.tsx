'use client';

import { useCallback, useMemo, useState } from 'react';

type FieldType = 'text' | 'email' | 'textarea' | 'number' | 'radio' | 'checkbox' | 'scale' | 'numberOrSkip' | 'confirm';

type FieldValue = string | string[] | undefined;

interface FollowUp {
  id: string;
  label: string;
  help?: string;
  placeholder?: string;
  type: 'text' | 'textarea';
  showWhen: (value: FieldValue) => boolean;
}

interface FieldDef {
  id: string;
  label: string;
  type: FieldType;
  required?: boolean;
  help?: string;
  placeholder?: string;
  options?: string[];
  scaleMax?: number;
  scaleLabels?: [string, string];
  skipLabel?: string;
  confirmLabel?: string;
  followUp?: FollowUp;
}

interface StepDef {
  title: string;
  fields: FieldDef[];
}

const STEPS: StepDef[] = [
  {
    title: 'About You',
    fields: [
      { id: 'full_name', label: 'Full name', type: 'text', required: true, placeholder: 'Your name' },
      { id: 'email', label: 'Email address', type: 'email', required: true, placeholder: 'you@example.com' },
    ],
  },
  {
    title: 'Looking back',
    fields: [
      {
        id: 'proud_moment',
        label: "What's one thing you're proud of this month?",
        type: 'textarea',
        help: 'This can be something you noticed in your strength, your habits, your confidence, or your life outside the gym.',
      },
      {
        id: 'progress_feeling',
        label: 'How are you feeling about your progress right now?',
        type: 'radio',
        options: [
          'Happy with how things are going',
          'Making progress, but could use some reassurance',
          'Unsure whether things are working',
          'Frustrated or feeling stuck',
          'Something else',
        ],
      },
      { id: 'easier_harder', label: 'What felt easier this month? What felt harder?', type: 'textarea' },
    ],
  },
  {
    title: 'Your lifting',
    fields: [
      { id: 'lifting_sessions_per_week', label: 'On average, how many lifting sessions did you complete each week?', type: 'number' },
      {
        id: 'training_feel',
        label: 'How did your training feel this month?',
        type: 'textarea',
        help: 'Think about strength, energy during sessions, and how challenging the workouts felt. Were there any exercises where you noticed progress or felt stuck?',
      },
      {
        id: 'training_schedule_fit',
        label: 'How well did your training fit your schedule, and how did you feel between sessions?',
        type: 'textarea',
        help: 'Let me know about workouts that felt too long, difficulty recovering, or soreness that affected your next session or daily life.',
      },
      {
        id: 'training_pain',
        label: 'Did you experience any pain or discomfort during or after training?',
        type: 'radio',
        options: ['Yes', 'No'],
        followUp: {
          id: 'training_pain_details',
          label: 'Tell me where, which movements brought it on, and whether it’s still happening.',
          type: 'textarea',
          showWhen: (value) => value === 'Yes',
        },
      },
    ],
  },
  {
    title: 'Your nutrition',
    fields: [
      {
        id: 'nutrition_consistency',
        label: 'How consistently were you able to follow the nutrition approach we agreed on?',
        type: 'radio',
        options: [
          'Most days',
          'More than half the time',
          'About half the time',
          'Less than half the time',
          "The approach didn't fit my life this month",
          "I wasn't clear on what to focus on",
        ],
      },
      {
        id: 'nutrition_helpers_barriers',
        label: 'What helped you follow your nutrition plan, and what got in the way?',
        type: 'textarea',
        help: 'For example: meal routines, appetite, eating out, travel, food access, or tracking.',
      },
      {
        id: 'hunger_fullness_energy',
        label: 'How have your hunger, fullness, and energy felt?',
        type: 'textarea',
        help: 'Include anything like feeling hungry much of the time, getting overly full, skipping meals unintentionally, or noticing energy dips.',
      },
      {
        id: 'food_mental',
        label: 'How did food feel mentally this month?',
        type: 'textarea',
        help: 'Did your approach feel manageable and flexible? Or did you notice more guilt, preoccupation, or stress around eating?',
      },
    ],
  },
  {
    title: 'Movement, sleep, and recovery',
    fields: [
      {
        id: 'avg_daily_steps',
        label: 'What was your average daily step count this month?',
        type: 'numberOrSkip',
        help: 'Use the monthly average from your phone or watch if available. An estimate is fine, please label it as an estimate.',
        skipLabel: 'Not tracked',
      },
      {
        id: 'other_movement',
        label: 'Did you do any other regular movement or activities outside your lifting sessions?',
        type: 'text',
        help: 'For example: running, classes, hiking, swimming, or a more physically active job. What and roughly how often?',
      },
      { id: 'avg_sleep_hours', label: 'On average, how many hours did you sleep per night?', type: 'number' },
      {
        id: 'sleep_restedness',
        label: 'How rested did you usually feel when you woke up?',
        type: 'scale',
        scaleMax: 5,
        scaleLabels: ['Not rested at all', 'Well rested'],
        followUp: {
          id: 'sleep_factors',
          label: 'Optional: anything affecting your sleep?',
          type: 'textarea',
          showWhen: () => true,
        },
      },
      {
        id: 'stress_level',
        label: 'How would you describe your overall stress this month?',
        type: 'scale',
        scaleMax: 5,
        scaleLabels: ['Low', 'Very high'],
        followUp: {
          id: 'stress_contributors',
          label: "What's contributing most, and is it likely to continue next month?",
          type: 'textarea',
          showWhen: () => true,
        },
      },
      {
        id: 'energy_outside_gym',
        label: 'How was your energy outside the gym?',
        type: 'radio',
        options: ['Generally good', 'Up and down, but manageable', 'Often low', 'Exhausted much of the time'],
      },
      {
        id: 'digestion',
        label: 'How has your digestion been?',
        type: 'checkbox',
        options: [
          'Generally comfortable and regular',
          'Bloating',
          'Constipation',
          'Loose stools or diarrhea',
          'Reflux or heartburn',
          'Abdominal discomfort or pain',
          'Something else',
        ],
        followUp: {
          id: 'digestion_details',
          label: 'How often did this happen, and is it new or different from your usual?',
          type: 'textarea',
          showWhen: (value) => Array.isArray(value) && value.some((v) => v !== 'Generally comfortable and regular'),
        },
      },
      {
        id: 'health_cycle_changes',
        label: "Are there any health or menstrual-cycle changes you'd like me to account for?",
        type: 'textarea',
        help: "If relevant, this could include changes in your period, symptoms affecting training, illness, injury, or changes in medication. Only share what you're comfortable sharing.",
        placeholder: 'Nothing to report, or share here...',
      },
    ],
  },
  {
    title: 'Progress beyond the day-to-day',
    fields: [
      {
        id: 'progress_photos',
        label: "Please share this month's progress photos, if photos are part of your agreed tracking approach.",
        type: 'confirm',
        help: 'Front, side, and back. Aim for similar lighting, clothing, camera position, and time of day to your previous photos. No need to include your face.',
        confirmLabel: 'Added to Trainerize',
      },
      {
        id: 'weight_measurements',
        label: "If we're tracking body weight or measurements, please confirm this month's data has been shared.",
        type: 'confirm',
        help: "Use your recorded averages where available. If these are already in your coaching app, you don't need to enter them again.",
        confirmLabel: 'Shared to Trainerize (if needed)',
      },
      {
        id: 'changes_beyond_numbers',
        label: 'What changes have you noticed beyond the numbers?',
        type: 'textarea',
        help: 'This could be how your clothes fit, feeling stronger, confidence in the gym, or having more energy to do things you enjoy.',
      },
    ],
  },
  {
    title: 'Looking ahead',
    fields: [
      {
        id: 'upcoming_month_plans',
        label: "What's coming up next month that we should plan around?",
        type: 'textarea',
        help: 'Include any new or changed travel plans, events, work deadlines, family commitments, or schedule changes. Dates are helpful.',
      },
      {
        id: 'schedule_equipment_change',
        label: 'Will your available training days, equipment, or access to food and cooking facilities change?',
        type: 'radio',
        options: ['Yes', 'No', 'Unsure'],
        followUp: {
          id: 'schedule_equipment_details',
          label: 'What will be different, and when?',
          type: 'textarea',
          showWhen: (value) => value === 'Yes' || value === 'Unsure',
        },
      },
      {
        id: 'next_month_realistic',
        label: 'What feels realistic for your fitness next month?',
        type: 'radio',
        options: [
          'I have room to give it more attention',
          'My current approach feels sustainable',
          'I need a simpler plan for a busy month',
          "I'm unsure and would like your guidance",
        ],
      },
      {
        id: 'help_request',
        label: 'What would you most like my help with right now?',
        type: 'textarea',
        help: 'Include any questions or anything you’d like me to address in your feedback.',
      },
    ],
  },
];

const eyebrow: React.CSSProperties = {
  fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
  fontSize: '12px',
  fontWeight: 500,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: '#ce965a',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  color: '#2d1506',
  fontFamily: 'var(--font-inter-sans), sans-serif',
  fontSize: '15px',
  fontWeight: 600,
  marginBottom: '4px',
};

const helpStyle: React.CSSProperties = {
  fontFamily: 'var(--font-inter-sans), sans-serif',
  color: 'rgba(45,21,6,0.55)',
  fontSize: '13px',
  marginBottom: '10px',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  backgroundColor: '#fff',
  border: '1px solid rgba(45,21,6,0.16)',
  borderRadius: '6px',
  padding: '13px 16px',
  color: '#2d1506',
  fontFamily: 'var(--font-inter-sans), sans-serif',
  fontSize: '15px',
};

const optionLabelStyle = (checked: boolean): React.CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  backgroundColor: '#fff',
  border: checked ? '1.5px solid #ce965a' : '1px solid rgba(45,21,6,0.12)',
  borderRadius: '6px',
  padding: '14px 16px',
  cursor: 'pointer',
  fontFamily: 'var(--font-inter-sans), sans-serif',
  fontSize: '15px',
  color: '#2d1506',
});

type Answers = Record<string, string | string[]>;

function Stepper({ current, total }: { current: number; total: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '4px' }}>
      {Array.from({ length: total }, (_, i) => {
        const stepNum = i + 1;
        const done = stepNum < current;
        const active = stepNum === current;
        return (
          <div key={stepNum} style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
                fontSize: '12px',
                fontWeight: 600,
                backgroundColor: done ? '#ce965a' : active ? '#2d1506' : 'transparent',
                border: done || active ? 'none' : '1px solid rgba(45,21,6,0.25)',
                color: done || active ? '#fbf4e9' : 'rgba(45,21,6,0.4)',
              }}
            >
              {done ? '✓' : stepNum}
            </div>
            {stepNum < total && <div style={{ width: '16px', height: '1px', backgroundColor: 'rgba(45,21,6,0.2)' }} />}
          </div>
        );
      })}
    </div>
  );
}

function FollowUpField({ followUp, value, onChange }: { followUp: FollowUp; value: string | undefined; onChange: (v: string) => void }) {
  return (
    <div style={{ marginTop: '12px', paddingLeft: '18px', borderLeft: '2px solid rgba(206,150,90,0.35)' }}>
      <label style={{ ...labelStyle, fontSize: '14px' }}>{followUp.label}</label>
      {followUp.help && <p style={helpStyle}>{followUp.help}</p>}
      {followUp.type === 'textarea' ? (
        <textarea
          rows={3}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={followUp.placeholder}
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      ) : (
        <input type="text" value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder={followUp.placeholder} style={inputStyle} />
      )}
    </div>
  );
}

function Field({
  field,
  value,
  followUpValue,
  onChange,
  onFollowUpChange,
}: {
  field: FieldDef;
  value: FieldValue;
  followUpValue: string | undefined;
  onChange: (v: string | string[]) => void;
  onFollowUpChange: (v: string) => void;
}) {
  const isSkipped = !!field.skipLabel && value === field.skipLabel;

  return (
    <div style={{ marginBottom: '32px' }}>
      <label style={labelStyle} htmlFor={field.id}>
        {field.label} {field.required && <span style={{ color: '#ce965a' }}>*</span>}
      </label>
      {field.help && <p style={helpStyle}>{field.help}</p>}

      {(field.type === 'text' || field.type === 'email') && (
        <input
          id={field.id}
          type={field.type}
          value={(value as string) || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          style={inputStyle}
        />
      )}

      {field.type === 'number' && (
        <input id={field.id} type="number" value={(value as string) || ''} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} style={inputStyle} />
      )}

      {field.type === 'textarea' && (
        <textarea
          id={field.id}
          rows={4}
          value={(value as string) || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      )}

      {field.type === 'radio' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {field.options?.map((o) => {
            const checked = value === o;
            return (
              <label key={o} style={optionLabelStyle(checked)}>
                <input type="radio" name={field.id} checked={checked} onChange={() => onChange(o)} style={{ width: '16px', height: '16px', accentColor: '#ce965a' }} />
                {o}
              </label>
            );
          })}
        </div>
      )}

      {field.type === 'checkbox' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {field.options?.map((o) => {
            const arr = (value as string[]) || [];
            const checked = arr.includes(o);
            return (
              <label key={o} style={optionLabelStyle(checked)}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onChange(checked ? arr.filter((x) => x !== o) : [...arr, o])}
                  style={{ width: '16px', height: '16px', accentColor: '#ce965a' }}
                />
                {o}
              </label>
            );
          })}
        </div>
      )}

      {field.type === 'scale' && (
        <div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {Array.from({ length: field.scaleMax || 5 }, (_, i) => i + 1).map((n) => {
              const checked = value === String(n);
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => onChange(String(n))}
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '6px',
                    border: checked ? '1.5px solid #ce965a' : '1px solid rgba(45,21,6,0.16)',
                    backgroundColor: checked ? '#ce965a' : '#fff',
                    color: checked ? '#fbf4e9' : '#2d1506',
                    fontFamily: 'var(--font-inter-sans), sans-serif',
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  {n}
                </button>
              );
            })}
          </div>
          {field.scaleLabels && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
              <span style={{ ...helpStyle, marginBottom: 0 }}>{field.scaleLabels[0]}</span>
              <span style={{ ...helpStyle, marginBottom: 0 }}>{field.scaleLabels[1]}</span>
            </div>
          )}
        </div>
      )}

      {field.type === 'numberOrSkip' && (
        <div>
          <input
            type="text"
            inputMode="numeric"
            value={isSkipped ? '' : (value as string) || ''}
            onChange={(e) => onChange(e.target.value)}
            disabled={isSkipped}
            placeholder="e.g. 8,200"
            style={{ ...inputStyle, opacity: isSkipped ? 0.5 : 1 }}
          />
          {field.skipLabel && (
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px', fontFamily: 'var(--font-inter-sans), sans-serif', fontSize: '14px', color: '#45220d' }}>
              <input
                type="checkbox"
                checked={isSkipped}
                onChange={() => onChange(isSkipped ? '' : field.skipLabel!)}
                style={{ width: '16px', height: '16px', accentColor: '#ce965a' }}
              />
              {field.skipLabel === 'Not tracked' ? 'Not tracked this month' : field.skipLabel}
            </label>
          )}
        </div>
      )}

      {field.type === 'confirm' && field.confirmLabel && (
        <label style={optionLabelStyle(value === field.confirmLabel)}>
          <input
            type="checkbox"
            checked={value === field.confirmLabel}
            onChange={() => onChange(value === field.confirmLabel ? '' : field.confirmLabel!)}
            style={{ width: '16px', height: '16px', accentColor: '#ce965a' }}
          />
          {field.confirmLabel}
        </label>
      )}

      {field.followUp && field.followUp.showWhen(value) && (
        <FollowUpField followUp={field.followUp} value={followUpValue} onChange={onFollowUpChange} />
      )}
    </div>
  );
}

export default function CheckInPage() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const step = STEPS[stepIndex];
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === STEPS.length - 1;

  const fieldStartNumber = useMemo(() => {
    let n = 1;
    for (let i = 1; i < stepIndex; i++) n += STEPS[i].fields.length;
    return n;
  }, [stepIndex]);

  const updateField = useCallback((id: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setError(null);
  }, []);

  const handleNext = useCallback(() => {
    if (isFirst) {
      if (!answers.full_name || !String(answers.full_name).trim()) return setError('Please enter your name.');
      if (!answers.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(answers.email))) {
        return setError('Please enter a valid email address.');
      }
    }
    setError(null);
    setStepIndex((s) => Math.min(s + 1, STEPS.length - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [isFirst, answers]);

  const handleBack = useCallback(() => {
    setStepIndex((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch('/api/check-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers, sourceUrl: window.location.href }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Something went wrong.');
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [answers]);

  if (isSubmitted) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#fbf4e9', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '56px 24px' }}>
        <div style={{ width: '100%', maxWidth: '480px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', color: '#ce965a', fontSize: 'clamp(20px, 2.2vw, 26px)', marginBottom: '16px' }}>
            Thank you.
          </p>
          <h1 style={{ fontFamily: 'var(--font-instrument-serif), serif', color: '#2d1506', fontSize: 'clamp(36px, 4.6vw, 52px)', lineHeight: '1.05', fontWeight: 400, marginBottom: '20px' }}>
            Your check-in is in.
          </h1>
          <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: '#45220d', fontSize: '17px', lineHeight: '1.6' }}>
            I&rsquo;ll read through everything you shared and follow up with any feedback or changes for next month.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fbf4e9', padding: '56px 24px 90px' }}>
      <div style={{ width: '100%', maxWidth: '640px', margin: '0 auto' }}>
        <p style={{ ...eyebrow, marginBottom: '12px' }}>Monthly Check-In</p>
        <h1 style={{ fontFamily: 'var(--font-instrument-serif), serif', color: '#2d1506', fontSize: 'clamp(32px, 4vw, 46px)', lineHeight: '1.1', fontWeight: 400, marginBottom: '12px' }}>
          Your Monthly Check-In
        </h1>
        <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: 'rgba(45,21,6,0.65)', fontSize: '15px', lineHeight: '1.5', marginBottom: '8px' }}>
          This is a chance to step back and look at the whole picture: your training, your food, how you&rsquo;re feeling, and the life happening around all of it.
        </p>
        <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: 'rgba(45,21,6,0.65)', fontSize: '15px', lineHeight: '1.5', marginBottom: '28px' }}>
          You don&rsquo;t need perfect numbers or a &ldquo;good&rdquo; month to check in. Honest answers help me understand what&rsquo;s working and where you could use more support.
        </p>

        <Stepper current={stepIndex + 1} total={STEPS.length} />

        {stepIndex > 0 && (
          <p style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', color: '#2d1506', fontSize: 'clamp(22px, 2.6vw, 28px)', marginBottom: '32px' }}>
            {step.title}
          </p>
        )}

        {step.fields.map((field, i) => (
          <div key={field.id}>
            {stepIndex > 0 && <p style={{ ...eyebrow, color: '#a67c52', marginBottom: '6px' }}>{String(fieldStartNumber + i).padStart(2, '0')} —</p>}
            <Field
              field={field}
              value={answers[field.id]}
              followUpValue={field.followUp ? (answers[field.followUp.id] as string | undefined) : undefined}
              onChange={(v) => updateField(field.id, v)}
              onFollowUpChange={(v) => (field.followUp ? updateField(field.followUp.id, v) : undefined)}
            />
          </div>
        ))}

        {error && <p style={{ color: '#b3261e', fontFamily: 'var(--font-inter-sans), sans-serif', fontSize: '14px', marginBottom: '16px' }}>{error}</p>}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(45,21,6,0.12)', paddingTop: '28px' }}>
          {!isFirst ? (
            <button type="button" onClick={handleBack} className="btn-secondary" style={{ backgroundColor: 'transparent', color: '#2d1506', border: '1px solid rgba(45,21,6,0.25)' }}>
              ← Back
            </button>
          ) : (
            <span />
          )}

          {isLast ? (
            <button type="button" onClick={handleSubmit} disabled={isSubmitting} className="btn-primary" style={{ opacity: isSubmitting ? 0.6 : 1 }}>
              {isSubmitting ? 'Submitting…' : 'Submit Check-In'}
            </button>
          ) : (
            <button type="button" onClick={handleNext} className="btn-primary">
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
