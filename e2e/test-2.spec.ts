import { test, expect } from '@playwright/test';

test('test', async ({ page, request }) => {
  await page.goto('http://localhost:7250/');
  await page.goto('http://localhost:7250/Index');
  await page.getByPlaceholder('Extension').click();
  await page.getByPlaceholder('Extension').fill('1002');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('1042');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Agents' }).click();
  await page.locator('tr:nth-child(2) > td:nth-child(4) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(4) > input').fill('0');
  await page.locator('tr:nth-child(2) > td:nth-child(4) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(4) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(4) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(4) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(4) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(4) > input').fill('1');
  await page.locator('tr:nth-child(2) > td:nth-child(4) > input').click({
    clickCount: 4
  });
  await page.locator('tr:nth-child(2) > td:nth-child(4) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(4) > input').fill('4');
  await page.locator('tr:nth-child(2) > td:nth-child(4) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(4) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(4) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(4) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(4) > input').fill('5');
  await page.locator('tr:nth-child(2) > td:nth-child(4) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(5) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(5) > input').fill('8');
  await page.locator('tr:nth-child(2) > td:nth-child(5) > input').click({
    clickCount: 5
  });
});