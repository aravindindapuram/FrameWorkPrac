import { Page, expect, Locator } from "@playwright/test";

export class LoginPage {
  private readonly page: Page;
  private readonly mailAddres: Locator;
  private readonly providePassword: Locator;
  private readonly clickLogin: Locator;
  private readonly txtErrorMsg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mailAddres = this.page.locator("#input-email");
    this.providePassword = this.page.locator("#input-password");
    this.clickLogin = this.page.locator("input[value='Login']");
    this.txtErrorMsg = this.page.locator(".alert.alert-danger.alert-dismissible");
  }

  async enterMail(mail: string) {
    await this.mailAddres.fill(mail);
  }

  async enterPassword(mail: string) {
    await this.providePassword.fill(mail);
  }

  async bttnLogin() {
    await this.clickLogin.click();
  }

  async enterAllLoginDetails(data: { email: string; password: string }) {
    await this.enterMail(data.email);
    await this.enterPassword(data.password);
    await this.bttnLogin();
  }

  async getLoginErrorMessage(): Promise<null | string> {
    return await this.txtErrorMsg.innerText();
  }
}
