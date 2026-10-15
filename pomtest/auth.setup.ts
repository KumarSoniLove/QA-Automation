import { test as setup, expect } from '../base/pomFixture';

setup('Authenticate CI/CD Environment', async ({ page, loginPage }) => {
    // 1. Navigate directly to the absolute login subdomain url
    await page.goto('https://brighthr.com');
    
    // 2. Log in using the secure secrets pulled by the machine
    await loginPage.login(process.env.BRIGHTHR_EMAIL!, process.env.BRIGHTHR_PASSWORD!);
    await page.waitForLoadState('networkidle');
    
    // 3. Confirm login landed on the dashboard successfully
    await expect(page).toHaveURL(/.*\/dashboard/);
    
    // 4. Save the cookies out to admin.json so employee.test.ts can read them automatically
    await page.context().storageState({ path: 'admin.json' });
});