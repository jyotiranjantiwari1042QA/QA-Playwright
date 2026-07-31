import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export type AccountType = 'CHECKING' | 'SAVINGS';

export class OpenAccountPage extends BasePage {
  readonly heading: Locator;
  readonly accountTypeSelect: Locator;
  readonly fromAccountSelect: Locator;
  readonly openBtn: Locator;
  readonly successHeading: Locator;
  readonly newAccountIdLink: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.locator('#openAccountForm h1');
    this.accountTypeSelect = page.locator('#type');
    this.fromAccountSelect = page.locator('#fromAccountId');
    this.openBtn = page.locator('input[value="Open New Account"]');
    this.successHeading = page.locator('#openAccountResult h1');
    this.newAccountIdLink = page.locator('#newAccountId');
  }

  async open() {
    await this.goto('/openaccount.htm');
  }

  async openNewAccount(type: AccountType, fromAccountId?: string): Promise<string> {
    await this.accountTypeSelect.selectOption(type === 'CHECKING' ? '0' : '1');
    if (fromAccountId) {
      await this.fromAccountSelect.selectOption(fromAccountId);
    }
    await this.openBtn.click();
    await expect(this.successHeading).toHaveText('Account Opened!');
    return (await this.newAccountIdLink.innerText()).trim();
  }

  async expectAccountOpenedSuccessfully() {
    await expect(this.successHeading).toContainText('Account Opened!');
    await expect(this.newAccountIdLink).toBeVisible();
  }
}
