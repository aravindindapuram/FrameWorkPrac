import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { ProductPage } from "../pages/ProductPage";
import { SearchResultsPage } from "../pages/SearchResultsPage";
import { TestConfig } from "../test.config";

let homePage: HomePage;
let productPage: ProductPage;
let searchResultsPage: SearchResultsPage;
let testConfig: TestConfig;

test.beforeEach(async ({ page }) => {
  testConfig = new TestConfig();
  await page.goto(testConfig.appUrl);
  homePage = new HomePage(page);
  productPage = new ProductPage(page);
  searchResultsPage = new SearchResultsPage(page);
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test("Add product to cart @master @regression", async () => {
  let productName = testConfig.productName;
  homePage.enterProduct(productName);
  homePage.clickSearch();

  expect(await searchResultsPage.isSearchResultsPageDisplayed()).toBeTruthy();

  expect(searchResultsPage.isProductExist(productName)).toBeTruthy();

  if (expect(searchResultsPage.isProductExist(productName))) {
    await searchResultsPage.selectProduct(productName);

    await productPage.setQuantity(testConfig.productQuantity);
    await productPage.clickAddCart();

    expect(productPage.isConfirmationVisible).toBeTruthy();
  }
});
