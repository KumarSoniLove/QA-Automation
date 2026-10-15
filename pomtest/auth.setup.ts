import { test as setup, expect } from '../base/pomFixture';

setup('Authenticate CI/CD Environment', async ({ page, login }) => {
    const email = process.env.BRIGHTHR_EMAIL;
    const password = process.env.BRIGHTHR_PASSWORD;

    if (!email || !password) {
        throw new Error(
            'BRIGHTHR_EMAIL and BRIGHTHR_PASSWORD must be set in the environment.',
        );
    }

    await page.goto('/login/');
    await expect(page.locator('#username')).toBeVisible();
    await login.login(email, password);

    // Wait for the application to leave the authentication callback.
    await expect(page).not.toHaveURL(/\/login\/callback/);

    // Confirm that the authenticated application is available.
    const employeesLink = page.getByTestId('sideBar').locator('[data-e2e="employees"]');   
    await employeesLink.waitFor();    
    await expect(employeesLink).toBeVisible();

    await page.context().storageState({ path: 'admin.json' });
});
