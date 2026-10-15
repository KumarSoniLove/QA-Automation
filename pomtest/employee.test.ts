import { test, expect } from "../base/pomFixture";
import { faker } from '@faker-js/faker'


test.describe("Employee Page Test", () => {

    test.setTimeout(90 * 1000);

    const firstEmployee = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        phoneNumber: faker.helpers.fromRegExp('+44 7[0-9]{2} [0-9]{3} [0-9]{4}'),
        jobTitle: faker.person.jobTitle(),
        startDate: faker.date.future().toLocaleDateString('en-GB')
    }

    const secondEmployee = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        phoneNumber: faker.helpers.fromRegExp('+44 7[0-9]{2} [0-9]{3} [0-9]{4}'),
        jobTitle: faker.person.jobTitle(),
        startDate: faker.date.future().toLocaleDateString('en-GB')
    }

    test.beforeEach("Login to BrightHR", async ({ page }) => {        
        await page.goto('/');        
        await page.waitForLoadState("networkidle");
        await expect(page).toHaveURL(/.*\/dashboard/);
        await expect(page.getByTitle('Employees')).toBeVisible();
    })

    test("Add Two Employees Test and Verify", async ({ page, employee }) => {
        //Navigate and add both employees
        await employee.clickEmployeeTab();

        //Add first employee record
        await employee.clickAddEmployeeBtn();
        await employee.addEmployeeDetails(firstEmployee);
        await employee.saveNewEmployeeDetails();

        //Add second employee record
        await employee.clickAddAnotherEmployeeBtn();
        await employee.addEmployeeDetails(secondEmployee);
        await employee.saveNewEmployeeDetails();
    
        // Close the modal after adding employees
        await employee.closeEmployeeModal();

        //Navigate to employee tab and verify
        await employee.clickEmployeeTab(); 

        //Construct full name strings for tracking and preventing duplication matching
        const firstFullName = `${firstEmployee.firstName} ${firstEmployee.lastName}`;
        const secondFullName = `${secondEmployee.firstName} ${secondEmployee.lastName}`;

        //Verify the first employee record visible
        await employee.searchEmployee(firstEmployee.firstName);
        await expect(page.getByText(firstFullName, { exact: true })).toBeVisible();

        //Verify the second employee record visible
        await employee.searchEmployee(secondEmployee.firstName);
        await expect(page.getByText(secondFullName, { exact: true })).toBeVisible();

    })

})