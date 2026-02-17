import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { RegistrationPage } from "../pages/RegistrationPage";
import { RandomDataUtil } from "../utilities/randomGenerator";
import { TestConfig } from "../test.config";

let config: TestConfig;
let homePage: HomePage;
let registrationPage: RegistrationPage;

test.beforeEach(async ({ page }) => {
  config = new TestConfig();
  await page.goto(config.appUrl);
  homePage = new HomePage(page);
  registrationPage = new RegistrationPage(page);
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test("user registration test @master @sanity @regression", async () => {
  expect(await homePage.isHomePageExists()).toBeTruthy();

  await homePage.clickMyAccount();
  await homePage.clickRegister();

  await registrationPage.enterFirstName(RandomDataUtil.getFirstName());
  await registrationPage.enterLastName(RandomDataUtil.getLstName());
  await registrationPage.enterEmail(RandomDataUtil.getEmail());
  await registrationPage.enterTelephone(RandomDataUtil.getPhoneNumber());
  let password = RandomDataUtil.getPassword();
  await registrationPage.enterPassword(password);
  await registrationPage.enterConfirmPassword(password);
  await registrationPage.selectAgreeCheckbox();
  await registrationPage.clickContinue();

  expect(await registrationPage.getConfirmationMessage()).toContain(
    "Your Account Has Been Created!",
  );
});
