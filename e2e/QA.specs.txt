import { test, expect } from '@playwright/test';

declare const process: any;
const baseURL = process?.env?.FINANCE_APP_URL || 'https://www.airtelpayments.bank.in/login';

test.describe('Payments Bank mobile login sample', () => {
  test('user can enter mobile number and request OTP', async ({ page }) => {
    await page.goto(baseURL, { waitUntil: 'domcontentloaded', timeout: 60000 });

    await expect(page.getByText('Welcome')).toBeVisible();
    await expect(page.getByText('Please enter your registered mobile number.')).toBeVisible();

    // The label includes a trailing "*" which can break getByLabel's exact
    // accessible-name match. Anchor on the input itself instead.
    const mobileInput = page.locator('input[type="tel"], input[placeholder="+91"]').first();
    await expect(mobileInput).toBeVisible();
    await mobileInput.click();
    await mobileInput.fill('9416634433');

    // The reCAPTCHA only renders AFTER a number is entered (confirmed from the
    // screenshots), so wait for it here rather than before filling the input.
    const recaptchaFrameLocator = page.frameLocator(
      'iframe[title*="reCAPTCHA" i], iframe[src*="recaptcha"]'
    ).first();
    const recaptchaCheckbox = recaptchaFrameLocator.getByRole('checkbox', { name: /not a robot/i });

    await expect(recaptchaCheckbox).toBeVisible({ timeout: 20000 });
    await recaptchaCheckbox.click();

    // NOTE: A live Google reCAPTCHA v2 cannot be reliably auto-solved by
    // Playwright. If a visual/image challenge appears, this will hang until
    // timeout unless it's resolved by a human, a solving service, or the
    // environment has captcha disabled for test/staging use.
    await expect(recaptchaCheckbox).toHaveAttribute('aria-checked', 'true', { timeout: 120000 });

    const sendOtpButton = page.getByRole('button', { name: /send otp/i });
    await expect(sendOtpButton).toBeEnabled({ timeout: 20000 });
    await sendOtpButton.click();

    // After Send OTP: verify the app moved to the OTP entry step.
    await expect(page.getByText(/otp|one time password/i)).toBeVisible({ timeout: 20000 });
    await expect(
      page.getByText(/otp has been sent|we have sent|sent to your mobile/i)
    ).toBeVisible({ timeout: 20000 });
  });
});