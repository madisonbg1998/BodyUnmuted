'use client';

import { useCallback, useMemo, useState } from 'react';
import Image from 'next/image';

const img = (name: string) => `/Body%20Unmuted%20Brand%20Images/${name}`;

type FieldType = 'text' | 'email' | 'number' | 'textarea' | 'radio' | 'checkbox' | 'dropdown' | 'rating' | 'cta';

interface FieldDef {
  id: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  help?: string;
  options?: string[];
  min?: string;
  max?: string;
  url?: string;
  buttonText?: string;
}

interface StepDef {
  title: string;
  fields: FieldDef[];
}

const TIMEZONE_OPTIONS = [
  'Los Angeles / Vancouver (UTC−8/−7)',
  'Denver / Phoenix (UTC−7/−6)',
  'Chicago / Mexico City (UTC−6/−5)',
  'New York / Toronto (UTC−5/−4)',
  'Halifax / Atlantic (UTC−4/−3)',
  'São Paulo / Buenos Aires (UTC−3)',
  'Reykjavik / Lisbon (UTC+0)',
  'London / Dublin (UTC+0/+1)',
  'Paris / Amsterdam / Berlin (UTC+1/+2)',
  'Athens / Cairo / Helsinki (UTC+2/+3)',
  'Moscow / Riyadh (UTC+3)',
  'Dubai / Muscat (UTC+4)',
  'Karachi (UTC+5)',
  'Mumbai / New Delhi (UTC+5:30)',
  'Bangkok / Jakarta (UTC+7)',
  'Singapore / Kuala Lumpur (UTC+8)',
  'Hong Kong / Taipei / Perth (UTC+8)',
  'Tokyo / Seoul (UTC+9)',
  'Sydney / Melbourne (UTC+10/+11)',
  'Auckland / Wellington (UTC+12/+13)',
];

const STEPS: StepDef[] = [
  {
    title: 'About You',
    fields: [
      { id: 'full_name', label: 'Full name', type: 'text', required: true, placeholder: 'Your name' },
      { id: 'email', label: 'Email address', type: 'email', required: true, placeholder: 'you@example.com' },
      { id: 'instagram_handle', label: 'Instagram handle', type: 'text', placeholder: '@yourhandle' },
      { id: 'age', label: 'Age', type: 'number', placeholder: 'e.g. 32' },
      { id: 'timezone', label: 'Timezone', type: 'dropdown', options: TIMEZONE_OPTIONS },
      { id: 'height', label: 'Height', type: 'text', placeholder: "e.g. 5'6\" or 168cm" },
      { id: 'current_weight', label: 'Current weight', type: 'text', placeholder: 'e.g. 65kg or 143lbs' },
      {
        id: 'relationship_with_scale',
        label: "What's your relationship with the scale?",
        type: 'textarea',
        help: 'Do you weigh yourself regularly? Does the number affect your mood or behaviour? Be honest — this helps me a lot.',
        placeholder: 'Share how you feel about the scale...',
      },
    ],
  },
  {
    title: 'Training History',
    fields: [
      {
        id: 'training_background',
        label: 'How would you describe your training background?',
        type: 'radio',
        options: [
          'Complete beginner',
          'Some experience — on and off over the years',
          'Intermediate — fairly consistent for 1–3 years',
          'Experienced — training consistently for 3+ years',
          'Athletic background — sport or performance training',
        ],
      },
      { id: 'training_types', label: 'What kinds of training have you done before?', type: 'textarea', help: 'Gym, running, Pilates, CrossFit, sport — anything counts.', placeholder: "Tell me what you've tried..." },
      { id: 'what_worked', label: 'What has worked for you in the past?', type: 'textarea', help: 'Even if it was short-lived — what felt good, what got results?', placeholder: 'What clicked, even temporarily...' },
      { id: 'what_hasnt_worked', label: "What hasn't worked, and why do you think that is?", type: 'textarea', placeholder: "What you've tried that didn't stick or didn't work..." },
      { id: 'food_dieting_history', label: 'How would you describe your relationship with food and dieting?', type: 'textarea', help: 'Any history of restriction, calorie counting, yo-yo dieting, fad diets — all relevant and all safe to share here.', placeholder: 'Your history with food and dieting...' },
    ],
  },
  {
    title: 'Your Goals',
    fields: [
      {
        id: 'primary_goal',
        label: 'What is your primary goal right now?',
        type: 'radio',
        options: [
          'Fat loss / body recomposition',
          'Building muscle / getting stronger',
          'Both — lose fat and build muscle',
          'Improve fitness and endurance',
          'Feel better in my body day to day',
          'Build consistency and healthy habits',
          'Other',
        ],
      },
      { id: 'goal_description', label: 'Describe your goal in your own words.', type: 'textarea', help: 'What does success actually look and feel like for you? Paint the picture.', placeholder: 'Describe what success looks and feels like...' },
      { id: 'non_scale_goals', label: 'Non-scale goals', type: 'textarea', help: 'Beyond the number, what else matters to you? Energy, confidence, strength, how your clothes fit, keeping up with your kids, a specific lift?', placeholder: 'What matters beyond the scale...' },
      { id: 'timeline', label: 'Is there a timeline you’re working towards?', type: 'text', help: 'A trip, an event, a milestone — or just a general timeframe you have in mind.', placeholder: 'e.g. 3 months, a holiday in June...' },
      { id: 'biggest_obstacle', label: 'What do you think has been the biggest thing holding you back?', type: 'textarea', placeholder: "Be honest — what's really been in the way?" },
    ],
  },
  {
    title: 'Health',
    fields: [
      { id: 'injuries', label: 'Any injuries, chronic pain, or physical limitations?', type: 'textarea', help: 'Past or present — anything that affects how you move or train.', placeholder: 'None, or describe...' },
      { id: 'health_conditions', label: 'Any diagnosed health conditions?', type: 'textarea', help: 'PCOS, thyroid issues, diabetes, autoimmune conditions, anything relevant.', placeholder: 'None, or describe...' },
      { id: 'medications_supplements', label: 'Are you currently taking any medications or supplements?', type: 'textarea', help: 'Including the pill, HRT, thyroid medication, creatine, antidepressants, anything you take regularly.', placeholder: 'None, or list them...' },
      { id: 'energy_levels', label: 'How are your energy levels generally?', type: 'rating', help: 'Select a number from 1 to 10.', min: 'Running on empty', max: 'Energised and firing' },
      { id: 'sleep_hours', label: 'How many hours of sleep do you get on average?', type: 'text', placeholder: 'e.g. 7 hours' },
      {
        id: 'sleep_quality',
        label: 'How would you describe your sleep quality?',
        type: 'radio',
        options: [
          'Great — I fall asleep easily and wake rested',
          'Okay — mostly fine but not always restful',
          'Broken — I wake through the night',
          'Poor — I struggle to fall or stay asleep',
          'It varies a lot',
        ],
      },
      { id: 'stress_levels', label: 'How would you rate your current stress levels?', type: 'rating', help: 'Select a number from 1 to 10.', min: 'Very calm', max: 'Overwhelmed' },
      { id: 'stress_impact', label: 'What does a stressful period look like for you, and how does it affect your habits?', type: 'textarea', placeholder: 'How stress shows up in your life and habits...' },
    ],
  },
  {
    title: 'Nutrition & Digestion',
    fields: [
      {
        id: 'bowel_movements',
        label: 'How often are you having a bowel movement?',
        type: 'radio',
        options: ['Multiple times a day', 'Once a day — regular and consistent', 'Every couple of days', 'Every 3+ days — I struggle to go regularly', 'It varies a lot'],
      },
      {
        id: 'digestive_discomfort',
        label: 'Do you experience bloating, gas, or digestive discomfort?',
        type: 'radio',
        options: ['Rarely or never', 'Occasionally', 'Often — most days', 'Almost always'],
      },
      { id: 'food_intolerances', label: 'Any known food intolerances, sensitivities, or allergies?', type: 'textarea', placeholder: 'None, or describe...' },
      { id: 'water_intake', label: 'How much water do you drink on a typical day?', type: 'text', placeholder: 'e.g. 2 litres, 8 glasses...' },
      {
        id: 'menstrual_cycle',
        label: 'Do you have a menstrual cycle?',
        type: 'radio',
        options: [
          'Yes — regular cycle',
          'Yes — but irregular',
          'No — on hormonal contraception that stops my period',
          'No — post-menopausal',
          'No — perimenopause',
          'No — other reason',
          'Prefer not to say',
        ],
      },
      { id: 'cycle_hormones_notes', label: 'Anything about your cycle or hormones you’d like me to know?', type: 'textarea', help: 'PMS symptoms, PMDD, hormonal acne, mood shifts, energy crashes — anything that affects your life and training.', placeholder: 'Nothing relevant, or share here...' },
    ],
  },
  {
    title: 'Lifestyle',
    fields: [
      { id: 'occupation', label: 'What do you do for work?', type: 'text', help: 'This helps me understand your schedule, activity level, and stress profile.', placeholder: 'Your job or what you do day-to-day...' },
      {
        id: 'job_activity_level',
        label: 'How active is your job day-to-day?',
        type: 'radio',
        options: ['Mostly desk-based — I sit most of the day', 'Mixed — some sitting, some moving', 'On my feet a lot', 'Physically demanding'],
      },
      {
        id: 'travel_frequency',
        label: 'How often do you travel?',
        type: 'radio',
        options: ["Rarely — I'm mostly in one place", 'Occasionally — a few times a year', 'Often — at least once a month', "Constantly — I'm location-free or always on the move"],
      },
      {
        id: 'cooking_for',
        label: 'Who are you cooking for?',
        type: 'radio',
        options: ['Just me', 'Me and a partner', 'A family with kids', 'Housemates with different eating habits', 'I mostly eat out or order in', 'It varies'],
      },
      {
        id: 'eating_out_frequency',
        label: 'How often do you eat out or eat socially?',
        type: 'radio',
        options: ['Rarely — I cook almost everything myself', 'A couple of times a week', 'Most days involve a meal out or with others', 'Almost every meal is out or social'],
      },
      {
        id: 'alcohol_intake',
        label: 'How would you describe your alcohol intake?',
        type: 'radio',
        options: ["I don't drink", 'Rarely — special occasions only', 'Socially — a few times a week', 'Most evenings, usually a glass or two', 'It varies a lot'],
      },
      { id: 'lifestyle_notes', label: 'Anything else about your lifestyle I should know?', type: 'textarea', help: 'Shift work, young kids, caring responsibilities, a very social job, night owl tendencies — anything that shapes your reality.', placeholder: 'Nothing else, or share here...' },
    ],
  },
  {
    title: 'Mindset',
    fields: [
      {
        id: 'eating_patterns',
        label: 'How would you describe your eating patterns day to day?',
        type: 'radio',
        options: [
          'Pretty consistent — I eat similar things most days',
          'Good during the week, looser on weekends',
          'All-or-nothing — either on track or off the rails',
          'I graze throughout the day rather than meals',
          'Chaotic — it really varies',
        ],
      },
      {
        id: 'emotional_eating',
        label: 'Do you eat emotionally or in response to stress?',
        type: 'radio',
        options: ['Rarely or never', 'Sometimes — I notice it but can manage it', "Often — food is my go-to when stressed or overwhelmed", "Yes, and it's something I really struggle with"],
      },
      {
        id: 'disordered_eating_history',
        label: 'Do you have any history with disordered eating or a difficult relationship with food?',
        type: 'radio',
        help: "You don't have to share details — a simple answer helps me understand how to approach nutrition with you.",
        options: ['No, not really', 'In the past, but I feel fairly resolved now', "Yes, it's something I'm navigating currently", "I'd rather not say"],
      },
      { id: 'off_plan_response', label: 'How do you tend to respond when things go off plan?', type: 'textarea', help: 'Do you dust yourself off, or does one bad day become a bad week?', placeholder: 'How you typically respond when things go sideways...' },
      { id: 'food_body_notes', label: 'Is there anything about your relationship with food or your body that you think I should know going in?', type: 'textarea', placeholder: 'Nothing else, or share here...' },
    ],
  },
  {
    title: 'Training Preferences',
    fields: [
      {
        id: 'equipment_access',
        label: 'What equipment do you have access to?',
        type: 'checkbox',
        help: 'Select all that apply.',
        options: ['Full commercial gym', 'Home gym with weights and rack', 'Dumbbells and/or kettlebells at home', 'Resistance bands only', 'Hotel gyms — varies when I travel', 'Bodyweight only'],
      },
      {
        id: 'training_days_per_week',
        label: 'How many days per week can you realistically commit to training?',
        type: 'radio',
        options: ['2', '3', '4', '5', '6', 'It varies week to week'],
      },
      {
        id: 'session_length',
        label: 'How long do you have for each session?',
        type: 'radio',
        options: ['30 minutes or less', 'Around 45 minutes', 'Around 60 minutes', '60–75 minutes', "As long as needed — time isn't a constraint"],
      },
      { id: 'disliked_movements', label: "Are there any movements or exercises you can't do or really dislike?", type: 'textarea', placeholder: 'None, or describe...' },
      { id: 'other_exercise', label: 'Do you do any other exercise outside of your training sessions?', type: 'textarea', help: "Walking, yoga, swimming, sport, cycling — anything that's part of your regular routine.", placeholder: 'Nothing else, or describe...' },
      { id: 'anything_else', label: "Is there anything else you'd like me to know before we get started?", type: 'textarea', help: "Anything this form didn't cover that feels important. The floor is yours.", placeholder: 'Nothing else...' },
      {
        id: 'schedule_call_cta',
        label: 'Schedule your 1:1 strategy call',
        type: 'cta',
        help: "Once you've submitted this, grab a time on my calendar so we can go over everything together.",
        url: 'https://calendar.app.google/myySAkhNztGR19uf6',
        buttonText: 'Book Your Strategy Call',
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
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
                fontSize: '13px',
                fontWeight: 600,
                backgroundColor: done ? '#ce965a' : active ? '#2d1506' : 'transparent',
                border: done || active ? 'none' : '1px solid rgba(45,21,6,0.25)',
                color: done || active ? '#fbf4e9' : 'rgba(45,21,6,0.4)',
              }}
            >
              {done ? '✓' : stepNum}
            </div>
            {stepNum < total && <div style={{ width: '18px', height: '1px', backgroundColor: 'rgba(45,21,6,0.2)' }} />}
          </div>
        );
      })}
    </div>
  );
}

function Field({ field, value, onChange }: { field: FieldDef; value: string | string[] | undefined; onChange: (v: string | string[]) => void }) {
  if (field.type === 'cta') {
    return (
      <div
        style={{
          marginBottom: '32px',
          backgroundColor: '#faf1e3',
          border: '1px solid rgba(206,150,90,0.35)',
          borderRadius: '10px',
          padding: '28px',
        }}
      >
        <p style={{ ...labelStyle, marginBottom: '8px' }}>{field.label}</p>
        {field.help && <p style={{ ...helpStyle, marginBottom: '18px' }}>{field.help}</p>}
        <a
          href={field.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{ display: 'inline-block', textDecoration: 'none' }}
        >
          {field.buttonText || 'Book Now'}
        </a>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: '32px' }}>
      <label style={labelStyle} htmlFor={field.id}>
        {field.label} {field.required && <span style={{ color: '#ce965a' }}>*</span>}
      </label>
      {field.help && <p style={helpStyle}>{field.help}</p>}

      {(field.type === 'text' || field.type === 'email' || field.type === 'number') && (
        <input
          id={field.id}
          type={field.type}
          value={(value as string) || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          style={inputStyle}
        />
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

      {field.type === 'dropdown' && (
        <select
          id={field.id}
          value={(value as string) || ''}
          onChange={(e) => onChange(e.target.value)}
          style={{ ...inputStyle, appearance: 'auto' }}
        >
          <option value="">Select your timezone</option>
          {field.options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      )}

      {field.type === 'radio' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {field.options?.map((o) => {
            const checked = value === o;
            return (
              <label
                key={o}
                style={{
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
                }}
              >
                <input
                  type="radio"
                  name={field.id}
                  checked={checked}
                  onChange={() => onChange(o)}
                  style={{ width: '16px', height: '16px', accentColor: '#ce965a' }}
                />
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
              <label
                key={o}
                style={{
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
                }}
              >
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

      {field.type === 'rating' && (
        <div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => {
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
          {(field.min || field.max) && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
              <span style={{ ...helpStyle, marginBottom: 0 }}>{field.min}</span>
              <span style={{ ...helpStyle, marginBottom: 0 }}>{field.max}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function IntakePage() {
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
    for (let i = 0; i < stepIndex; i++) n += STEPS[i].fields.length;
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
      const response = await fetch('/api/intake', {
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
      <div className="flex flex-col md:flex-row" style={{ minHeight: '100vh', backgroundColor: '#fbf4e9' }}>
        <div className="w-full h-[380px] md:h-screen md:w-[34%] md:sticky md:top-0" style={{ position: 'relative', flexShrink: 0 }}>
          <Image src={img('Madison-73.jpg')} alt="Madison smiling with arms raised outdoors in the mountains" fill priority sizes="(max-width: 768px) 100vw, 34vw" quality={90} className="object-[50%_50%] md:object-[50%_30%]" style={{ objectFit: 'cover' }} />
        </div>
        <div className="w-full md:w-[58%] flex items-center justify-center" style={{ padding: '56px 24px' }}>
          <div style={{ width: '100%', maxWidth: '480px' }} className="quiz-fade-in">
            <p style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', color: '#ce965a', fontSize: 'clamp(20px, 2.2vw, 26px)', marginBottom: '16px' }}>
              Thank you.
            </p>
            <h1 style={{ fontFamily: 'var(--font-instrument-serif), serif', color: '#2d1506', fontSize: 'clamp(36px, 4.6vw, 52px)', lineHeight: '1.05', fontWeight: 400, marginBottom: '20px' }}>
              Thank you for submitting.
            </h1>
            <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: '#45220d', fontSize: '17px', lineHeight: '1.6' }}>
              I can&rsquo;t wait to chat deeper with you on our strategy call. I&rsquo;ll review your answers beforehand
              so we can make the most of our time together.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row" style={{ minHeight: '100vh', backgroundColor: '#fbf4e9' }}>
      <div className="w-full h-[380px] md:h-screen md:w-[34%] md:sticky md:top-0" style={{ position: 'relative', flexShrink: 0 }}>
        <Image src={img('Madison-73.jpg')} alt="Madison smiling with arms raised outdoors in the mountains" fill priority sizes="(max-width: 768px) 100vw, 34vw" quality={90} className="object-[50%_50%] md:object-[50%_30%]" style={{ objectFit: 'cover' }} />
      </div>

      <div className="w-full md:w-[58%]" style={{ padding: '56px 24px 90px' }}>
        <div style={{ width: '100%', maxWidth: '560px', margin: '0 auto' }}>
          <p style={{ ...eyebrow, marginBottom: '12px' }}>Client Intake</p>
          <h1 style={{ fontFamily: 'var(--font-instrument-serif), serif', color: '#2d1506', fontSize: 'clamp(32px, 4vw, 46px)', lineHeight: '1.1', fontWeight: 400, marginBottom: '12px' }}>
            Intake Form
          </h1>
          <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: 'rgba(45,21,6,0.65)', fontSize: '15px', lineHeight: '1.5', marginBottom: '28px' }}>
            Take your time — there are no wrong answers. The more honest you are, the better I can support you.
          </p>

          <Stepper current={stepIndex + 1} total={STEPS.length} />

          {stepIndex > 0 && (
            <p style={{ fontFamily: 'var(--font-instrument-serif), serif', fontStyle: 'italic', color: '#2d1506', fontSize: 'clamp(22px, 2.6vw, 28px)', marginBottom: '32px' }}>
              {step.title}
            </p>
          )}

          {step.fields.map((field, i) => (
            <div key={field.id}>
              <p style={{ ...eyebrow, color: '#a67c52', marginBottom: '6px' }}>{String(fieldStartNumber + i).padStart(2, '0')} —</p>
              <Field field={field} value={answers[field.id]} onChange={(v) => updateField(field.id, v)} />
            </div>
          ))}

          {error && <p style={{ color: '#b3261e', fontFamily: 'var(--font-inter-sans), sans-serif', fontSize: '14px', marginBottom: '16px' }}>{error}</p>}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(45,21,6,0.12)', paddingTop: '28px' }}>
            {!isFirst ? (
              <button
                type="button"
                onClick={handleBack}
                className="btn-secondary"
                style={{ backgroundColor: 'transparent', color: '#2d1506', border: '1px solid rgba(45,21,6,0.25)' }}
              >
                ← Back
              </button>
            ) : (
              <span />
            )}

            {isLast ? (
              <button type="button" onClick={handleSubmit} disabled={isSubmitting} className="btn-primary" style={{ opacity: isSubmitting ? 0.6 : 1 }}>
                {isSubmitting ? 'Submitting…' : 'Submit'}
              </button>
            ) : (
              <button type="button" onClick={handleNext} className="btn-primary">
                Next →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
