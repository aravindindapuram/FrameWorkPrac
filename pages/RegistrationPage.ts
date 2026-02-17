import { Page, expect, Locator } from "@playwright/test";


export class RegistrationPage {

    private readonly page: Page;

    private readonly textFirstName: Locator;
    private readonly textLastName: Locator;
    private readonly textEmail: Locator;
    private readonly textTelephone: Locator;
    private readonly textPassword: Locator;
    private readonly textConfirmPassword: Locator;
    private readonly buttonContinue: Locator;
    private readonly agreeCheckBox: Locator;
    private readonly msgConfirmation: Locator;

    constructor(page: Page) {
        this.page = page;
        this.textFirstName = page.getByPlaceholder('First Name');
        this.textLastName = page.getByPlaceholder('Last Name');
        this.textEmail = page.getByRole('textbox', { name: 'E-Mail' });
        this.textTelephone = page.locator('input[name="telephone"]');
        this.textPassword = page.locator('input[name="password"]');
        this.textConfirmPassword = page.locator('input[name="confirm"]');

        this.agreeCheckBox = page.locator('input[name="agree"]');
        this.buttonContinue = page.locator('input[type="submit"][value="Continue"]');

        this.msgConfirmation = page.locator('#content h1');
    }

    async enterFirstName(firstName: string): Promise<void> {
        try {
            await this.textFirstName.fill(firstName);
        }
        catch (error) {
            console.log(`Exception occurred in function ${this.enterFirstName.name} - Error: ${error}`);
            throw error;
        }
    }

    async enterLastName(lastName: string): Promise<void> {
        try {
            await this.textLastName.fill(lastName);
        }
        catch (error) {
            console.log(`Exception occurred in function ${this.enterLastName.name} - Error: ${error}`);
            throw error;
        }
    }

    async enterEmail(email: string): Promise<void> {
        try {
            await this.textEmail.fill(email);
        }
        catch (error) {
            console.log(`Exception occurred in function ${this.enterEmail.name} - Error: ${error}`);
            throw error;
        }
    }
    async enterTelephone(telephone: string): Promise<void> {
        try {
            await this.textTelephone.fill(telephone);
        }
        catch (error) {
            console.log(`Exception occurred in function ${this.enterTelephone.name} - Error: ${error}`);
            throw error;
        }
    }
    async enterPassword(password: string): Promise<void> {
        try {
            await this.textPassword.fill(password);
        }
        catch (error) {
            console.log(`Exception occurred in function ${this.enterPassword.name} - Error: ${error}`);
            throw error;
        }
    }
    async enterConfirmPassword(confirmPassword: string): Promise<void> {
        try {
            await this.textConfirmPassword.fill(confirmPassword);
        }
        catch (error) {
            console.log(`Exception occurred in function ${this.enterConfirmPassword.name} - Error: ${error}`);
            throw error;
        }
    }
    async selectAgreeCheckbox(): Promise<void> {
        try {
            await this.agreeCheckBox.check();
        }
        catch (error) {
            console.log(`Exception occurred in function ${this.selectAgreeCheckbox.name} - Error: ${error}`);
            throw error;
        }
    }
    async clickContinue(): Promise<void> {
        try {
            await this.buttonContinue.click();
        }
        catch (error) {
            console.log(`Exception occurred in function ${this.clickContinue.name} - Error: ${error}`);
            throw error;
        }
    }
    async getConfirmationMessage(): Promise<string> {
        try {
            return await this.msgConfirmation.textContent() ?? '';
        }
        catch (error) {
            console.log(`Exception occurred in function ${this.getConfirmationMessage.name} - Error: ${error}`);
            throw error;
        }
    }

    async addAllData(userData: {
        firstName: string;
        lastName: string;
        email: string;
        telephone: string;
        password: string;
        confirmPassword: string;
    }): Promise<void> {

        try {
            await this.enterFirstName(userData.firstName);
            await this.enterLastName(userData.lastName);
            await this.enterEmail(userData.email);
            await this.enterTelephone(userData.telephone);
            await this.enterPassword(userData.password);
            await this.enterConfirmPassword(userData.confirmPassword);
            await this.selectAgreeCheckbox();
            await this.clickContinue();
        }
        catch (error) {
            console.log(`Exception occurred in function ${this.addAllData.name} - Error: ${error}`);
            throw error;
        }

    }

}