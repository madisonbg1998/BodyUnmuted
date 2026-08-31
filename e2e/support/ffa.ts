import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { QUESTIONS, TOTAL_QUESTIONS } from '@/app/lib/ffa/config';
import type { ResultType } from '@/app/lib/ffa/types';

export const STORAGE_KEY = 'bodyunmuted_ffa_state';

export function answerIdForLetter(questionId: string, letter: ResultType): string {
  const question = QUESTIONS.find((q) => q.id === questionId);
  if (!question || question.kind !== 'scored') {
    throw new Error(`Question ${questionId} is not a scored question`);
  }
  const answer = question.answers.find((a) => a.result === letter);
  if (!answer) throw new Error(`No ${letter} answer on ${questionId}`);
  return answer.id;
}

export async function goToLanding(page: Page) {
  await page.goto('/freedom-fitness-audit');
}

export async function startQuiz(page: Page) {
  // The landing page has two "Find my freedom pattern" buttons (hero + bottom
  // CTA) — either one starts the quiz, so just use the first.
  await page.getByRole('button', { name: 'Find my freedom pattern', exact: true }).first().click();
  await expect(page.getByText('Question 1 of 11')).toBeVisible();
}

async function selectAnswer(page: Page, answerId: string) {
  const input = page.locator(`input[value="${answerId}"]`);
  await input.locator('xpath=ancestor::label').click();
  await expect(input).toBeChecked();
}

async function clickNext(page: Page, isLast: boolean) {
  const label = isLast ? 'See My Result' : 'Next';
  await page.getByRole('button', { name: label, exact: true }).click();
}

/**
 * Answers every question with the option that scores the given letter.
 * Produces an 11-0-0-0 result, so `letter` always wins outright with no
 * secondary — deterministic for e2e without duplicating the tie-break math
 * already covered by app/lib/ffa/scoring.test.ts.
 */
export async function completeQuizWithLetter(page: Page, letter: ResultType, { upTo = TOTAL_QUESTIONS }: { upTo?: number } = {}) {
  for (let i = 0; i < upTo; i++) {
    const question = QUESTIONS[i];
    const answerId = answerIdForLetter(question.id, letter);
    await selectAnswer(page, answerId);
    if (i < upTo - 1) {
      await clickNext(page, false);
    }
  }
}

export async function finishQuizAndOpenModal(page: Page, letter: ResultType) {
  await completeQuizWithLetter(page, letter);
  await page.getByRole('button', { name: 'See My Result', exact: true }).click();
  await expect(page.getByRole('dialog', { name: 'Your result is ready.' })).toBeVisible();
}

export async function submitEmailModal(page: Page, firstName: string, email: string) {
  const dialog = page.getByRole('dialog', { name: 'Your result is ready.' });
  await dialog.locator('#ffa-first-name').fill(firstName);
  await dialog.locator('#ffa-email').fill(email);
  await dialog.getByRole('button', { name: 'Reveal my type', exact: true }).click();
  await expect(page.getByTestId('ffa-result')).toBeVisible({ timeout: 5000 });
}

export const ALL_RESULT_LETTERS: ResultType[] = ['A', 'B', 'C', 'D'];
