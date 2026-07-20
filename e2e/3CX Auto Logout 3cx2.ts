import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/login');
  await page.getByPlaceholder('Extension number').click();
  await page.getByPlaceholder('Extension number').fill('1002');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('S');
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('Shivaay@1042');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Panel' }).click();
  await page.getByRole('button', { name: 'All' }).click();
  await page.getByRole('link', { name: 'Test Wallboard' }).click();
  await page.getByRole('button', { name: 'Test Wallboard' }).click();
  await page.getByRole('link', { name: 'Autocallback' }).click();
  await page.getByRole('img', { name: '1002' }).click();
  
});