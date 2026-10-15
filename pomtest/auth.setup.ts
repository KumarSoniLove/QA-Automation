
import { test as setup, expect } from '../base/pomFixture';

setup('Authenticate CI/CD Environment', async ({ page, loginPage }) => {
  const email = process.env.BRIGHTHR_EMAIL;
  const password = process.env.BRIGHTHR_PASSWORD;

  if (!email || !password) {
    throw new Error(
      'BRIGHTHR_EMAIL and BRIGHTHR_PASSWORD must be set in the environment.',
    );
  }

  await page.goto('/login/');

  // Verify that the expected login form is displayed before filling it.
  await expect(page.locator('#username')).toBeVisible();

  await loginPage.login(email, password);

  // Replace this with the actual URL reached after a successful login.
  await expect(page).toHaveURL(/employee-hub|dashboard/);

  await page.context().storageState({ path: 'admin.json' });
});
