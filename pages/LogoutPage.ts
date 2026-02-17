import { test, Page, Locator } from "@playwright/test";
import { HomePage } from "./HomePage";

export class LogoutPage {
  private readonly page: Page;
  private readonly logOutConf: Locator;
  private readonly btnConinue: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logOutConf = this.page.locator('h1:has-text("Account Logout")');
    this.btnConinue = this.page.locator('text="Continue"');
  }

  async isUserNavigatedToLogout(): Promise<boolean> {
    return await this.logOutConf.isVisible();
  }

  async isContinueEnables(): Promise<boolean> {
    return await this.btnConinue.isEnabled();
  }

  async clickContinue(): Promise<HomePage> {
    await this.btnConinue.click();
    return new HomePage(this.page);
  }

 
}
