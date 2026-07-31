import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class FindTransactionsPage extends BasePage {
  readonly accountIdSelect: Locator;
  readonly amountInput: Locator;
  readonly findByAmountBtn: Locator;
  readonly transactionsTable: Locator;
  readonly transactionRows: Locator;
  readonly noResultsMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.accountIdSelect = page.locator('#accountId');
    this.amountInput = page.locator('#amount');
    this.findByAmountBtn = page.locator('#findByAmount ~ input, button:has-text("Find")').first();
    this.transactionsTable = page.locator('#transactionTable');
    this.transactionRows = page.locator('#transactionTable tbody tr');
    this.noResultsMessage = page.locator('#rightPanel');
  }

  async open() {
    await this.goto('/findtrans.htm');
  }

  async findByAmount(accountId: string, amount: string) {
    await this.accountIdSelect.selectOption(accountId);
    await this.amountInput.fill(amount);
    await this.page.locator('input[value="Find Transactions"], #findByAmountTab').first().click().catch(async () => {
      // Fallback: ParaBank's find-by-amount trigger is a link inside the tab panel
      await this.page.locator('a:has-text("Find Transactions")').first().click();
    });
  }

  async expectResultsFound() {
    await expect(this.transactionRows.first()).toBeVisible();
  }

  async expectNoResultsFound() {
    await expect(this.noResultsMessage).toContainText(/No transactions found|no results/i);
  }
}
