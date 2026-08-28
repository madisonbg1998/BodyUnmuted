import { defineConfig, devices } from '@playwright/test';

const PORT = 3100;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'on-first-retry',
    contextOptions: { reducedMotion: 'reduce' },
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-iphone-se', use: { ...devices['iPhone SE'] } },
  ],
  webServer: {
    // Preview mode (not production) so the FFA route is reachable and the
    // dev-only notices render — matches how this quiz is meant to be QA'd.
    command: `next dev -p ${PORT}`,
    url: `http://localhost:${PORT}/freedom-fitness-audit`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
