import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  readonly heading: Locator;
  readonly accountTable: Locator;
  readonly accountRows: Locator;
  readonly totalRow: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.locator('#leftPanel h2');
    this.accountTable = page.locator('#accountTable');
    this.accountRows = page.locator('#accountTable tbody tr');
    this.totalRow = page.locator('#accountTable tfoot tr');
  }

  async open() {
    await this.goto('/overview.htm');
  }

  async expectOverviewLoaded() {
    await expect(this.heading).toHaveText('Accounts Overview');
    await expect(this.accountTable).toBeVisible();
  }

  /** Returns [{ id, balance, available }] parsed from the accounts table. */
  async getAccountList(): Promise<{ id: string; balance: number; available: number }[]> {
    const rows = await this.accountRows.all();
    const accounts = [];
    for (const row of rows) {
      const cells = row.locator('td');
      const id = (await cells.nth(0).innerText()).trim();
      const balance = this.parseCurrency(await cells.nth(1).innerText());
      const available = this.parseCurrency(await cells.nth(2).innerText());
      accounts.push({ id, balance, available });
    }
    return accounts;
  }

  async getBalanceForAccount(accountId: string): Promise<number> {
    const row = this.accountRows.filter({ hasText: accountId });
    const balanceCell = row.locator('td').nth(1);
    return this.parseCurrency(await balanceCell.innerText());
  }

  async clickAccountActivity(accountId: string) {
    await this.accountRows.filter({ hasText: accountId }).locator('a').first().click();
  }

  async expectAccountVisible(accountId: string) {
    await expect(this.accountRows.filter({ hasText: accountId })).toBeVisible();
  }
}
