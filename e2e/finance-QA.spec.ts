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
    const mobileInput = page.getByRole('textbox', { name: /mobile number/i });
    await expect(mobileInput).toBeVisible();
    await mobileInput.fill('9729644457');
    await page.waitForTimeout(70000);



    const sendOtpButton = page.getByRole('button', { name: 'Send OTP' }).first();
    await expect(sendOtpButton).toBeVisible();
    await expect(sendOtpButton).toBeEnabled();
    await sendOtpButton.click();

    // After Send OTP: verify the app moved to the OTP-sent confirmation step.
    await expect(
      page.getByText(/otp has been sent|we have sent|sent to your mobile/i)
    ).toBeVisible({ timeout: 20000 });
  });
});