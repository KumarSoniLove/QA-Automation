import {test as baseTest} from "@playwright/test";
import LoginPage from "../pages/loginPage";
import EmployeePage from "../pages/employeePage";

type pages = {
    loginPage: LoginPage;
    employeePage: EmployeePage;
};

const testPages = baseTest.extend<pages>({
    loginPage: async ({ page }, use) => await use(new LoginPage(page)),
    employeePage: async ({ page }, use) => await use(new EmployeePage(page)),         
    });

export const test = testPages;
export const expect = testPages.expect;