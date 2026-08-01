import { test, expect } from '../fixtures/fixtures';
import { OpenAccountPage } from '../pages/OpenAccountPage';
import { DashboardPage } from '../pages/DashboardPage';

test.describe('Open New Account', () => {
  test('user can open a new checking account funded from an existing account', async ({ loggedInPage }) => {
    const { page, dashboard } = loggedInPage;
    await dashboard.open();
    const [existing] = await dashboard.getAccountList();

    const openAccountPage = new OpenAccountPage(page);
    await openAccountPage.open();

    const newAccountId = await openAccountPage.openNewAccount('CHECKING', existing.id);

    expect(newAccountId).toBeTruthy();
    await dashboard.open();
    await dashboard.expectAccountVisible(newAccountId);
  });

  test('user can open a new savings account funded from an existing account', async ({ loggedInPage }) => {
    const { page, dashboard } = loggedInPage;
    await dashboard.open();
    const [existing] = await dashboard.getAccountList();

    const openAccountPage = new OpenAccountPage(page);
    await openAccountPage.open();

    const newAccountId = await openAccountPage.openNewAccount('SAVINGS', existing.id);

    await openAccountPage.expectAccountOpenedSuccessfully();
    expect(newAccountId).not.toBe(existing.id);
  });
});
