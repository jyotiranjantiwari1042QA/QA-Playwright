import { test, expect } from '../fixtures/fixtures';
import { DashboardPage } from '../pages/DashboardPage';

test.describe('Account Overview / Dashboard', () => {
  test('newly registered user sees their account listed with a balance', async ({ registeredUser, page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.open();

    await dashboard.expectOverviewLoaded();
    const accounts = await dashboard.getAccountList();

    expect(accounts.length).toBeGreaterThan(0);
    expect(accounts[0].balance).toBeGreaterThanOrEqual(0);
  });

  test('account balance parses as a valid, non-negative number', async ({ loggedInPage }) => {
    const { dashboard } = loggedInPage;
    await dashboard.open();

    const accounts = await dashboard.getAccountList();
    for (const acc of accounts) {
      expect(Number.isNaN(acc.balance)).toBeFalsy();
      expect(acc.balance).toBeGreaterThanOrEqual(0);
    }
  });

  test('clicking an account drills into its activity/transaction view', async ({ loggedInPage }) => {
    const { dashboard, page } = loggedInPage;
    await dashboard.open();

    const accounts = await dashboard.getAccountList();
    const accountId = accounts[0].id;

    await dashboard.clickAccountActivity(accountId);

    await expect(page.locator('#accountId')).toHaveValue(accountId);
  });
});
