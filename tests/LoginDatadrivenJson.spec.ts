import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { MyAccountPage } from "../pages/MyAccountPage";
import { TestConfig } from "../test.config";
import { DataProvider } from "../utilities/dataProviders";

let jsonPath = "testdata/jsontestdata.json";

const jsonTestData = DataProvider.getTestDataFromJson(jsonPath);

for (let data of jsonTestData) {
  test(`Login test with JSON data: ${data.testName}`, async ({ page }) => {
    let testConfig = new TestConfig();
    await page.goto(testConfig.appUrl);

    let homePage = new HomePage(page);
    await homePage.clickMyAccount();
    await homePage.clickLogin();

    let loginPage = new LoginPage(page);

    await loginPage.enterAllLoginDetails({
      email: data.email,
      password: data.password,
    });

    if (data.expected.toLowerCase() === "success") {
      const myAccountPage = new MyAccountPage(page);
      expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy();
    } else {
      expect(await loginPage.getLoginErrorMessage()).toContain("Warning");
    }
  });
}
