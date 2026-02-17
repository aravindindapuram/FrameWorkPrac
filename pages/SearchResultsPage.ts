import { test, Page, Locator } from "@playwright/test";
import { ProductPage } from "./ProductPage";

export class SearchResultsPage {
  private readonly page: Page;

  private readonly searchHeader: Locator;
  private readonly searchResuls: Locator;

  constructor(page: Page) {
    this.page = page;

    this.searchHeader = this.page.locator("#content h1");
    this.searchResuls = this.page.locator("h4>A");
  }

  async isSearchResultsPageDisplayed(): Promise<boolean> {
    try {
      let headerText = await this.searchHeader.innerText();
      return headerText?.includes("Search -") ?? false;
    } catch (error) {
      return false;
    }
  }

  async productsCount(): Promise<number> {
    console.log("productcount", await this.searchResuls.count());
    return await this.searchResuls.count();
  }

  async isProductExist(product: string): Promise<boolean> {
    try {
      let countOfProducts = await this.productsCount();

      for (let i = 0; i < countOfProducts; i++) {
        let productName = await this.searchResuls.nth(i).innerText();
        if (productName === product) {
          return true;
        }
      }
    } catch (error) {
      console.log(`product does not exist:${error}`);
    }
    return false;
  }

  async selectProduct(product: string): Promise<ProductPage | null> {
    try {
      let countOfProducts = await this.productsCount();

      for (let i = 0; i < countOfProducts; i++) {
        let producEment = this.searchResuls.nth(i);
        let productName = await producEment.innerText();
        if (productName === product) {
          await producEment.click();
          return new ProductPage(this.page);
        }
      }
    } catch (error) {
      console.log(`product does not exist:${error}`);
    }

    return null;
  }
}
