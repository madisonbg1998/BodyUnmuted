import { test } from '@playwright/test';
import path from 'node:path';
import { ALL_RESULT_LETTERS, finishQuizAndOpenModal, goToLanding, startQuiz, submitEmailModal } from './support/ffa';

/**
 * Not a real assertion suite — generates the QA screenshots referenced in
 * README.md. Run manually with:
 *   CAPTURE_SCREENSHOTS=1 npx playwright test e2e/capture-screenshots.spec.ts --project=chromium
 * Skipped by default so it doesn't run as part of `npm run test:e2e`.
 */
test.describe.configure({ mode: 'serial' });
test.skip(!process.env.CAPTURE_SCREENSHOTS, 'run explicitly with CAPTURE_SCREENSHOTS=1');

const OUT_DIR = path.join(process.cwd(), 'docs/freedom-fitness-audit/screenshots');

test('landing page', async ({ page }) => {
  await goToLanding(page);
  await page.screenshot({ path: path.join(OUT_DIR, 'landing.png'), fullPage: true });
});

test('question screen', async ({ page }) => {
  await goToLanding(page);
  await startQuiz(page);
  await page.screenshot({ path: path.join(OUT_DIR, 'question.png'), fullPage: true });
});

test('email popup', async ({ page }) => {
  await goToLanding(page);
  await startQuiz(page);
  await finishQuizAndOpenModal(page, 'A');
  await page.screenshot({ path: path.join(OUT_DIR, 'popup.png'), fullPage: true });
});

test('result-ready screen (popup closed before submitting)', async ({ page }) => {
  await goToLanding(page);
  await startQuiz(page);
  await finishQuizAndOpenModal(page, 'A');
  await page.getByRole('button', { name: 'Close', exact: true }).click();
  await page.screenshot({ path: path.join(OUT_DIR, 'result-ready.png'), fullPage: true });
});

for (const letter of ALL_RESULT_LETTERS) {
  test(`result reveal ${letter}`, async ({ page }) => {
    await goToLanding(page);
    await startQuiz(page);
    await finishQuizAndOpenModal(page, letter);
    await submitEmailModal(page, 'Jamie', `jamie-${letter.toLowerCase()}@example.com`);
    await page.screenshot({ path: path.join(OUT_DIR, `reveal-${letter}.png`), fullPage: true });
  });
}

test('narrow mobile viewport', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await goToLanding(page);
  await page.screenshot({ path: path.join(OUT_DIR, 'mobile-narrow-landing.png'), fullPage: true });

  await startQuiz(page);
  await page.screenshot({ path: path.join(OUT_DIR, 'mobile-narrow-question.png'), fullPage: true });
});
