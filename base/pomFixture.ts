import {test as base} from "@playwright/test";
import LoginPage from "../pages/loginPage";
import EmployeePage from "../pages/employeePage";

type myFixtures = {
    login: LoginPage;
    employee: EmployeePage;
};

const testPages = base.extend<myFixtures>({
    login: async ({ page }, use) => await use(new LoginPage(page)),
    employee: async ({ page }, use) => await use(new EmployeePage(page)),         
    });

export const test = testPages;
export const expect = testPages.expect;