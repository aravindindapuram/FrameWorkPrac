import { test, expect } from "@playwright/test";
import { TestConfig } from "../test.config";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { MyAccountPage } from "../pages/MyAccountPage";

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

test("User logout tes @master @regression", async () => {
  await homePage.clickMyAccount();
  await homePage.clickLogin();

  await loginPage.enterAllLoginDetails({
    email: testConfig.email,
    password: testConfig.password,
  });

  expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy();

  await homePage.clickMyAccount();

  let logoutPage = await myAccountPage.clickLogout();

  expect(await logoutPage.isContinueEnables()).toBeTruthy();

  homePage = await logoutPage.clickContinue();

  expect(await homePage.isHomePageExists()).toBeTruthy();
});
