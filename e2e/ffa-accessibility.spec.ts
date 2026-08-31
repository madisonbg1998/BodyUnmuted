import type { Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { QUESTIONS, RESULTS } from '@/app/lib/ffa/config';
import { answerIdForLetter, goToLanding } from './support/ffa';

// Reduced motion is set globally in playwright.config.ts (it disables the
// .quiz-fade-in opacity transition, which already honors
// prefers-reduced-motion) so axe never samples a mid-fade color and reports
// a false-positive contrast failure.

// Custom (next/font) glyphs can still be settling into their final rasterized
// form for a moment after first paint — scanning too early makes axe's pixel
// sampler read a lighter, transitional color and report a false contrast
// failure. Waiting for fonts to report ready (plus a short settle buffer)
// gives axe the final, real rendering to check.
async function waitForStableRender(page: Page) {
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
}

test('landing page has no automatically detectable accessibility violations', async ({ page }) => {
  await goToLanding(page);
  await waitForStableRender(page);
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test('a question screen has no automatically detectable accessibility violations', async ({ page }) => {
  await goToLanding(page);
  await page.getByRole('button', { name: 'Find my freedom pattern', exact: true }).first().click();
  await expect(page.getByText('Question 1 of 11')).toBeVisible();
  await waitForStableRender(page);
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test('the email modal has no automatically detectable accessibility violations', async ({ page }) => {
  await goToLanding(page);
  await page.getByRole('button', { name: 'Find my freedom pattern', exact: true }).first().click();
  for (let i = 0; i < QUESTIONS.length; i++) {
    const question = QUESTIONS[i];
    const answerId = answerIdForLetter(question.id, 'A');
    await page.locator(`input[value="${answerId}"]`).locator('xpath=ancestor::label').click();
    const isLast = i === QUESTIONS.length - 1;
    await page.getByRole('button', { name: isLast ? 'See My Result' : 'Next', exact: true }).click();
  }
  await expect(page.getByRole('dialog', { name: 'Your result is ready.' })).toBeVisible();
  await waitForStableRender(page);
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test('the result reveal screen has no automatically detectable accessibility violations', async ({ page }) => {
  await goToLanding(page);
  await page.getByRole('button', { name: 'Find my freedom pattern', exact: true }).first().click();
  for (let i = 0; i < QUESTIONS.length; i++) {
    const question = QUESTIONS[i];
    const answerId = answerIdForLetter(question.id, 'A');
    await page.locator(`input[value="${answerId}"]`).locator('xpath=ancestor::label').click();
    const isLast = i === QUESTIONS.length - 1;
    await page.getByRole('button', { name: isLast ? 'See My Result' : 'Next', exact: true }).click();
  }
  const modal = page.getByRole('dialog', { name: 'Your result is ready.' });
  await modal.locator('#ffa-first-name').fill('Morgan');
  await modal.locator('#ffa-email').fill('morgan@example.com');
  await modal.getByRole('button', { name: 'Reveal my type', exact: true }).click();
  await expect(page.getByTestId('ffa-result')).toBeVisible({ timeout: 5000 });
  await waitForStableRender(page);

  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test('the whole quiz is completable with keyboard only, including the trapped modal', async ({ page }) => {
  await goToLanding(page);

  // Focus the start button directly with the keyboard and activate it via
  // Enter — global site nav/footer tab-stop order is out of scope here.
  const startButton = page.getByRole('button', { name: 'Find my freedom pattern', exact: true }).first();
  await startButton.focus();
  await expect(startButton).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByText('Question 1 of 11')).toBeVisible();

  for (let i = 0; i < QUESTIONS.length; i++) {
    const question = QUESTIONS[i];
    const answerId = answerIdForLetter(question.id, 'A');
    const input = page.locator(`input[value="${answerId}"]`);
    await input.focus();
    await page.keyboard.press('Space');
    await expect(input).toBeChecked();

    const isLast = i === QUESTIONS.length - 1;
    const nextButton = page.getByRole('button', { name: isLast ? 'See My Result' : 'Next', exact: true });
    await nextButton.focus();
    await page.keyboard.press('Enter');
  }

  const dialog = page.getByRole('dialog', { name: 'Your result is ready.' });
  await expect(dialog).toBeVisible();

  // Focus trap: opening the modal moves focus to its first focusable child
  // (the close button), inside the dialog.
  await expect(dialog.getByRole('button', { name: 'Close', exact: true })).toBeFocused();

  // Tab order inside the dialog: close button -> first name -> email ->
  // consent checkbox -> submit.
  await page.keyboard.press('Tab');
  await expect(dialog.locator('#ffa-first-name')).toBeFocused();
  await page.keyboard.type('Taylor');

  await page.keyboard.press('Tab');
  await expect(dialog.locator('#ffa-email')).toBeFocused();
  await page.keyboard.type('taylor@example.com');

  // WebKit's default tab order skips buttons/checkboxes unless the OS-level
  // "Full Keyboard Access" setting is on (a platform default, not a bug in
  // this quiz) — focus the submit button directly rather than assume a Tab
  // count that only holds in Chromium's default tab order.
  const submitButton = dialog.getByRole('button', { name: 'Reveal my type', exact: true });
  await submitButton.focus();
  await expect(submitButton).toBeFocused();
  await page.keyboard.press('Enter');

  const result = page.getByTestId('ffa-result');
  await expect(result).toBeVisible({ timeout: 5000 });
  await expect(result).toContainText(RESULTS.A.name);
});
