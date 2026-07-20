import { test, expect } from '@playwright/test';

test('test', async ({ page, request }) => {
  await page.goto('http://localhost:7250/');
  await page.goto('http://localhost:7250/Index');
  await page.getByPlaceholder('Extension').click();
  await page.getByPlaceholder('Extension').fill('1002');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('1042');
  await page.getByRole('row', { name: 'Remember Me:' }).locator('label').click();
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Agents' }).click();
  await page.locator('tr:nth-child(2) > td:nth-child(4) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(4) > input').fill('0');
  await page.locator('tr:nth-child(2) > td:nth-child(5) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(5) > input').fill('0');
  await page.locator('td:nth-child(4) > input').first().click();
  await page.locator('tr:nth-child(2) > td:nth-child(4) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(4) > input').fill('1');
  await page.locator('tr:nth-child(2) > td:nth-child(4) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(4) > input').fill('2');
  await page.locator('tr:nth-child(2) > td:nth-child(4) > input').click({
    clickCount: 5
  });
  await page.locator('tr:nth-child(2) > td:nth-child(4) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(4) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(5) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(5) > input').fill('1');
  await page.locator('tr:nth-child(2) > td:nth-child(5) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(5) > input').fill('2');
  await page.locator('tr:nth-child(2) > td:nth-child(5) > input').click({
    clickCount: 3
  });
  await page.locator('tr:nth-child(2) > td:nth-child(6) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(6) > input').fill('3');
  await page.locator('tr:nth-child(2) > td:nth-child(6) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(7) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(7) > input').fill('2');
  await page.locator('tr:nth-child(2) > td:nth-child(7) > input').click({
    clickCount: 4
  });
  await page.locator('tr:nth-child(2) > td:nth-child(7) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(8) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(8) > input').fill('2');
  await page.locator('tr:nth-child(2) > td:nth-child(8) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(8) > input').fill('7');
  await page.locator('tr:nth-child(2) > td:nth-child(8) > input').click({
    clickCount: 4
  });
  await page.locator('tr:nth-child(2) > td:nth-child(8) > input').fill('500');
  await page.locator('tr:nth-child(2) > td:nth-child(4) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(4) > input').fill('');
  await page.locator('tr:nth-child(2) > td:nth-child(5) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(5) > input').fill('');
  await page.locator('tr:nth-child(2) > td:nth-child(4) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(4) > input').fill('1');
  await page.locator('tr:nth-child(2) > td:nth-child(4) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(4) > input').fill('4');
  await page.locator('tr:nth-child(2) > td:nth-child(4) > input').click({
    clickCount: 3
  });
  await page.getByRole('link', { name: 'Settings' }).click();
  await page.getByRole('link', { name: 'General' }).click();
  await page.getByRole('row', { name: 'Login Remember Me:', exact: true }).locator('#RememberMe').uncheck();
  await page.locator('#CustomStatus').uncheck();
  await page.getByRole('row', { name: 'Login Remember Me:', exact: true }).locator('#RememberMe').check();
  await page.locator('#CustomStatus').check();
  await page.getByRole('row', { name: 'Internal Calls:', exact: true }).locator('#RememberMe').check();
  await page.locator('app body').getByRole('list').locator('div').filter({ hasText: '__DEFAULT__' }).locator('label').click();
  await page.locator('app body').getByRole('list').locator('div').filter({ hasText: 'Group Managers' }).locator('label').click();
  await page.locator('app body').getByRole('list').locator('div').filter({ hasText: 'Custom Presence Group' }).locator('label').click();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByLabel('Close popup').click();
  
});