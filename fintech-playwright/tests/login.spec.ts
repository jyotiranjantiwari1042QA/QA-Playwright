import { test } from '../fixtures/fixtures';
import { LoginPage } from '../pages/LoginPage';
import { invalidCredentials } from '../fixtures/test-data';

test.describe('Login / Auth', () => {
  test('registered user can log in with valid credentials', async ({ registeredUser, page }) => {
    // registeredUser fixture leaves the session logged in from registration;
    // log out first so this test exercises the actual login form.
    const loginPage = new LoginPage(page);
    await page.locator('a[href*="logout"]').click();

    await loginPage.open();
    await loginPage.login(registeredUser.username, registeredUser.password);

    await loginPage.expectLoginSuccess();
  });

  test('invalid credentials show an authentication error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();

    await loginPage.login(invalidCredentials.username, invalidCredentials.password);

    await loginPage.expectInvalidCredentialsError();
  });

  test('submitting an empty login form shows a validation error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();

    await loginPage.loginBtn.click();

    await loginPage.expectEmptyFieldError();
  });

  test('unauthenticated access to a protected page redirects to login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.expectRedirectedWhenUnauthenticated('/overview.htm');
  });
});
