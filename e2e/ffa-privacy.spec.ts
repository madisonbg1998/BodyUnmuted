import { test, expect } from '@playwright/test';
import { STORAGE_KEY, completeQuizWithLetter, goToLanding, startQuiz, submitEmailModal } from './support/ffa';

const SENTINEL_NAME = 'Zzqx_PRIVACY_TEST_NAME';
const SENTINEL_EMAIL = 'zzqx.privacy.test@example.com';

test('the mock submission never sends a network request, and never logs or persists name/email', async ({ page }) => {
  const requests: string[] = [];
  page.on('request', (req) => requests.push(req.url()));

  const consoleTexts: string[] = [];
  page.on('console', (msg) => consoleTexts.push(msg.text()));

  await goToLanding(page);
  await startQuiz(page);
  await completeQuizWithLetter(page, 'A');
  await page.getByRole('button', { name: 'See My Result', exact: true }).click();
  await submitEmailModal(page, SENTINEL_NAME, SENTINEL_EMAIL);

  // No outbound request should ever carry the sentinel name/email — and since
  // the mock adapter has no destination at all, no non-navigation/asset
  // request should fire as part of the submission.
  const leaked = requests.filter((url) => url.includes(SENTINEL_NAME) || url.includes(encodeURIComponent(SENTINEL_EMAIL)));
  expect(leaked).toEqual([]);

  const loggedLeak = consoleTexts.some((t) => t.includes(SENTINEL_NAME) || t.includes(SENTINEL_EMAIL));
  expect(loggedLeak).toBe(false);

  const storageDump = await page.evaluate(() => JSON.stringify(localStorage));
  expect(storageDump.includes(SENTINEL_NAME)).toBe(false);
  expect(storageDump.includes(SENTINEL_EMAIL)).toBe(false);

  // Progress (answers) is cleared after a successful mock submission, while
  // the calculated result is kept so the reveal screen can still render it.
  const raw = await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY);
  expect(raw).toBeTruthy();
  const state = JSON.parse(raw as string);
  expect(state.answers).toEqual({});
  expect(state.outcome).toBeTruthy();
});

test('the result type is not present in the DOM at any point before the mock submission resolves', async ({ page }) => {
  await goToLanding(page);
  await startQuiz(page);
  await completeQuizWithLetter(page, 'D');
  await page.getByRole('button', { name: 'See My Result', exact: true }).click();

  const dialog = page.getByRole('dialog', { name: 'Your result is ready.' });
  await expect(dialog).toBeVisible();
  await expect(page.getByTestId('ffa-result')).toHaveCount(0);

  await dialog.locator('#ffa-first-name').fill('Sam');
  await dialog.locator('#ffa-email').fill('sam@example.com');

  // Click submit and immediately assert the result still isn't rendered yet
  // (the mock adapter has an artificial delay before resolving).
  await dialog.getByRole('button', { name: 'Reveal my type', exact: true }).click();
  await expect(page.getByTestId('ffa-result')).toHaveCount(0);

  await expect(page.getByTestId('ffa-result')).toBeVisible({ timeout: 5000 });
});
