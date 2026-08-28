'use client';

import { useEffect, useRef, useState } from 'react';
import { QUESTIONS, TOTAL_QUESTIONS } from '@/app/lib/ffa/config';
import { computeOutcome, shuffle } from '@/app/lib/ffa/scoring';
import { clearProgressKeepOutcome, clearState, createInitialState, loadState, saveState } from '@/app/lib/ffa/storage';
import { track } from '@/app/lib/ffa/analytics';
import { activeLeadCaptureAdapter } from '@/app/lib/ffa/leadAdapter';
import type { FfaState, LeadCapturePayload } from '@/app/lib/ffa/types';
import FfaLanding from './FfaLanding';
import FfaQuestionScreen from './FfaQuestionScreen';
import FfaCalculating from './FfaCalculating';
import FfaEmailModal from './FfaEmailModal';
import FfaResultReady from './FfaResultReady';
import FfaResult from './FfaResult';

function buildAnswerOrder(): Record<string, string[]> {
  const order: Record<string, string[]> = {};
  for (const q of QUESTIONS) {
    order[q.id] = shuffle(q.answers.map((a) => a.id));
  }
  return order;
}

export default function FfaApp() {
  const [state, setState] = useState<FfaState | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const viewTracked = useRef(false);

  useEffect(() => {
    const loaded = loadState();
    setState(loaded ?? createInitialState());

    // If she refreshed mid-"calculating" (the JS timer wouldn't survive a
    // reload), finish that transition now instead of leaving her stuck.
    // Her outcome was already computed and saved before this phase began.
    if (loaded?.phase === 'calculating') {
      const timer = setTimeout(() => {
        setState((prev) => {
          const next: FfaState = { ...prev!, phase: 'email-gate', modalOpen: true };
          saveState(next);
          return next;
        });
        track('quiz_email_modal_view');
      }, 700);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (state?.phase === 'landing' && !viewTracked.current) {
      viewTracked.current = true;
      track('quiz_view');
    }
  }, [state?.phase]);

  if (!state) return null;

  function update(patch: Partial<FfaState>) {
    setState((prev) => {
      const next = { ...prev!, ...patch };
      saveState(next);
      return next;
    });
  }

  function handleStart() {
    track('quiz_start');
    update({ phase: 'question', currentQuestionIndex: 0, answerOrder: buildAnswerOrder() });
  }

  function handleSelect(questionId: string, answerId: string) {
    update({ answers: { ...state!.answers, [questionId]: answerId } });
  }

  function handleNext() {
    const question = QUESTIONS[state!.currentQuestionIndex];
    track('quiz_question_complete', { questionId: question.id });

    const isLast = state!.currentQuestionIndex === TOTAL_QUESTIONS - 1;
    if (!isLast) {
      update({ currentQuestionIndex: state!.currentQuestionIndex + 1 });
      return;
    }

    // Q12 answered — compute the outcome privately now. It is stored in
    // state (so a refresh doesn't lose it) but nothing renders it until the
    // mock submission succeeds.
    const outcome = computeOutcome(QUESTIONS, state!.answers);
    track('quiz_complete', { primaryResult: outcome.primaryResult, goal: outcome.goal });
    update({ phase: 'calculating', completedAt: new Date().toISOString(), outcome });

    setTimeout(() => {
      update({ phase: 'email-gate', modalOpen: true });
      track('quiz_email_modal_view');
    }, 700);
  }

  function handlePrevious() {
    update({ currentQuestionIndex: Math.max(0, state!.currentQuestionIndex - 1) });
  }

  function handleCloseModal() {
    update({ modalOpen: false });
    setSubmitError(null);
  }

  function handleReopenModal() {
    update({ modalOpen: true });
    setSubmitError(null);
    track('quiz_email_modal_view');
  }

  async function handleModalSubmit(firstName: string, email: string, consent: boolean) {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const payload: LeadCapturePayload = {
        ...state!.outcome!,
        firstName,
        email,
        consent,
        source: state!.utm.utm_source,
        medium: state!.utm.utm_medium,
        campaign: state!.utm.utm_campaign,
        content: state!.utm.utm_content,
        term: state!.utm.utm_term,
        referrer: state!.referrer ?? undefined,
        completedAt: state!.completedAt ?? new Date().toISOString(),
      };

      await activeLeadCaptureAdapter.submit(payload);
      track('quiz_mock_submit_success');

      const trimmed = clearProgressKeepOutcome(state!);
      setState(trimmed);
      track('quiz_result_reveal', { primaryResult: trimmed.outcome!.primaryResult, goal: trimmed.outcome!.goal });
    } catch {
      // The mock adapter never throws; the real Kit adapter can (network
      // error, Kit outage, etc.). Keep the modal open with her answers
      // intact so she can just try again.
      setSubmitError('Something went wrong submitting that — please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleRestart() {
    clearState();
    viewTracked.current = false;
    setIsSubmitting(false);
    setState(createInitialState());
  }

  switch (state.phase) {
    case 'landing':
      return <FfaLanding onStart={handleStart} />;

    case 'question': {
      const question = QUESTIONS[state.currentQuestionIndex];
      const order = state.answerOrder[question.id] ?? question.answers.map((a) => a.id);
      return (
        <FfaQuestionScreen
          question={question}
          order={order}
          questionNumber={state.currentQuestionIndex + 1}
          totalQuestions={TOTAL_QUESTIONS}
          selectedId={state.answers[question.id]}
          onSelect={(id) => handleSelect(question.id, id)}
          onNext={handleNext}
          onPrevious={handlePrevious}
          canGoBack={state.currentQuestionIndex > 0}
        />
      );
    }

    case 'calculating':
      return <FfaCalculating />;

    case 'email-gate':
      // The "ready" screen is always the backdrop content for this phase —
      // the modal (open by default on arrival) sits on top of it, and
      // reappears alone if she closes the modal without submitting.
      return (
        <>
          <FfaResultReady onReopen={handleReopenModal} onRestart={handleRestart} />
          <FfaEmailModal
            isOpen={state.modalOpen}
            isSubmitting={isSubmitting}
            submitError={submitError}
            onClose={handleCloseModal}
            onSubmit={handleModalSubmit}
          />
        </>
      );

    case 'revealed':
      if (!state.outcome) return <FfaCalculating />;
      return <FfaResult primaryResult={state.outcome.primaryResult} onRestart={handleRestart} />;

    default:
      return null;
  }
}
