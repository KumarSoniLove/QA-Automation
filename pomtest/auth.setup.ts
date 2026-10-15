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

  await expect(page.locator('#username')).toBeVisible();

  await loginPage.login(email, password);

  // Wait for the application to leave the authentication callback.
  await expect(page).not.toHaveURL(/\/login\/callback/);

  // Confirm that the authenticated application is available.
  await expect(
    page.getByTestId('sideBar').getByRole('link', { name: 'Employees' })
  ).toBeVisible();

  await page.context().storageState({ path: 'admin.json' });
});
