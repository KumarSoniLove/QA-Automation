import { test as setup, expect } from '../base/pomFixture';

setup('Authenticate CI/CD Environment', async ({ page, loginPage }) => {
     await page.goto('https://brighthr.com');
    await page.waitForLoadState('networkidle');
    
    // 2. Perform your login action sequence
    await loginPage.login(process.env.BRIGHTHR_EMAIL!, process.env.BRIGHTHR_PASSWORD!);
    await page.waitForLoadState('networkidle');
    
    // 3. Confirm access redirection
    await expect(page).toHaveURL(/.*\/dashboard/);
    
    // 4. Extract tokens into storage state memory
    await page.context().storageState({ path: 'admin.json' });
});