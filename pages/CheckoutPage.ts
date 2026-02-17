import { Page, expect, Locator } from "@playwright/test";

export class CheckoutPage {
  private readonly page: Page;
  private readonly checkOutPageHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkOutPageHeader = this.page.locator("div h1");
  }

  async ischeckOutPageDisplayed() {
    if (await this.checkOutPageHeader.isVisible()) {
      return true;
    } else {
      return false;
    }
  }
}
