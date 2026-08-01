import { Page, Locator, expect } from '@playwright/test';

/**
 * BasePage centralizes navigation, shared locators (nav menu),
 * and generic assertion helpers so feature pages stay thin.
 */
export class BasePage {
  readonly page: Page;

  // Left-nav menu items present on every authenticated screen
  readonly navAccountOverview: Locator;
  readonly navOpenAccount: Locator;
  readonly navTransferFunds: Locator;
  readonly navBillPay: Locator;
  readonly navFindTransactions: Locator;
  readonly navLogout: Locator;
  readonly errorBox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navAccountOverview = page.locator('a[href*="overview"]');
    this.navOpenAccount = page.locator('a[href*="openaccount"]');
    this.navTransferFunds = page.locator('a[href*="transfer"]');
    this.navBillPay = page.locator('a[href*="billpay"]');
    this.navFindTransactions = page.locator('a[href*="findtrans"]');
    this.navLogout = page.locator('a[href*="logout"]');
    this.errorBox = page.locator('.error, #rightPanel .error');
  }

  async goto(path = '/index.htm') {
    await this.page.goto(path);
  }

  async isLoggedIn(): Promise<boolean> {
    return this.navLogout.isVisible().catch(() => false);
  }

  async expectErrorContains(text: string) {
    await expect(this.errorBox).toBeVisible();
    await expect(this.errorBox).toContainText(text);
  }

  async logout() {
    await this.navLogout.click();
  }

  /** Parses a "$1,234.56" style string into a number for balance math. */
  parseCurrency(raw: string): number {
    return Number(raw.replace(/[^0-9.-]+/g, ''));
  }
}
