import {type Page, type Locator } from "@playwright/test";

export default class LoginPage {

    private readonly page: Page;
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginBtn: Locator;



    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator("#username");
        this.passwordInput = page.locator("#password");
        this.loginBtn = page.locator("#login");   
    }

    async login(email: string, password: string) {
        await this.enterEmail(email);
        await this.enterLoginPassword(password);
        await this.clickLoginBtn();
    }

    async enterEmail (email: string) {
        await this.emailInput.fill(email);
    }

    async enterLoginPassword (password: string) {
        await this.passwordInput.fill(password);
    }

    async clickLoginBtn () {
        await this.loginBtn.click()        
    }

}