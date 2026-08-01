import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('ParaBank Login Tests', () => {

  const validUser = {
    username: 'john',
    password: 'demo'
  };

  const invalidUser = {
    username: 'invalidUser',
    password: 'invalidPass'
  };

  test('Registered user can log in with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login(validUser.username, validUser.password);
    await loginPage.expectLoginSuccess();
  });

  test('Invalid credentials show an authentication error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login(invalidUser.username, invalidUser.password);
    await loginPage.expectInvalidCredentialsError();
  });

  test('Submitting an empty login form', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.loginBtn.click();

    await loginPage.expectEmptyFieldError();
  });

  test('Unauthenticated user cannot access account overview', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto('https://parabank.parasoft.com/parabank/overview.htm');

    await loginPage.expectRedirectedWhenUnauthenticated();
  });

});

  import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {

    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly loginBtn: Locator;

    constructor(page: Page) {
        this.page = page;

        this.username = page.locator('input[name="username"]');
        this.password = page.locator('input[name="password"]');
        this.loginBtn = page.locator('input[value="Log In"]');
    }

    async open() {
        await this.page.goto('https://parabank.parasoft.com/parabank/index.htm');
    }

    async login(username: string, password: string) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginBtn.click();
    }

    async expectLoginSuccess() {
        await expect(this.page).toHaveURL(/overview\.htm/);
        await expect(this.page.locator('text=Accounts Overview')).toBeVisible();
    }

    async expectInvalidCredentialsError() {
        await expect(
            this.page.locator('text=The username and password could not be verified.')
        ).toBeVisible();
    }

    async expectEmptyFieldError() {
        await expect(
            this.page.locator('text=Please enter a username and password.')
        ).toBeVisible();
    }

    async expectRedirectedWhenUnauthenticated() {
        await expect(this.page).toHaveURL(/index\.htm/);
        await expect(this.loginBtn).toBeVisible();
    }
}
});
