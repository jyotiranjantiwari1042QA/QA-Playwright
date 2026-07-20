import { TIMEOUT } from "dns";

const { test, expect } = require('@playwright/test');

test('Setup Competitive Wallboard', async ({ page }) => {
   // Test code goes here
  
  
  // Open Navigating to a URL
  console.log('Before navigating to the page');
  await page.goto('http://localhost:7250/');
  console.log('After navigating to the page');

  // Login Performing actions on the page 
  page.waitForNavigation
  await page.getByPlaceholder('Extension').click();
  await page.waitForTimeout(7000);
  await page.getByPlaceholder('Extension').fill('1002');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('1042');
  await page.getByRole('button', { name: 'Login' }).click();
  
  // Navigate to license page
  await page.waitForTimeout(7000);
  await page.locator('#Key').click();
  await page.locator('#Key').fill('c7c6d146-1aa4-4f1d-acc6-74-TESTUNIV18');
  await page.locator('#CustName').click();
  await page.locator('#CustName').fill('a');
  await page.locator('#ContactName').click();
  await page.locator('#ContactName').click();
  await page.locator('#ContactName').fill('a');
  await page.locator('#Address1').click();
  await page.locator('#Address1').fill('a');
  await page.locator('#Address2').click();
  await page.locator('#Address2').fill('a');
  await page.locator('#Address3').click();
  await page.locator('#Address3').fill('a');
  await page.locator('#City').click();
  await page.locator('#City').fill('a');
  await page.locator('#State').click();
  await page.locator('#State').fill('a');
  await page.locator('#ZipCode').fill('a');
  await page.locator('#ZipCode').click();
  await page.locator('#Country').fill('a');
  await page.locator('#Country').click();
  await page.locator('#Phone').click();
  await page.locator('#Phone').fill('a');
  await page.locator('#Email').click();
  await page.locator('#Email').fill('a');
  await page.locator('#Reseller').click();
  await page.getByRole('row', { name: 'Reseller: *', exact: true }).getByRole('cell').nth(1).click();
  await page.locator('#Reseller').click();
  await page.locator('#Reseller').fill('a');
  await page.getByRole('button', { name: 'Register' }).click();

  // Navigate to Setting Page
  await page.goto('http://localhost:7250/Settings');
  await page.getByRole('row', { name: 'Login Remember Me:', exact: true }).getByRole('cell').nth(1).click;
  await page.getByRole('combobox').selectOption('Custom Presence Group');
  await page.getByRole('row', { name: 'Login Remember Me:', exact: true }).locator('#RememberMe').check();
  await page.locator('#CustomStatus').check();
  await page.getByRole('row', { name: 'Internal Calls:', exact: true }).locator('#RememberMe').check();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByText('Settings updated successfully.').click();
  await page.getByLabel('Close popup').click();

  // Navigate to Agent Page
  await page.getByRole('link', { name: 'Agents' }).click();
  await page.locator('#chkAgent').check();
  await page.getByRole('row', { name: 'Add/Update Agents from 3CX:' }).getByRole('combobox').selectOption('Custom Presence Group');
  await page.locator('tr:nth-child(2) > td:nth-child(4) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(4) > input').fill('0');
  await page.locator('tr:nth-child(2) > td:nth-child(4) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(4) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(4) > input').fill('5');
  await page.locator('tr:nth-child(2) > td:nth-child(4) > input').click({
    clickCount: 4
  });
  await page.locator('tr:nth-child(2) > td:nth-child(5) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(5) > input').fill('0');
  await page.locator('tr:nth-child(2) > td:nth-child(5) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(5) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(5) > input').fill('5');
  await page.locator('tr:nth-child(2) > td:nth-child(5) > input').click({
    clickCount: 4
  });  
  await page.locator('tr:nth-child(2) > td:nth-child(6) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(6) > input').fill('0');
  await page.locator('tr:nth-child(2) > td:nth-child(6) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(6) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(6) > input').fill('5');
  await page.locator('tr:nth-child(2) > td:nth-child(6) > input').click({
    clickCount: 4
  });  
  await page.locator('tr:nth-child(2) > td:nth-child(7) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(7) > input').fill('0');
  await page.locator('tr:nth-child(2) > td:nth-child(7) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(7) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(7) > input').fill('5');
  await page.locator('tr:nth-child(2) > td:nth-child(7) > input').click({
    clickCount: 4
  });  
  await page.locator('tr:nth-child(2) > td:nth-child(8) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(8) > input').fill('0');
  await page.locator('tr:nth-child(2) > td:nth-child(8) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(8) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(8) > input').fill('5');
  await page.locator('tr:nth-child(2) > td:nth-child(8) > input').click({
    clickCount: 4
  });  
  await page.locator('tr:nth-child(2) > td:nth-child(9) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(9) > input').fill('0');
  await page.locator('tr:nth-child(2) > td:nth-child(9) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(9) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(9) > input').fill('5');
  await page.locator('tr:nth-child(2) > td:nth-child(9) > input').click({
    clickCount: 4
  });  
  await page.locator('tr:nth-child(2) > td:nth-child(10) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(10) > input').fill('0');
  await page.locator('tr:nth-child(2) > td:nth-child(10) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(10) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(10) > input').fill('5');
  await page.locator('tr:nth-child(2) > td:nth-child(10) > input').click({
    clickCount: 4
  }); 
  await page.locator('tr:nth-child(2) > td:nth-child(11) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(11) > input').fill('0');
  await page.locator('tr:nth-child(2) > td:nth-child(11) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(11) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(11) > input').fill('5');
  await page.locator('tr:nth-child(2) > td:nth-child(11) > input').click({
    clickCount: 4
  }); 
  await page.locator('tr:nth-child(2) > td:nth-child(12) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(12) > input').fill('0');
  await page.locator('tr:nth-child(2) > td:nth-child(12) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(12) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(12) > input').fill('5');
  await page.locator('tr:nth-child(2) > td:nth-child(12) > input').click({
    clickCount: 4
  }); 
  await page.locator('tr:nth-child(2) > td:nth-child(13) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(13) > input').fill('0');
  await page.locator('tr:nth-child(2) > td:nth-child(13) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(13) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(13) > input').fill('5');
  await page.locator('tr:nth-child(2) > td:nth-child(13) > input').click({
    clickCount: 4
  }); 
  await page.locator('tr:nth-child(2) > td:nth-child(14) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(14) > input').fill('0');
  await page.locator('tr:nth-child(2) > td:nth-child(14) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(14) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(14) > input').fill('5');
  await page.locator('tr:nth-child(2) > td:nth-child(14) > input').click({
    clickCount: 4
  }); 
  await page.locator('tr:nth-child(2) > td:nth-child(15) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(15) > input').fill('0');
  await page.locator('tr:nth-child(2) > td:nth-child(15) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(15) > input').click();
  await page.locator('tr:nth-child(2) > td:nth-child(15) > input').fill('5');
  await page.locator('tr:nth-child(2) > td:nth-child(15) > input').click({
    clickCount: 4
  }); 
  await page.getByRole('row', { name: '1002 VoIPTools' }).getByRole('combobox').selectOption('824-8243777_business-icon-establish-a-company-icon.png');
  await page.getByRole('link', { name: 'Wallboard' }).click();
  await page.waitForTimeout(7000);
  await page.getByRole('link', { name: 'Queues' }).click();
  await page.waitForTimeout(7000);
  await page.getByText('Logout', { exact: true }).click();
});

test('3CX Settings Inbound Rule for Competitive Wallboard', async ({ page }) => {
  
  console.log('Before navigating to the page');
  await page.goto('https://voiptoolsindia.3cx.us:5001/');
  await page.goto('https://voiptoolsindia.3cx.us:5001/#/loading');
  await page.goto('https://voiptoolsindia.3cx.us:5001/#/login');
  console.log('After navigating to the page');

  // Login Performing actions on the page
  page.waitForNavigation
  await page.getByPlaceholder('User name or extension number').click();
  await page.getByPlaceholder('User name or extension number').fill('admin');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('{`G+3X%LbX)a@:+F!5');
  await page.getByRole('button', { name: 'Login' }).click();

  // Check 3CX Agent in the Queues
  await page.getByRole('link', { name: ' Call Queues' }).click();
  await page.getByRole('button', { name: '8000 Test Wallboard Ring All' }).click();
  await page.getByRole('link', { name: 'Agents' }).click();
  await page.getByRole('link', { name: 'General' }).click();
  await page.getByPlaceholder('Ring Time (Seconds)').click();
  await page.getByPlaceholder('Ring Time (Seconds)').fill('10');
  await page.getByRole('textbox', { name: '1800' }).click();
  await page.getByRole('textbox', { name: '1800' }).fill('70');
  await page.getByRole('button', { name: 'OK' }).click();

  // Change the Inbound rule and select the Queue for Comptitive Wallboard
  await page.waitForSelector
  await page.getByRole('link', { name: ' Inbound Rules' }).click();
  await page.getByRole('button', { name: 'DID 9203068540 Telnyx LLC *' }).click();
  await page.getByLabel('Select box activate').first().click();
  await page.getByRole('searchbox', { name: 'Select box' }).fill('8000');
  await page.getByRole('option', { name: 'Test Wallboard' }).locator('span').first().click();
  await page.getByText('Test Wallboard').click();
  await page.getByLabel('Select box activate').nth(1).click();
  await page.getByRole('searchbox', { name: 'Select box' }).click();
  await page.getByRole('searchbox', { name: 'Select box' }).fill('8000');
  await page.getByText('Test Wallboard').click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('link', { name: 'A', exact: true }).click()
  await page.locator('a').filter({ hasText: 'Logout' }).click();
}); 

test('3CX Calling from Outside 3CX Server Competitive Wallboard Inbound', async ({ page }) => {
  
  console.log('Before navigating to the page')
  await page.goto('https://voiptoolswindowsdev03.my3cx.us/webclient/');
  await page.goto('https://voiptoolswindowsdev03.my3cx.us/webclient/#/');
  await page.goto('https://voiptoolswindowsdev03.my3cx.us/webclient/#/people');
  await page.goto('https://voiptoolswindowsdev03.my3cx.us/webclient/#/login');
  console.log('After navigating to the page');

  // Login Performing actions on the page
  await page.getByPlaceholder('Extension number').click();
  await page.getByPlaceholder('Extension number').fill('1001');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('S');
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('Shivaay@1042');
  await page.getByRole('button', { name: 'Login' }).click();

  // Performing the Call for Competitive Wallboard
  await page.getByRole('button', { name: 'Dialer' }).click();
  await page.getByPlaceholder('Enter name or number...').click();
  await page.getByPlaceholder('Enter name or number...').fill('9203068540');
  await page.locator('#btnCall').click();
  await page.waitForTimeout(120000);
  await page.locator('#btnKeyPadDecline').click();
});

