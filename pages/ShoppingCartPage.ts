import { Page, Locator } from "@playwright/test";
import { CheckoutPage } from "./CheckoutPage";

export class ShoppingCartPage {
  private readonly page: Page;
  private readonly totalPrice: Locator;
  private readonly btnCheckout: Locator;

  constructor(page: Page) {
    this.page = page;
    this.totalPrice = this.page.locator(
      '//div[@id="content"]/div[2]/div/table/tbody/tr[4]/td[2]',
    );
    this.btnCheckout = this.page.locator('//a[text()="Checkout"]');
  }

  async isPageLoaded() {
    try {
      return await this.btnCheckout.isVisible();
    } catch (error) {
      return false;
    }
  }

  async getTotal() {
    return await this.totalPrice.innerText();
  }
  async clickCheckOut() {
    await this.btnCheckout.click();
    return new CheckoutPage(this.page);
  }
}
