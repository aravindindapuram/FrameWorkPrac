import { Page, expect, Locator } from "@playwright/test";
import { ShoppingCartPage } from "./ShoppingCartPage";

export class ProductPage {
  private readonly page: Page;

  private readonly txtQuantity: Locator;
  private readonly btnAddCart: Locator;
  private readonly cnfrmMsg: Locator;
  private readonly btnItems: Locator;
  private readonly btnVeiwCart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.txtQuantity = this.page.locator("#input-quantity");
    this.btnAddCart = this.page.locator("#button-cart");
    this.cnfrmMsg = this.page.locator(".alert.alert-success.alert-dismissible");
    this.btnItems = this.page.locator("#cart");
    this.btnVeiwCart = this.page.locator("strong:has-text('View Cart')");
  }

  async setQuantity(qty: string) {
    await this.txtQuantity.fill(qty);
  }

  async clickAddCart() {
    await this.btnAddCart.click();
  }

  async isConfirmationVisible() {
    try {
      if (await this.cnfrmMsg.isVisible()) return true
      else return false;
    } catch (error) {
      console.log(`Confimration Message Not Found: ${error}`);
      return false;
    }
  }

  async clickItems() {
    await this.btnItems.click();
  }
  async clickViewCart(): Promise<ShoppingCartPage> {
    await this.btnVeiwCart.click();
    return new ShoppingCartPage(this.page);
  }
}
