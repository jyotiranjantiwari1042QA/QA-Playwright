import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginBtn = page.locator('input[value="Log In"]');
  }

  async open() {
    await this.goto('/index.htm');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
  }

  async expectLoginSuccess() {
    await expect(this.page.locator('#leftPanel h2')).toHaveText('Accounts Overview');
    expect(await this.isLoggedIn()).toBeTruthy();
  }

  async expectInvalidCredentialsError() {
    await this.expectErrorContains('The username and password could not be verified.');
  }

  async expectEmptyFieldError() {
    await this.expectErrorContains('Please enter a username and password.');
  }

  /** Hits an authenticated-only URL directly and expects a redirect/challenge to login. */
  async expectRedirectedWhenUnauthenticated(path: string) {
    await this.goto(path);
    await expect(this.usernameInput).toBeVisible();
  }
}
