import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: '.',
  /* Run tests in files in parallel */
  fullyParallel: true,
  outputDir: 'test-results/failed-assets',
  timeout: 60 * 1000,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { outputFolder: 'test-results/playwright-html', open: 'never' }],
    ['json', { outputFile: 'test-results/jsonReport.json' }],
    ['junit', { outputFile: 'test-results/junitReport.xml' }],
    ['dot'],
    ['allure-playwright', { resultsDir: 'test-results/allure-results' }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
  baseURL: process.env.APP_BASE_URL ?? 'https://sandbox-app.brighthr.com',
  headless: !!process.env.CI,
  screenshot: 'only-on-failure',
  video: 'off',
  trace: 'on-first-retry',
},
  /* Configure projects for major browsers */
 projects: [
  ...(process.env.CI
    ? [
        {
          name: 'setup',
          testMatch: /auth\.setup\.ts/,
          use: {
            baseURL:
              process.env.AUTH_BASE_URL ??
              'https://sandbox-login.brighthr.com',
            // Start the login setup with a clean browser session.
            storageState: { cookies: [], origins: [] },
          },
        },
      ]
    : []),

  {
    name: 'chromium',
    use: {
      ...devices['Desktop Chrome'],
      baseURL: process.env.APP_BASE_URL ?? 'https://sandbox-app.brighthr.com',
      storageState: 'admin.json',
    },
    dependencies: process.env.CI ? ['setup'] : [],
  },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
