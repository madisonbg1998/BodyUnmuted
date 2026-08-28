import { test, expect } from '@playwright/test';
import { RESULTS } from '@/app/lib/ffa/config';
import { ALL_RESULT_LETTERS, finishQuizAndOpenModal, goToLanding, startQuiz, submitEmailModal } from './support/ffa';

test.describe('all four result paths', () => {
  for (const letter of ALL_RESULT_LETTERS) {
    test(`answering all-${letter} reveals type ${letter} after the mock submission succeeds`, async ({ page }) => {
      await goToLanding(page);
      await startQuiz(page);
      await finishQuizAndOpenModal(page, letter);

      // The result must not be discoverable anywhere on the page before submission.
      for (const other of ALL_RESULT_LETTERS) {
        await expect(page.locator('body')).not.toContainText(RESULTS[other].name);
      }

      await submitEmailModal(page, 'Jamie', `jamie-${letter.toLowerCase()}@example.com`);

      const result = page.getByTestId('ffa-result');
      await expect(result).toHaveAttribute('data-result', letter);
      await expect(result).toContainText(RESULTS[letter].name);
    });
  }
});
