import { test, expect } from '@playwright/test';
import process from 'node:process';

const baseURL = process?.env?.FINANCE_APP_URL || 'https://www.airtelpayments.bank.in/login';

test.describe('Payments Bank mobile login sample', () => {
  test('user can enter mobile number and request OTP', async ({ page }) => {
    await page.goto(baseURL, { waitUntil: 'domcontentloaded', timeout: 60000 });

    await expect(page.getByText('Welcome')).toBeVisible();
    await expect(page.getByText('Please enter your registered mobile number.')).toBeVisible();

    const mobileInput = page.getByLabel('Mobile Number*');
    await expect(mobileInput).toBeVisible();
    await mobileInput.fill('9729644457');

    const sendOtpButton = page.getByRole('button', { name: /send otp/i }).first();
    await expect(sendOtpButton).toBeVisible();
    await expect(sendOtpButton).toBeEnabled();
    await sendOtpButton.click();

    const recaptchaFrame = page.frameLocator('iframe[title*="reCAPTCHA"], iframe[src*="recaptcha"]');
    const recaptchaCheckbox = recaptchaFrame.locator('#recaptcha-anchor, div[role="checkbox"]');
    if (await recaptchaCheckbox.count() > 0) {
      await expect(recaptchaCheckbox).toBeVisible({ timeout: 20000 });
      await recaptchaCheckbox.click();
    }

    await expect(page.getByText(/otp|one time password/i)).toBeVisible({ timeout: 20000 });
    await expect(page.getByText(/otp has been sent|we have sent|sent to your mobile/i)).toBeVisible({ timeout: 20000 });
  });
});
