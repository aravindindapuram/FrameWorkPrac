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
    this.btnAddCart = this.page.getByRole("button", { name: "Add to Cart" });
    this.cnfrmMsg = this.page.locator(".alert.alert-success.alert-dismissible");
    this.btnItems = this.page.locator("#cart");
    this.btnVeiwCart = this.page.locator("strong:has-text('View Cart')");
  }

  async setQuantity(qty: string) {
    await this.txtQuantity.fill(qty);
  }

  async clickAddCart() {
    await Promise.all([
      this.page.waitForResponse(
        (r) => r.url().includes("checkout/cart") && r.status() === 200,
      ),
      this.btnAddCart.click(),
    ]);
  }

  async isConfirmationVisible() {
    try {
      if (await this.cnfrmMsg.isVisible()) return true;
      else return false;
    } catch (error) {
      console.log(`Confimration Message Not Found: ${error}`);
      return false;
    }
  }

  async clickItems() {
    await this.btnItems.click();
  }

  async clickAddCartWithSmartRetry() {
    let attempt = 0;
    let success = false;

    do {
      attempt++;

      await this.btnAddCart.scrollIntoViewIfNeeded();
      await this.btnAddCart.click();

      success = await this.isConfirmationVisible();

      if (!success) {
        console.log(`Retrying Add to Cart... attempt ${attempt}`);
      }
    } while (!success && attempt < 3);

    if (!success) {
      throw new Error("Add to Cart failed after 3 attempts");
    }
  }
  async clickViewCart(): Promise<ShoppingCartPage> {
    await this.btnVeiwCart.click();
    return new ShoppingCartPage(this.page);
  }
}
