import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { MyAccountPage } from "../pages/MyAccountPage";
import { TestConfig } from "../test.config";

let homePage: HomePage;
let loginPage: LoginPage;
let myAccountPage: MyAccountPage;
let testConfig: TestConfig;

test.beforeEach(async ({ page }) => {
  testConfig = new TestConfig();
  await page.goto(testConfig.appUrl);
  homePage = new HomePage(page);
  loginPage = new LoginPage(page);
  myAccountPage = new MyAccountPage(page);
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test("User Login Test", { tag: ["@master @sanity @regression"] }, async () => {
  await homePage.clickMyAccount();
  await homePage.clickLogin();
  await loginPage.enterAllLoginDetails({
    email: testConfig.email,
    password: testConfig.password,
  });

  expect(myAccountPage.isMyAccountPageExists()).toBeTruthy();
});
