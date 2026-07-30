import { test, expect } from '@playwright/test';

const baseURL = process.env.FINANCE_APP_URL || 'https://airtelpayments.bank.in/login';

test.describe('Payments Bank mobile login sample', () => {
  test('user can enter mobile number and request OTP', async ({ page }) => {
    await page.goto(baseURL);

    await expect(page.getByText('Welcome')).toBeVisible();
    await expect(page.getByText('Please enter your registered mobile number.')).toBeVisible();

    const mobileInput = page.locator('input[name*=mobile], input[placeholder*=Mobile], input[type=tel]').first();
    await expect(mobileInput).toBeVisible();
    await mobileInput.fill('+919729644457');

    const recaptchaFrame = page.frameLocator('iframe[title*="reCAPTCHA"], iframe[src*="recaptcha"]');
    const recaptchaCheckbox = recaptchaFrame.locator('#recaptcha-anchor, div[role="checkbox"]');
    if (await recaptchaCheckbox.count() > 0) {
      await expect(recaptchaCheckbox).toBeVisible({ timeout: 10000 });
      await recaptchaCheckbox.click();
    }

    const sendOtpButton = page.getByRole('button', { name: /send otp/i }).first();
    await expect(sendOtpButton).toBeVisible();
    await sendOtpButton.click();

    // Validate that OTP input or verification step appears after Send OTP.
    await expect(page.getByText(/otp|one time password/i)).toBeVisible({ timeout: 10000 });
  });
});
