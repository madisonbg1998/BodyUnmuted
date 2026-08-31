import { test, expect } from '@playwright/test';
import { QUESTIONS } from '@/app/lib/ffa/config';
import { answerIdForLetter, completeQuizWithLetter, goToLanding, startQuiz, STORAGE_KEY, submitEmailModal } from './support/ffa';

test('Back preserves earlier answers, and editing an answer changes the final result', async ({ page }) => {
  await goToLanding(page);
  await startQuiz(page);

  // Answer Q1 as A, move to Q2.
  const q1a = answerIdForLetter('q1', 'A');
  await page.locator(`input[value="${q1a}"]`).locator('xpath=ancestor::label').click();
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await expect(page.getByText('Question 2 of 11')).toBeVisible();

  // Go back — Q1's selection must still be checked.
  await page.getByRole('button', { name: 'Previous', exact: true }).click();
  await expect(page.getByText('Question 1 of 11')).toBeVisible();
  await expect(page.locator(`input[value="${q1a}"]`)).toBeChecked();

  // Change the answer to D instead, then complete the rest of the quiz as D.
  const q1d = answerIdForLetter('q1', 'D');
  await page.locator(`input[value="${q1d}"]`).locator('xpath=ancestor::label').click();
  await page.getByRole('button', { name: 'Next', exact: true }).click();

  for (let i = 1; i < QUESTIONS.length; i++) {
    const question = QUESTIONS[i];
    const answerId = answerIdForLetter(question.id, 'D');
    await page.locator(`input[value="${answerId}"]`).locator('xpath=ancestor::label').click();
    const isLast = i === QUESTIONS.length - 1;
    await page.getByRole('button', { name: isLast ? 'See My Result' : 'Next', exact: true }).click();
  }

  await expect(page.getByRole('dialog', { name: 'Your result is ready.' })).toBeVisible();
  await submitEmailModal(page, 'Robin', 'robin@example.com');
  await expect(page.getByTestId('ffa-result')).toHaveAttribute('data-result', 'D');
});

test('closing the popup returns to a "result ready" screen, and reopening it restores the form', async ({ page }) => {
  await goToLanding(page);
  await startQuiz(page);
  await completeQuizWithLetter(page, 'B');
  await page.getByRole('button', { name: 'See My Result', exact: true }).click();

  const dialog = page.getByRole('dialog', { name: 'Your result is ready.' });
  await expect(dialog).toBeVisible();

  await page.getByRole('button', { name: 'Close', exact: true }).click();
  await expect(dialog).not.toBeVisible();
  await expect(page.getByRole('button', { name: 'See my result', exact: true })).toBeVisible();

  await page.getByRole('button', { name: 'See my result', exact: true }).click();
  await expect(dialog).toBeVisible();

  await submitEmailModal(page, 'Alex', 'alex@example.com');
  await expect(page.getByTestId('ffa-result')).toHaveAttribute('data-result', 'B');
});

test('Escape closes the popup and returns focus sensibly', async ({ page }) => {
  await goToLanding(page);
  await startQuiz(page);
  await completeQuizWithLetter(page, 'C');
  await page.getByRole('button', { name: 'See My Result', exact: true }).click();

  const dialog = page.getByRole('dialog', { name: 'Your result is ready.' });
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(page.getByRole('button', { name: 'See my result', exact: true })).toBeVisible();
});

test('refreshing mid-quiz restores progress before the popup ever opens', async ({ page }) => {
  await goToLanding(page);
  await startQuiz(page);

  const q1a = answerIdForLetter('q1', 'A');
  await page.locator(`input[value="${q1a}"]`).locator('xpath=ancestor::label').click();
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await expect(page.getByText('Question 2 of 11')).toBeVisible();

  const q2a = answerIdForLetter('q2', 'A');
  await page.locator(`input[value="${q2a}"]`).locator('xpath=ancestor::label').click();

  const storedBefore = await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY);
  expect(storedBefore).toBeTruthy();

  await page.reload();

  // Still on Q2, with the Q2 selection intact.
  await expect(page.getByText('Question 2 of 11')).toBeVisible();
  await expect(page.locator(`input[value="${q2a}"]`)).toBeChecked();

  // Going back still shows the Q1 answer from before the reload.
  await page.getByRole('button', { name: 'Previous', exact: true }).click();
  await expect(page.locator(`input[value="${q1a}"]`)).toBeChecked();
});
