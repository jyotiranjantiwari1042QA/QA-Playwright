import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { UserData } from '../fixtures/test-data';

export class RegistrationPage extends BasePage {
  readonly registerLink: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly address: Locator;
  readonly city: Locator;
  readonly state: Locator;
  readonly zipCode: Locator;
  readonly phone: Locator;
  readonly ssn: Locator;
  readonly username: Locator;
  readonly password: Locator;
  readonly confirmPassword: Locator;
  readonly submitBtn: Locator;
  readonly successHeading: Locator;
  readonly fieldError: Locator;

  constructor(page: Page) {
    super(page);
    this.registerLink = page.locator('a[href*="register"]');
    this.firstName = page.locator('#customer\\.firstName');
    this.lastName = page.locator('#customer\\.lastName');
    this.address = page.locator('#customer\\.address\\.street');
    this.city = page.locator('#customer\\.address\\.city');
    this.state = page.locator('#customer\\.address\\.state');
    this.zipCode = page.locator('#customer\\.address\\.zipCode');
    this.phone = page.locator('#customer\\.phoneNumber');
    this.ssn = page.locator('#customer\\.ssn');
    this.username = page.locator('#customer\\.username');
    this.password = page.locator('#customer\\.password');
    this.confirmPassword = page.locator('#repeatedPassword');
    this.submitBtn = page.locator('input[value="Register"]');
    this.successHeading = page.locator('#rightPanel h1');
    this.fieldError = page.locator('.error');
  }

  async open() {
    await this.goto('/register.htm');
  }

  async fillForm(user: UserData) {
    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.address.fill(user.address);
    await this.city.fill(user.city);
    await this.state.fill(user.state);
    await this.zipCode.fill(user.zipCode);
    await this.phone.fill(user.phone);
    await this.ssn.fill(user.ssn);
    await this.username.fill(user.username);
    await this.password.fill(user.password);
    await this.confirmPassword.fill(user.password);
  }

  async submit() {
    await this.submitBtn.click();
  }

  async registerNewUser(user: UserData) {
    await this.open();
    await this.fillForm(user);
    await this.submit();
  }

  async expectRegistrationSuccess(username: string) {
    await expect(this.successHeading).toContainText('Welcome');
    await expect(this.page.locator('#rightPanel')).toContainText(username);
  }

  async expectDuplicateUsernameError() {
    await this.expectErrorContains('This username already exists');
  }

  async expectRequiredFieldError() {
    // ParaBank flags missing required fields inline per-field
    await expect(this.fieldError.first()).toBeVisible();
  }
}
