import { test, expect } from '@playwright/test';

declare const process: any;
const baseURL = process?.env?.FINANCE_APP_URL || 'https://www.airtelpayments.bank.in/login';

test.describe('Payments Bank mobile login sample', () => {
  test('user can enter mobile number and request OTP', async ({ page }) => {
    await page.goto(baseURL, { waitUntil: 'domcontentloaded', timeout: 60000 });

    await expect(page.getByText('Welcome')).toBeVisible();
    await expect(page.getByText('Please enter your registered mobile number.')).toBeVisible();

    const mobileInput = page.getByRole('textbox', { name: /mobile number/i });
    await expect(mobileInput).toBeVisible();
    await mobileInput.fill('9416634433');

    const recaptchaCheckbox = page.frameLocator('iframe[title*="reCAPTCHA"], iframe[src*="recaptcha"], iframe[title*="captcha"]').getByRole('checkbox', { name: /not a robot/i });
    if (await recaptchaCheckbox.count() > 0) {
      await expect(recaptchaCheckbox).toBeVisible({ timeout: 60000 });
      await expect(recaptchaCheckbox).toBeEnabled({ timeout: 60000 });
      await recaptchaCheckbox.click();
      await expect(recaptchaCheckbox).toHaveAttribute('aria-checked', 'true', { timeout: 120000 });
    }

    const sendOtpButton = page.getByRole('button', { name: /send otp/i });
    await expect(sendOtpButton).toBeVisible({ timeout: 20000 });
    await expect(sendOtpButton).toBeEnabled({ timeout: 20000 });
    await sendOtpButton.click();

    await expect(page.getByText(/otp|one time password/i)).toBeVisible({ timeout: 20000 });
    await expect(page.getByText(/otp has been sent|we have sent|sent to your mobile/i)).toBeVisible({ timeout: 20000 });
  });
});
