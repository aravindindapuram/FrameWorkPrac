import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { SearchResultsPage } from "../pages/SearchResultsPage";
import { TestConfig } from "../test.config";
import { count } from "node:console";

let homePage: HomePage;
let searchResultsPage: SearchResultsPage;
let testConfig: TestConfig;

test.beforeEach(async ({ page }) => {
  testConfig = new TestConfig();
  await page.goto(testConfig.appUrl);
  homePage = new HomePage(page);
  searchResultsPage = new SearchResultsPage(page);
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test("Product search test @master @regression", async () => {
  let productName = testConfig.productName;

  await homePage.enterProduct(productName);
  await homePage.clickSearch();

  expect(await searchResultsPage.isSearchResultsPageDisplayed()).toBe(true);
  expect(await searchResultsPage.isProductExist(productName)).toBeTruthy();
  
});
