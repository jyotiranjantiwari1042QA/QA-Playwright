import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class TransferFundsPage extends BasePage {
  readonly heading: Locator;
  readonly amountInput: Locator;
  readonly fromAccountSelect: Locator;
  readonly toAccountSelect: Locator;
  readonly transferBtn: Locator;
  readonly successHeading: Locator;
  readonly resultAmount: Locator;
  readonly resultFrom: Locator;
  readonly resultTo: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.locator('.title');
    this.amountInput = page.locator('#amount');
    this.fromAccountSelect = page.locator('#fromAccountId');
    this.toAccountSelect = page.locator('#toAccountId');
    this.transferBtn = page.locator('input[value="Transfer"]');
    this.successHeading = page.locator('#showResult h1');
    this.resultAmount = page.locator('#amountResult');
    this.resultFrom = page.locator('#fromAccountIdResult');
    this.resultTo = page.locator('#toAccountIdResult');
  }

  async open() {
    await this.goto('/transfer.htm');
  }

  async transfer(amount: string, fromAccountId: string, toAccountId: string) {
    await this.amountInput.fill(amount);
    await this.fromAccountSelect.selectOption(fromAccountId);
    await this.toAccountSelect.selectOption(toAccountId);
    await this.transferBtn.click();
  }

  async expectTransferSuccess(amount: string, fromAccountId: string, toAccountId: string) {
    await expect(this.successHeading).toHaveText('Transfer Complete!');
    await expect(this.resultAmount).toContainText(amount);
    await expect(this.resultFrom).toContainText(fromAccountId);
    await expect(this.resultTo).toContainText(toAccountId);
  }

  /** Edge case: ParaBank's UI doesn't block same-account transfers server-side in all builds;
   *  this asserts whatever the app actually does so the test documents real behavior. */
  async attemptSameAccountTransfer(amount: string, accountId: string) {
    await this.transfer(amount, accountId, accountId);
  }
}
