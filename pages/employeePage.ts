import { expect, type Page, type Locator } from "@playwright/test";

export type EmployeeDetails = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    startDate?: string;
    jobTitle?: string;
};

export default class EmployeePage {
    // 1. Declare the structural locators as private properties
    private readonly page: Page;
    private readonly employeesTab: Locator;
    private readonly addEmployeeBtn: Locator;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly emailInput: Locator;
    private readonly phoneInput: Locator;
    private readonly jobTitleInput: Locator;
    private readonly startDateInput: Locator;
    private readonly saveEmployeeBtn: Locator;
    private readonly addAnotherEmployeeBtn: Locator;
    private readonly closeModalBtn: Locator;
    private readonly searchBox: Locator;

    // 2. Initialize the elements once inside the constructor
    constructor(page: Page) {
        this.page = page;
        this.employeesTab = page.getByTestId('sideBar').getByRole('link', { name: 'Employees' });
        this.addEmployeeBtn = page.getByRole('button', { name: 'Add Employee' });
        
        // Form Fields (Targeting inputs cleanly by their direct unique accessibility labels or roles)
        this.firstNameInput = page.getByLabel('First Name');
        this.lastNameInput = page.getByLabel('Last Name');
        this.emailInput = page.getByLabel('Email address', { exact: true });
        this.phoneInput = page.getByRole('textbox', { name: 'Phone number (optional)' });
        this.jobTitleInput = page.getByRole('textbox', { name: 'Job title (optional)' });
        this.startDateInput = page.getByRole('textbox', { name: 'Start date (optional)' });
        
        // Buttons & Modals
        this.saveEmployeeBtn = page.getByRole('button', { name: 'Save new employee' });
        this.addAnotherEmployeeBtn = page.getByRole('button', { name: 'Add another employee' });
        this.closeModalBtn = page.getByRole('button', { name: 'Close modal' });
        
        // Search Component
        this.searchBox = page.getByPlaceholder('Name or job title...');
    }

    // 3. Clean action methods using encapsulated locator variables
    async clickEmployeeTab() {
        await this.employeesTab.click();
    }

    async clickAddEmployeeBtn() {
        await this.addEmployeeBtn.click();
    }

    async addEmployeeDetails(employee: EmployeeDetails) {
        // Redundant pre-clicks removed: fill() focuses and handles keyboard clearing automatically!
        await this.firstNameInput.fill(employee.firstName);
        await this.lastNameInput.fill(employee.lastName);
        await this.emailInput.fill(employee.email);

        if (employee.phoneNumber) {
            await this.phoneInput.fill(employee.phoneNumber);
        }

        if (employee.jobTitle) {
            await this.jobTitleInput.fill(employee.jobTitle);
        }

        if (employee.startDate) {
            await this.startDateInput.clear();            
            await this.startDateInput.fill(employee.startDate);        
            await this.startDateInput.press('Enter');
        }
    }

    async saveNewEmployeeDetails() {
        await this.saveEmployeeBtn.click();       
    }

    async clickAddAnotherEmployeeBtn() {
        await this.addAnotherEmployeeBtn.click();
    }

    async closeEmployeeModal() {
        await this.closeModalBtn.click();
    }

    async searchEmployee(firstName: string) {
        await this.searchBox.clear();  
        await this.searchBox.fill(firstName);  
        await this.searchBox.press('Enter'); 
        await this.page.waitForLoadState("networkidle");
    }

    async expectEmployeeDisplayed(name: string) {
        await expect(this.page.getByText(name, { exact: true })).toBeVisible();
    }
}