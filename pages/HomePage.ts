import { Page, expect, Locator } from "@playwright/test";

export class HomePage {

    private readonly page: Page;
    private readonly linkMyAccount: Locator;
    private readonly linkRegister: Locator;
    private readonly linkLogin: Locator;
    private readonly searchInput: Locator;
    private readonly searchButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.linkMyAccount = this.page.locator('span:has-text("My Account")');
        this.linkRegister = this.page.getByRole('link', { name: 'Register' });
        this.linkLogin = this.page.getByRole('link', { name: 'Login' });
        this.searchInput = this.page.getByRole('textbox', { name: 'search' });
        this.searchButton = this.page.locator('.btn.btn-default.btn-lg');
    }

    async isHomePageExists(): Promise<boolean> {
        let titleOfPage = await this.page.title();
        if (titleOfPage) {
            return true;
        }
        return false;
    }

    async clickMyAccount(): Promise<void> {
        try {
            await this.linkMyAccount.click();
        }
        catch (error) {
            console.log(`Exception occurred in function ${this.clickMyAccount.name} - Error: ${error}`);
            throw error;
        }
    }

    async clickRegister(): Promise<void> {
        try {
            await this.linkRegister.click();
        }
        catch (error) {
            console.log(`Exception occurred in function ${this.clickRegister.name} - Error: ${error}`);
            throw error;
        }
    }

    async clickLogin(): Promise<void> {
        try {
            await this.linkLogin.click();
        }
        catch (error) {
            console.log(`Exception occurred in function ${this.clickLogin.name} - Error: ${error}`);
            throw error;
        }
    }
    async enterProduct(productName: string): Promise<void> {
        try {
            await this.searchInput.fill(productName);
        }
        catch (error) {
            console.log(`Exception occurred in function ${this.enterProduct.name} - Error: ${error}`);
            throw error;
        }

    }

    async clickSearch(): Promise<void> {
        try {
            await this.searchButton.click();
        }
        catch (error) {
            console.log(`Exception occurred in function ${this.clickSearch.name} - Error: ${error}`);
            throw error;
        }

    }

}