import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export interface Payee {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  accountNumber: string;
  verifyAccountNumber: string;
}

export class BillPayPage extends BasePage {
  readonly payeeName: Locator;
  readonly address: Locator;
  readonly city: Locator;
  readonly state: Locator;
  readonly zipCode: Locator;
  readonly phone: Locator;
  readonly accountNumber: Locator;
  readonly verifyAccountNumber: Locator;
  readonly amount: Locator;
  readonly fromAccountSelect: Locator;
  readonly sendPaymentBtn: Locator;
  readonly successHeading: Locator;
  readonly errorMismatch: Locator;

  constructor(page: Page) {
    super(page);
    this.payeeName = page.locator('input[name="payee.name"]');
    this.address = page.locator('input[name="payee.address.street"]');
    this.city = page.locator('input[name="payee.address.city"]');
    this.state = page.locator('input[name="payee.address.state"]');
    this.zipCode = page.locator('input[name="payee.address.zipCode"]');
    this.phone = page.locator('input[name="payee.phoneNumber"]');
    this.accountNumber = page.locator('input[name="payee.accountNumber"]');
    this.verifyAccountNumber = page.locator('input[name="verifyAccount"]');
    this.amount = page.locator('input[name="amount"]');
    this.fromAccountSelect = page.locator('select[name="fromAccountId"]');
    this.sendPaymentBtn = page.locator('input[value="Send Payment"]');
    this.successHeading = page.locator('#billpayResult h1');
    this.errorMismatch = page.locator('.error');
  }

  async open() {
    await this.goto('/billpay.htm');
  }

  async payBill(payee: Payee, amount: string, fromAccountId: string) {
    await this.payeeName.fill(payee.name);
    await this.address.fill(payee.address);
    await this.city.fill(payee.city);
    await this.state.fill(payee.state);
    await this.zipCode.fill(payee.zipCode);
    await this.phone.fill(payee.phone);
    await this.accountNumber.fill(payee.accountNumber);
    await this.verifyAccountNumber.fill(payee.verifyAccountNumber);
    await this.amount.fill(amount);
    await this.fromAccountSelect.selectOption(fromAccountId);
    await this.sendPaymentBtn.click();
  }

  async expectPaymentSuccess() {
    await expect(this.successHeading).toContainText('Bill Payment Complete');
  }

  async expectAccountMismatchError() {
    await this.expectErrorContains("Account number and verify account number do not match.");
  }
}
