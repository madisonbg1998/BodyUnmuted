'use client';

import { useEffect, useRef, useState } from 'react';
import {
  QUESTIONS,
  TIEBREAK_PRIMARY_PROMPT,
  TIEBREAK_PRIMARY_SUBPROMPT,
  TIEBREAK_SECONDARY_PROMPT,
  TIEBREAK_SECONDARY_SUBPROMPT,
} from '@/app/lib/quiz/config';
import { computeScores, resolveResult, shuffle } from '@/app/lib/quiz/scoring';
import { createInitialState, loadState, saveState, clearState } from '@/app/lib/quiz/storage';
import { track } from '@/app/lib/quiz/analytics';
import type { ArchetypeId, QuizState, SingleSelectQuestion, RankedTwoQuestion } from '@/app/lib/quiz/types';
import QuizLanding from './QuizLanding';
import QuizQuestionScreen from './QuizQuestionScreen';
import QuizRankedQuestion from './QuizRankedQuestion';
import QuizTiebreak from './QuizTiebreak';
import QuizCalculating from './QuizCalculating';
import QuizResults from './QuizResults';

const TOTAL_QUESTIONS = QUESTIONS.length;

function buildAnswerOrder(): Record<string, string[]> {
  const order: Record<string, string[]> = {};
  for (const q of QUESTIONS) {
    order[q.id] = shuffle(q.answers.map((a) => a.id));
  }
  return order;
}

export default function QuizApp() {
  const [state, setState] = useState<QuizState | null>(null);
  // Q13's in-progress ranked picks live outside persisted state — see note below.
  const [q13Draft, setQ13Draft] = useState<{ rank1?: string; rank2?: string }>({});

  const landingTracked = useRef(false);
  const abandonTracked = useRef(false);

  useEffect(() => {
    const loaded = loadState();
    setState(loaded ?? createInitialState());

    // If she refreshed mid-"calculating" (the JS timer wouldn't survive a
    // reload), finish that transition to results now instead of hanging.
    if (loaded?.phase === 'calculating') {
      const timer = setTimeout(() => {
        setState((prev) => {
          const next = { ...prev!, phase: 'results' as const };
          saveState(next);
          return next;
        });
      }, 600);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (state?.phase === 'landing' && !landingTracked.current) {
      landingTracked.current = true;
      track('quiz_landing_viewed');
    }
  }, [state?.phase]);

  // Best-effort abandonment tracking while she's actually taking the quiz.
  useEffect(() => {
    if (!state) return;
    const inProgress = state.phase === 'question' || state.phase === 'primary-tiebreak' || state.phase === 'secondary-tiebreak';
    if (!inProgress) return;

    function handlePageHide() {
      if (abandonTracked.current) return;
      abandonTracked.current = true;
      track('quiz_abandoned', { questionIndex: state!.currentQuestionIndex });
    }

    window.addEventListener('pagehide', handlePageHide);
    return () => window.removeEventListener('pagehide', handlePageHide);
  }, [state]);

  if (!state) return null;

  function update(patch: Partial<QuizState>) {
    setState((prev) => {
      const next = { ...prev!, ...patch };
      saveState(next);
      return next;
    });
  }

  function handleStart() {
    track('quiz_started');
    update({ phase: 'question', currentQuestionIndex: 0, answerOrder: buildAnswerOrder() });
  }

  function handleSelectSingle(questionId: string, answerId: string) {
    update({ answers: { ...state!.answers, [questionId]: answerId } });
  }

  function handleNext() {
    const question = QUESTIONS[state!.currentQuestionIndex];
    track('quiz_question_completed', { questionId: question.id });
    update({ currentQuestionIndex: state!.currentQuestionIndex + 1 });
  }

  function handlePrevious() {
    update({ currentQuestionIndex: Math.max(0, state!.currentQuestionIndex - 1) });
  }

  function handleChangeRank1(id: string) {
    setQ13Draft(id ? { rank1: id } : {});
  }

  function handleChangeRank2(id: string) {
    setQ13Draft((prev) => ({ ...prev, rank2: id }));
  }

  function finalize(primary: ArchetypeId, secondary: ArchetypeId) {
    track('quiz_completed', { primary, secondary });
    update({ phase: 'calculating', completedAt: new Date().toISOString(), primary, secondary });
    setTimeout(() => {
      update({ phase: 'results' });
      track('quiz_results_viewed', { primary, secondary });
    }, 1500);
  }

  function handleFinishQuiz() {
    const q13Id = QUESTIONS[QUESTIONS.length - 1].id;
    const answers = { ...state!.answers, [q13Id]: { rank1: q13Draft.rank1!, rank2: q13Draft.rank2! } };
    update({ answers });

    const scores = computeScores(QUESTIONS, answers);
    const result = resolveResult(scores);

    if (result.needsPrimaryTiebreak) {
      update({
        answers,
        phase: 'primary-tiebreak',
        primaryTiebreakOrder: shuffle(result.primaryTiedCandidates),
      });
      return;
    }
    if (result.needsSecondaryTiebreak) {
      update({
        answers,
        phase: 'secondary-tiebreak',
        secondaryTiebreakOrder: shuffle(result.secondaryTiedCandidates),
      });
      return;
    }
    finalize(result.primary!, result.secondary!);
  }

  function handlePrimaryTiebreakSelect(choice: ArchetypeId) {
    const scores = computeScores(QUESTIONS, state!.answers);
    const result = resolveResult(scores, choice);
    update({ primaryTiebreakChoice: choice });

    if (result.needsSecondaryTiebreak) {
      update({
        primaryTiebreakChoice: choice,
        phase: 'secondary-tiebreak',
        secondaryTiebreakOrder: shuffle(result.secondaryTiedCandidates),
      });
      return;
    }
    finalize(result.primary!, result.secondary!);
  }

  function handleSecondaryTiebreakSelect(choice: ArchetypeId) {
    const scores = computeScores(QUESTIONS, state!.answers);
    const result = resolveResult(scores, state!.primaryTiebreakChoice, choice);
    finalize(result.primary!, result.secondary!);
  }

  function handleRestart() {
    clearState();
    landingTracked.current = false;
    abandonTracked.current = false;
    setQ13Draft({});
    setState(createInitialState());
  }

  switch (state.phase) {
    case 'landing':
      return <QuizLanding onStart={handleStart} />;

    case 'question': {
      const question = QUESTIONS[state.currentQuestionIndex];
      const order = state.answerOrder[question.id] ?? question.answers.map((a) => a.id);
      const questionNumber = state.currentQuestionIndex + 1;

      if (question.type === 'ranked-two') {
        return (
          <QuizRankedQuestion
            question={question as RankedTwoQuestion}
            order={order}
            questionNumber={questionNumber}
            totalQuestions={TOTAL_QUESTIONS}
            rank1={q13Draft.rank1}
            rank2={q13Draft.rank2}
            onChangeRank1={handleChangeRank1}
            onChangeRank2={handleChangeRank2}
            onNext={handleFinishQuiz}
            onPrevious={handlePrevious}
          />
        );
      }

      return (
        <QuizQuestionScreen
          question={question as SingleSelectQuestion}
          order={order}
          questionNumber={questionNumber}
          totalQuestions={TOTAL_QUESTIONS}
          selectedId={state.answers[question.id] as string | undefined}
          onSelect={(id) => handleSelectSingle(question.id, id)}
          onNext={handleNext}
          onPrevious={handlePrevious}
          canGoBack={state.currentQuestionIndex > 0}
        />
      );
    }

    case 'primary-tiebreak': {
      const order = state.primaryTiebreakOrder ?? [];
      return (
        <QuizTiebreak
          prompt={TIEBREAK_PRIMARY_PROMPT}
          subprompt={TIEBREAK_PRIMARY_SUBPROMPT}
          candidates={order}
          order={order}
          onSelect={handlePrimaryTiebreakSelect}
        />
      );
    }

    case 'secondary-tiebreak': {
      const order = state.secondaryTiebreakOrder ?? [];
      return (
        <QuizTiebreak
          prompt={TIEBREAK_SECONDARY_PROMPT}
          subprompt={TIEBREAK_SECONDARY_SUBPROMPT}
          candidates={order}
          order={order}
          onSelect={handleSecondaryTiebreakSelect}
        />
      );
    }

    case 'calculating':
      return <QuizCalculating />;

    case 'results':
      if (!state.primary || !state.secondary) return <QuizCalculating />;
      return <QuizResults primary={state.primary} secondary={state.secondary} onRestart={handleRestart} />;

    default:
      return null;
  }
}
