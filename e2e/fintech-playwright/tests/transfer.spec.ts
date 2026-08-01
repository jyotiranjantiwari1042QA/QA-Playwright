import { test, expect } from '../fixtures/fixtures';
import { TransferFundsPage } from '../pages/TransferFundsPage';
import { OpenAccountPage } from '../pages/OpenAccountPage';
import { DashboardPage } from '../pages/DashboardPage';

test.describe('Fund Transfer', () => {
  test('happy path: transfer between two accounts updates both balances correctly', async ({ loggedInPage }) => {
    const { page, dashboard } = loggedInPage;
    await dashboard.open();
    const [primary] = await dashboard.getAccountList();

    // Open a second account to transfer into
    const openAccountPage = new OpenAccountPage(page);
    await openAccountPage.open();
    const secondaryId = await openAccountPage.openNewAccount('SAVINGS', primary.id);

    await dashboard.open();
    const beforeFrom = await dashboard.getBalanceForAccount(primary.id);
    const beforeTo = await dashboard.getBalanceForAccount(secondaryId);

    const transferPage = new TransferFundsPage(page);
    await transferPage.open();
    const amount = '50.00';
    await transferPage.transfer(amount, primary.id, secondaryId);
    await transferPage.expectTransferSuccess(amount, primary.id, secondaryId);

    await dashboard.open();
    const afterFrom = await dashboard.getBalanceForAccount(primary.id);
    const afterTo = await dashboard.getBalanceForAccount(secondaryId);

    expect(afterFrom).toBeCloseTo(beforeFrom - 50, 2);
    expect(afterTo).toBeCloseTo(beforeTo + 50, 2);
  });

  test('edge case: transferring between the same account as source and destination', async ({ loggedInPage }) => {
    const { page, dashboard } = loggedInPage;
    await dashboard.open();
    const [primary] = await dashboard.getAccountList();

    const transferPage = new TransferFundsPage(page);
    await transferPage.open();

    const beforeBalance = await dashboard.getBalanceForAccount(primary.id);

    await transferPage.attemptSameAccountTransfer('25.00', primary.id);

    // Document actual app behavior: ParaBank permits this and nets to zero change.
    await transferPage.expectTransferSuccess('25.00', primary.id, primary.id);
    await dashboard.open();
    const afterBalance = await dashboard.getBalanceForAccount(primary.id);
    expect(afterBalance).toBeCloseTo(beforeBalance, 2);
  });
});
