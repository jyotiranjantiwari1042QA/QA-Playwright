import { test, expect } from '../fixtures/fixtures';
import { BillPayPage } from '../pages/BillPayPage';
import { DashboardPage } from '../pages/DashboardPage';
import { payeeData, payeeMismatchedData } from '../fixtures/test-data';

test.describe('Bill Pay', () => {
  test('happy path: paying a bill deducts the amount from the source account', async ({ loggedInPage }) => {
    const { page, dashboard } = loggedInPage;
    await dashboard.open();
    const [account] = await dashboard.getAccountList();
    const beforeBalance = await dashboard.getBalanceForAccount(account.id);

    const billPayPage = new BillPayPage(page);
    await billPayPage.open();
    await billPayPage.payBill(payeeData, '40.00', account.id);

    await billPayPage.expectPaymentSuccess();

    await dashboard.open();
    const afterBalance = await dashboard.getBalanceForAccount(account.id);
    expect(afterBalance).toBeCloseTo(beforeBalance - 40, 2);
  });

  test('mismatched account number and verify-account number is rejected', async ({ loggedInPage }) => {
    const { page, dashboard } = loggedInPage;
    await dashboard.open();
    const [account] = await dashboard.getAccountList();

    const billPayPage = new BillPayPage(page);
    await billPayPage.open();
    await billPayPage.payBill(payeeMismatchedData, '15.00', account.id);

    await billPayPage.expectAccountMismatchError();
  });
});
