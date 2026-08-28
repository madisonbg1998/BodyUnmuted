import { test, expect } from '@playwright/test';
import { RESULTS } from '@/app/lib/ffa/config';
import { finishQuizAndOpenModal, goToLanding, startQuiz, submitEmailModal } from './support/ffa';

// A plain narrow viewport rather than a full device preset — device presets
// like devices['iPhone SE'] pin the test to WebKit, which isn't installed in
// every environment. What this test actually checks (no horizontal scroll,
// modal fits) only depends on viewport width, not the browser engine.
test.use({ viewport: { width: 320, height: 700 }, hasTouch: true, isMobile: true });

test('the full quiz completes on a narrow (320px-class) mobile viewport with no horizontal scroll', async ({ page }) => {
  await goToLanding(page);

  const hasHorizontalScroll = () =>
    page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);

  expect(await hasHorizontalScroll()).toBe(false);

  await startQuiz(page);
  expect(await hasHorizontalScroll()).toBe(false);

  await finishQuizAndOpenModal(page, 'C');

  const dialog = page.getByRole('dialog', { name: 'Your result is ready.' });
  await expect(dialog).toBeVisible();
  const box = await dialog.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.width).toBeLessThanOrEqual(320);

  await submitEmailModal(page, 'Nour', 'nour@example.com');
  expect(await hasHorizontalScroll()).toBe(false);
  await expect(page.getByTestId('ffa-result')).toContainText(RESULTS.C.name);
});
