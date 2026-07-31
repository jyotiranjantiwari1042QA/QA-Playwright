import { test as base, Page } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { generateUser, UserData } from './test-data';

type Fixtures = {
  /** A brand-new user registered fresh for this test, with credentials exposed. */
  registeredUser: UserData;
  /** A page instance that is already logged in as a freshly registered user. */
  loggedInPage: { page: Page; user: UserData; dashboard: DashboardPage };
};

export const test = base.extend<Fixtures>({
  registeredUser: async ({ page }, use) => {
    const user = generateUser();
    const registrationPage = new RegistrationPage(page);
    await registrationPage.registerNewUser(user);
    await registrationPage.expectRegistrationSuccess(user.username);
    await use(user);
  },

  loggedInPage: async ({ page }, use) => {
    const user = generateUser();
    const registrationPage = new RegistrationPage(page);
    await registrationPage.registerNewUser(user);
    await registrationPage.expectRegistrationSuccess(user.username);

    // ParaBank auto-logs-in post registration; log out and back in explicitly
    // so this fixture always represents a deliberate, verifiable login step.
    const dashboard = new DashboardPage(page);
    await dashboard.logout();

    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(user.username, user.password);
    await loginPage.expectLoginSuccess();

    await use({ page, user, dashboard });
  },
});

export { expect } from '@playwright/test';
