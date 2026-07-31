import { test, expect } from '../fixtures/fixtures';
import { FindTransactionsPage } from '../pages/FindTransactionsPage';
import { TransferFundsPage } from '../pages/TransferFundsPage';
import { OpenAccountPage } from '../pages/OpenAccountPage';
import { DashboardPage } from '../pages/DashboardPage';

test.describe('Find Transactions', () => {
  test('searching by an amount that matches a known transaction returns results', async ({ loggedInPage }) => {
    const { page, dashboard } = loggedInPage;
    await dashboard.open();
    const [primary] = await dashboard.getAccountList();

    // Create a second account and a transfer so we have a known transaction to search for
    const openAccountPage = new OpenAccountPage(page);
    await openAccountPage.open();
    const secondaryId = await openAccountPage.openNewAccount('SAVINGS', primary.id);

    const transferPage = new TransferFundsPage(page);
    await transferPage.open();
    const knownAmount = '17.00';
    await transferPage.transfer(knownAmount, primary.id, secondaryId);
    await transferPage.expectTransferSuccess(knownAmount, primary.id, secondaryId);

    const findTransactionsPage = new FindTransactionsPage(page);
    await findTransactionsPage.open();
    await findTransactionsPage.findByAmount(primary.id, knownAmount);

    await findTransactionsPage.expectResultsFound();
  });

  test('searching by an amount with no matching transactions returns no results', async ({ loggedInPage }) => {
    const { page, dashboard } = loggedInPage;
    await dashboard.open();
    const [primary] = await dashboard.getAccountList();

    const findTransactionsPage = new FindTransactionsPage(page);
    await findTransactionsPage.open();
    await findTransactionsPage.findByAmount(primary.id, '999999.99');

    await findTransactionsPage.expectNoResultsFound();
  });
});
