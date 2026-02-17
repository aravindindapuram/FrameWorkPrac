import { test, Page, Locator } from "@playwright/test";
import { LogoutPage } from "./LogoutPage";

export class MyAccountPage {
  private readonly page: Page;
  private readonly myAccountHeader: Locator;
  private readonly linkLogout: Locator;

  constructor(page: Page) {
    this.page = page;
    this.myAccountHeader = this.page.locator("h2:has-text('My Account')");
    this.linkLogout = this.page.getByRole("link", { name: "Logout" }).first();
  }

  async isMyAccountPageExists(): Promise<boolean> {
    try {
      return await this.myAccountHeader.isVisible();
    } catch (error) {
      console.log(`error is ${error}`);
      return false;
    }
  }

  async clickLogout(): Promise<LogoutPage> {
    try {
      await this.linkLogout.click();
      return new LogoutPage(this.page);
    } catch (error) {
      console.log(`error is ${error}`);
      throw error;
    }
  }
}
