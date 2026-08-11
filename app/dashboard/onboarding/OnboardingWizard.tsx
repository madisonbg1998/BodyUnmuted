'use client';

import { useState } from 'react';
import type { OnboardingStatus } from '@/app/lib/adhara-portal';
import WelcomeStep from './WelcomeStep';
import AboutStep from './AboutStep';
import SocialStep from './SocialStep';
import PreferencesStep from './PreferencesStep';
import SkipOnboardingButton from './SkipOnboardingButton';
import OnboardingComplete from './OnboardingComplete';

const STEP_ORDER = ['welcome', 'about', 'social', 'preferences'] as const;
type StepKey = (typeof STEP_ORDER)[number];

function isStepKey(value: string | null | undefined): value is StepKey {
  return !!value && (STEP_ORDER as readonly string[]).includes(value);
}

export default function OnboardingWizard({ status, userName }: { status: OnboardingStatus; userName: string | null }) {
  const [step, setStep] = useState<StepKey>(isStepKey(status.current_step) ? status.current_step : 'welcome');
  const [done, setDone] = useState(status.onboarding_completed);

  if (done) return <OnboardingComplete />;

  const stepIndex = STEP_ORDER.indexOf(step);

  const handleAdvance = (nextStep: string | null, completed: boolean) => {
    if (completed) {
      setDone(true);
      return;
    }
    if (isStepKey(nextStep)) {
      setStep(nextStep);
    } else if (stepIndex < STEP_ORDER.length - 1) {
      setStep(STEP_ORDER[stepIndex + 1]);
    } else {
      setDone(true);
    }
  };

  return (
    <div style={{ maxWidth: '560px' }}>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
        {STEP_ORDER.map((s, i) => (
          <div
            key={s}
            style={{
              flex: 1,
              height: '4px',
              borderRadius: '2px',
              backgroundColor: i <= stepIndex ? '#525421' : 'rgba(45,21,6,0.12)',
            }}
          />
        ))}
      </div>

      {step === 'welcome' && <WelcomeStep defaultName={userName} onAdvance={handleAdvance} />}
      {step === 'about' && <AboutStep onAdvance={handleAdvance} />}
      {step === 'social' && <SocialStep onAdvance={handleAdvance} />}
      {step === 'preferences' && <PreferencesStep onAdvance={handleAdvance} />}

      <SkipOnboardingButton onSkip={() => setDone(true)} />
    </div>
  );
}
