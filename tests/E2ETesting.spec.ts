import { test, Locator, Page, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { RegistrationPage } from "../pages/RegistrationPage";
import { LoginPage } from "../pages/LoginPage";
import { LogoutPage } from "../pages/LogoutPage";
import { MyAccountPage } from "../pages/MyAccountPage";
import { SearchResultsPage } from "../pages/SearchResultsPage";
import { ShoppingCartPage } from "../pages/ShoppingCartPage";
import { ProductPage } from "../pages/ProductPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { TestConfig } from "../test.config";
import { RandomDataUtil } from "../utilities/randomGenerator";

test("execute end-to-end test flow @end-to-end", async ({ page }) => {
  let confg = new TestConfig();
  await page.goto(confg.appUrl);

  let registeredEmail: string = await perfromRegistratiojn(page);
  console.log("Registration Successfull");

  await logout(page);
  console.log("Logout Successfull");

  await login(page, registeredEmail);
  console.log("Login Successfull");

  await addProductToCart(page);
  console.log("addProductToCart Successfull");

  await verifyShoppingCart(page);
  console.log("verifyShoppingCart Successfull");
});

async function perfromRegistratiojn(page: Page): Promise<string> {
  let homePage = new HomePage(page);
  await homePage.clickMyAccount();
  await homePage.clickRegister();

  let registrationPage = new RegistrationPage(page);
  await registrationPage.enterFirstName(RandomDataUtil.getFirstName());
  await registrationPage.enterLastName(RandomDataUtil.getLstName());

  let email: string = RandomDataUtil.getEmail();
  console.log(email);
  await registrationPage.enterEmail(email);
  await registrationPage.enterTelephone(RandomDataUtil.getPhoneNumber());

  await registrationPage.enterPassword("test123");
  await registrationPage.enterConfirmPassword("test123");

  await registrationPage.selectAgreeCheckbox();
  await registrationPage.clickContinue();

  let msg = await registrationPage.getConfirmationMessage();
  expect(msg).toContain("Your Account Has Been Created");

  return email;
}

async function logout(page: Page) {
  let myAccountPage = new MyAccountPage(page);
  let logoutPage: LogoutPage = await myAccountPage.clickLogout();
  expect(await logoutPage.isUserNavigatedToLogout()).toBeTruthy();

  expect(await logoutPage.isContinueEnables()).toBe(true);

  let homePage: HomePage = await logoutPage.clickContinue();
  expect(await homePage.isHomePageExists()).toBe(true);
}

async function login(page: Page, email1: string) {
  let confg = new TestConfig();
  await page.goto(confg.appUrl);

  let homePage = new HomePage(page);
  await homePage.clickMyAccount();
  await homePage.clickLogin();

  let loginPage = new LoginPage(page);
  await loginPage.enterAllLoginDetails({ email: email1, password: "test123" });

  let myAccountPage = new MyAccountPage(page);
  expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy();
}

async function addProductToCart(page: Page) {
  let homePage = new HomePage(page);
  let testConfig = new TestConfig();
  let productName = testConfig.productName;
  let productQuantity = testConfig.productQuantity;

  await homePage.enterProduct(productName);
  await homePage.clickSearch();

  let searchPage = new SearchResultsPage(page);
  expect(await searchPage.isSearchResultsPageDisplayed()).toBe(true);
  expect(await searchPage.isProductExist(productName)).toBe(true);

  let productPage = await searchPage.selectProduct(productName);

  await productPage?.setQuantity(productQuantity);

  await productPage?.clickAddCartWithSmartRetry();

  expect(await productPage?.isConfirmationVisible()).toBe(true);
}

async function verifyShoppingCart(page: Page) {
  let productPage = new ProductPage(page);
  await productPage.clickItems();
  let shoppingCartPage: ShoppingCartPage = await productPage.clickViewCart();

  let testConfig = new TestConfig();

  const actualTotalText = await shoppingCartPage.getTotal();
  const actualTotal = Number(actualTotalText.replace(/[$,]/g, ""));
  expect(testConfig.validation).toContain(actualTotal);

  // let checkoutPage: CheckoutPage = await shoppingCartPage.clickCheckOut();
  // expect(await checkoutPage.ischeckOutPageDisplayed()).toBe(true);
}
