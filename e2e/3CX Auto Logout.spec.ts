import { TIMEOUT } from "dns";
import { test, expect } from '@playwright/test';

test('Auto logout', async ({ page }) => {
  // Test code goes here
  
  
  // Open Navigating to a URL
  console.log('Before navigating to the page');
  await page.goto('http://localhost:6150/Login');
  console.log('After navigating to the page');

  // Login Performing actions on the page 
  page.waitForNavigation
  await page.getByLabel('Extension').click();
  await page.waitForTimeout(7000);
  await page.getByLabel('Extension').fill('1002');
  await page.getByLabel('Pin').click();
  await page.getByLabel('Pin').fill('1042');
  await page.getByRole('button', { name: 'Login' }).click();

  // Navigate to license page
  await page.getByRole('link', { name: 'License' }).click();
  await page.getByLabel('Key').click();
  await page.getByLabel('Key').fill('c7c6d146-1aa4-4f1d-acc6-74-TESTUNIV18');
  await page.getByLabel('Customer Name').click();
  await page.getByLabel('Customer Name').fill('a');
  await page.getByLabel('Contact Name').click();
  await page.getByLabel('Contact Name').fill('a');
  await page.getByLabel('Address 1').click();
  await page.getByLabel('Address 1').fill('a');
  await page.getByLabel('Address 2').click();
  await page.getByLabel('Address 2').fill('a');
  await page.getByLabel('Address 3').click();
  await page.getByLabel('Address 3').fill('a');
  await page.getByLabel('City').click();
  await page.getByLabel('City').fill('a');
  await page.getByLabel('State / Province').click();
  await page.getByLabel('State / Province').fill('a');
  await page.getByLabel('Zip / Postal Code').click();
  await page.getByLabel('Zip / Postal Code').fill('a');
  await page.getByLabel('Country').click();
  await page.getByLabel('Country').fill('a');
  await page.getByLabel('Phone').click();
  await page.getByLabel('Phone').fill('a');
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('a');
  await page.getByLabel('Reseller').click();
  await page.getByLabel('Reseller').fill('a');
  await page.getByLabel('Reseller').press('Enter');
  await page.getByRole('button', { name: 'Register' }).click();
  
  // Wait for a specific selector to appear
  await page.waitForSelector('button:has-text("OK")');
  await page.getByRole('button', { name: 'OK' }).click();

  // Navigate to Email page
  await page.getByRole('link', { name: 'Email' }).click();
  await page.getByLabel('Email Extension').check();
  await page.locator('.mud-input-slot').first().click();
  await page.locator('.mud-input-slot').first().click();
  await page.locator('.mud-input-slot').first().fill('smtp.office365.com');
  await page.getByLabel('Port').click();
  await page.getByLabel('Port').fill('587');
  await page.locator('input[type="email"]').nth(0).fill('mail@voiptools.com');
  await page.getByLabel('Subject').click();
  await page.getByLabel('Subject').fill('Logout from Queue');
  await page.locator('input[type="email"]').nth(1).fill('jyoti.ranjan@voiptools.com');
  await page.getByLabel('Requires Authentication').check();
  await page.locator('input[type="email"]').nth(2).fill('mail@voiptools.com');
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('/.r%`oVaCxx*Li4m;,');
  await page.getByLabel('Requires SSL').check();
  await page.getByRole('button', { name: 'Test' }).click();

  // Wait for a specific selector to appear
  await page.waitForSelector('button:has-text("OK")');
  await page.getByRole('button', { name: 'OK' }).click();

  // Navigate to Setting page
  await page.getByRole('link', { name: 'Setting' }).click();
  await page.getByRole('textbox').first().click();
  await page.getByRole('spinbutton').first().press('ArrowUp');
  await page.getByRole('spinbutton').first().press('ArrowUp');

  // Select the radio button
  await page.getByRole('radio', { name: 'Logout', exact: true }).check();
  await page.getByLabel('Logout from Selected Queues').check();

  
  // Perform the action to check the checkbox
  await page.waitForTimeout(7000);
  await page.getByRole('row', { name: 'Test Wallboard' }).getByLabel('').click(); // Perform the click action
  await page.getByRole('row', { name: 'Test Wallboard' }).getByLabel('').check(); // Perform the check action
  await page.waitForTimeout(7000);
  await page.getByRole('row', { name: 'Autocallback' }).getByLabel('').click();   // Perform the click action
  await page.getByRole('row', { name: 'Autocallback' }).getByLabel('').check();   // Perform the check action
  await page.waitForTimeout(7000);
  await page.getByRole('row', { name: 'Autologout' }).getByLabel('').click();     // Perform the click action
  await page.getByRole('row', { name: 'Autologout' }).getByLabel('').check();     // Perform the check action

 // Click on the element with the label text "Open Time Picker"
  await page.getByLabel('Open Time Picker').click();
  await page.getByRole('button', { name: 'PM' }).click();
  await page.locator('.mud-picker-stick').nth(0).click();
  await page.locator('.mud-picker-stick').nth(0).locator('div').nth(42).click();
  await page.getByRole('button', { name: 'Logout' }).click();

});

test('3CX Settings Inbound Rule for Auto Logout', async ({ page }) => {
  
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

  // Change the Inbound rule and select the Queue for Auto Logout
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
 
test('3CX Web Client To Check Queue Login For Auto Logout', async ({ page }) => {
  
  console.log('Before navigating to the page');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/people');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/login');
  console.log('After navigating to the page');

  // Login Performing actions on the page
  await page.getByPlaceholder('Extension number').click();
  await page.getByPlaceholder('Extension number').fill('1002');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('S');
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('Shivaay@1042');
  await page.getByRole('button', { name: 'Login' }).click();

  // Check the Queue Extension Login or Logout 
  await page.getByRole('link', { name: 'Panel' }).click();
  await page.getByRole('button', { name: 'All' }).click();
  await page.getByRole('link', { name: 'Test Wallboard' }).click();
  await page.locator('#layout-type2-content').getByText('Tiwari84 jyoti ranjan').click();
  await page.locator('a').filter({ hasText: 'Logged out' }).click();
  await page.waitForTimeout(7000);
  await page.getByRole('link', { name: 'Panel' }).click();
  await page.getByRole('button', { name: 'All' }).click();
  await page.getByRole('link', { name: 'Autocallback' }).click();
  await page.locator('#layout-type2-content').getByText('Tiwari84 jyoti ranjan').click();
  await page.locator('a').filter({ hasText: 'Logged out' }).click();
  await page.waitForTimeout(7000);
  await page.getByRole('link', { name: 'Panel' }).click();
  await page.getByRole('button', { name: 'All' }).click();
  await page.getByRole('link', { name: 'Autologout' }).click();
  await page.locator('#layout-type2-content').getByText('Tiwari84 jyoti ranjan').click();
  await page.locator('a').filter({ hasText: 'Logged out' }).click();
  await page.getByRole('link', { name: 'Panel' }).click();
  await page.getByRole('img', { name: '1002' }).click();
  await page.locator('#menuLogout').click();
});

test('3CX Calling from Outside 3CX Server For Auto Logout', async ({ page }) => {
  
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

  // Performing the Missied Call for selected Queue Auto logout
  await page.getByRole('button', { name: 'Dialer' }).click();
  await page.getByPlaceholder('Enter name or number...').click();
  await page.getByPlaceholder('Enter name or number...').fill('9203068540');
  await page.locator('#btnCall').click();
  await page.waitForTimeout(120000);
  await page.locator('#btnKeyPadDecline').click();
});

test('3CX Web Client To Check selected Queue Logout For Auto Logout', async ({ page }) => {
  
  console.log('Before navigating to the page');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/people');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/login');
  console.log('After navigating to the page');

  // Login Performing actions on the page
  await page.getByPlaceholder('Extension number').click();
  await page.getByPlaceholder('Extension number').fill('1002');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('S');
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('Shivaay@1042');
  await page.getByRole('button', { name: 'Login' }).click();

  // Check the Queue Extension Logout 
  await page.getByRole('link', { name: 'Panel' }).click();
  await page.getByRole('button', { name: 'All' }).click();
  await page.getByRole('link', { name: 'Test Wallboard' }).click();
  await page.waitForTimeout(7000);
  await page.getByRole('link', { name: 'Panel' }).click();
  await page.getByRole('button', { name: 'All' }).click();
  await page.getByRole('link', { name: 'Autocallback' }).click();
  await page.waitForTimeout(7000);
  await page.getByRole('link', { name: 'Panel' }).click();
  await page.getByRole('button', { name: 'All' }).click();
  await page.getByRole('link', { name: 'Autologout' }).click();
  await page.waitForTimeout(7000);
  await page.getByRole('img', { name: '1002' }).click();
  await page.locator('#menuLogout').click();
});

test('3CX Web Client To 2 selcted Queue Login For Auto Logout', async ({ page }) => {
  
  console.log('Before navigating to the page');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/people');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/login');
  console.log('After navigating to the page');

  // Login Performing actions on the page
  await page.getByPlaceholder('Extension number').click();
  await page.getByPlaceholder('Extension number').fill('1002');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('S');
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('Shivaay@1042');
  await page.getByRole('button', { name: 'Login' }).click();

  // Check the Queue Extension Login or Logout 
  await page.getByRole('link', { name: 'Panel' }).click();
  await page.getByRole('button', { name: 'All' }).click();
  await page.getByRole('link', { name: 'Autocallback' }).click();
  await page.locator('#layout-type2-content').getByText('Tiwari84 jyoti ranjan').click();
  await page.locator('a').filter({ hasText: 'Logged out' }).click();
  await page.waitForTimeout(7000);
  await page.getByRole('link', { name: 'Panel' }).click();
  await page.getByRole('img', { name: '1002' }).click();
  await page.locator('#menuLogout').click();
});

test('3CX Settings Inbound Rule For 2 Selected Queue in Auto Logout', async ({ page }) => {
 
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

  // Check 3CX Agent in the 2 Selected Queues of Auto Logout
  await page.getByRole('link', { name: ' Call Queues' }).click();
  await page.getByRole('button', { name: '8001 Autocallback Ring All' }).click();
  await page.getByRole('link', { name: 'Agents' }).click();
  await page.getByRole('link', { name: 'General' }).click();
  await page.getByPlaceholder('Ring Time (Seconds)').click();
  await page.getByPlaceholder('Ring Time (Seconds)').fill('10');
  await page.getByRole('textbox', { name: '1800' }).click();
  await page.getByRole('textbox', { name: '1800' }).fill('70');
  await page.getByRole('button', { name: 'OK' }).click();

  // Change the Inbound rule and select the Queue for Auto Logout
  await page.waitForSelector
  await page.waitForTimeout(7000);
  await page.getByRole('link', { name: ' Inbound Rules' }).click();
  await page.getByRole('button', { name: 'DID 9203068540 Telnyx LLC *' }).click();
  await page.getByLabel('Select box activate').first().click();
  await page.getByRole('searchbox', { name: 'Select box' }).fill('8001');
  await page.getByRole('option', { name: 'Autocallback' }).locator('span').first().click();
  await page.getByLabel('Select box activate').nth(1).click();
  await page.getByRole('searchbox', { name: 'Select box' }).fill('8001');
  await page.getByRole('option', { name: 'Autocallback' }).locator('span').first().click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('link', { name: 'A', exact: true }).click()
  await page.locator('a').filter({ hasText: 'Logout' }).click();
});

test('3CX Web Client To Check 2 selected Queue Auto Logout', async ({ page }) => {

  console.log('Before navigating to the page');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/people');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/login');
  console.log('After navigating to the page');

  // Login Performing actions on the page
  await page.getByPlaceholder('Extension number').click();
  await page.getByPlaceholder('Extension number').fill('1002');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('S');
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('Shivaay@1042');
  await page.getByRole('button', { name: 'Login' }).click();

  // Check the Queue Extension Logout 
  await page.getByRole('link', { name: 'Panel' }).click();
  await page.getByRole('button', { name: 'All' }).click();
  await page.getByRole('link', { name: 'Autocallback' }).click();
  await page.waitForTimeout(7000);
  await page.getByRole('link', { name: 'Panel' }).click();
  await page.getByRole('img', { name: '1002' }).click();
  await page.locator('#menuLogout').click();
});

test('3CX Web Client To 3 selected Queue Login For Auto Logout', async ({ page }) => {
  
  console.log('Before navigating to the page');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/people');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/login');
  console.log('After navigating to the page');

  // Login Performing actions on the page
  await page.getByPlaceholder('Extension number').click();
  await page.getByPlaceholder('Extension number').fill('1002');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('S');
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('Shivaay@1042');
  await page.getByRole('button', { name: 'Login' }).click();

  // Check the Queue Extension Login or Logout 
  await page.getByRole('link', { name: 'Panel' }).click();
  await page.getByRole('button', { name: 'All' }).click();
  await page.getByRole('link', { name: 'Autologout' }).click();
  await page.locator('#layout-type2-content').getByText('Tiwari84 jyoti ranjan').click();
  await page.locator('a').filter({ hasText: 'Logged out' }).click();
  await page.waitForTimeout(7000);
  await page.getByRole('link', { name: 'Panel' }).click();
  await page.getByRole('img', { name: '1002' }).click();
  await page.locator('#menuLogout').click();
});

test('3CX Settings Inbound Rule For 3 Selected Queue in Auto Logout', async ({ page }) => {
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

  // Check 3CX Agent in the 2 Selected Queues of Auto Logout
  await page.getByRole('link', { name: ' Call Queues' }).click();
  await page.getByRole('button', { name: '8002 Autologout Ring All' }).click();
  await page.getByRole('link', { name: 'Agents' }).click();
  await page.getByRole('link', { name: 'General' }).click();
  await page.getByPlaceholder('Ring Time (Seconds)').click();
  await page.getByPlaceholder('Ring Time (Seconds)').fill('10');
  await page.getByRole('textbox', { name: '1800' }).click();
  await page.getByRole('textbox', { name: '1800' }).fill('70');
  await page.getByRole('button', { name: 'OK' }).click();

  // Change the Inbound rule and select the Queue for Auto Logout
  await page.getByRole('link', { name: ' Inbound Rules' }).click();
  await page.getByRole('button', { name: 'DID 9203068540 Telnyx LLC *' }).click();
  await page.getByLabel('Select box activate').first().click();
  await page.getByRole('searchbox', { name: 'Select box' }).fill('8002');
  await page.locator('#ui-select-choices-row-0-0').getByText('Autologout').click();
  await page.getByLabel('Select box activate').nth(1).click();
  await page.getByRole('searchbox', { name: 'Select box' }).fill('8002');
  await page.locator('#ui-select-choices-row-1-0').getByText('Autologout').click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('link', { name: 'A', exact: true }).click()
  await page.locator('a').filter({ hasText: 'Logout' }).click();
});

test('3CX Web Client To Check 3 selected Queue Auto Logout', async ({ page }) => {

  console.log('Before navigating to the page');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/people');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/login');
  console.log('After navigating to the page');

  // Login Performing actions on the page
  await page.getByPlaceholder('Extension number').click();
  await page.getByPlaceholder('Extension number').fill('1002');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('S');
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('Shivaay@1042');
  await page.getByRole('button', { name: 'Login' }).click();

  // Check the Queue Extension Logout 
  await page.getByRole('link', { name: 'Panel' }).click();
  await page.getByRole('button', { name: 'All' }).click();
  await page.getByRole('link', { name: 'Autocallback' }).click();
  await page.waitForTimeout(7000);
  await page.getByRole('link', { name: 'Panel' }).click();
  await page.waitForTimeout(7000);
  await page.getByRole('img', { name: '1002' }).click();
  await page.locator('#menuLogout').click();
});

test('3CX Setting inbound rule for Transferred Other Queue Auto Logout', async ({ page }) => {

  console.log('Before navigating to the page');
  await page.goto('https://voiptoolsindia.3cx.us:5001/');
  await page.goto('https://voiptoolsindia.3cx.us:5001/#/loading');
  await page.goto('https://voiptoolsindia.3cx.us:5001/#/login');
  console.log('After navigating to the page');

  // Login Performing actions on the page
  await page.getByPlaceholder('User name or extension number').click();
  await page.getByPlaceholder('User name or extension number').fill('admin');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('S');
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('{`G+3X%LbX)a@:+F!5');
  await page.getByRole('button', { name: 'Login' }).click();

  // Settings in the Queue for Auto Logout
  await page.getByRole('link', { name: ' Call Queues' }).click();
  await page.getByRole('button', { name: '8000 Test Wallboard Ring All' }).click();
  await page.getByPlaceholder('Ring Time (Seconds)').click();
  await page.getByPlaceholder('Ring Time (Seconds)').fill('15')
  await page.getByRole('textbox', { name: '1800' }).click();
  await page.getByRole('textbox', { name: '1800' }).fill('15');
  await page.locator('no-answer-destination-control').getByRole('combobox').selectOption('string:DestinationType.QueueOrRingGroup');
  await page.getByLabel('Select box activate').click();
  await page.getByLabel('Select box', { exact: true }).click();
  await page.locator('#ui-select-choices-row-0-0').getByText('Autocallback').click();
  await page.getByRole('button', { name: 'OK' }).click();
  
  // Change the Inbound rule and select the Queue for Auto Logout
  await page.waitForSelector
  await page.getByRole('link', { name: ' Inbound Rules' }).click();
  await page.getByRole('button', { name: 'DID 9203068540 Telnyx LLC *' }).click();
  await page.getByLabel('Select box activate').first().click();
  await page.getByRole('searchbox', { name: 'Select box' }).fill('8000');
  await page.getByRole('option', { name: 'Test Wallboard' }).locator('span').first().click();
  await page.getByLabel('Select box activate').nth(1).click();
  await page.getByRole('searchbox', { name: 'Select box' }).click();
  await page.getByRole('searchbox', { name: 'Select box' }).fill('8000');
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('link', { name: 'A', exact: true }).click()
  await page.locator('a').filter({ hasText: 'Logout' }).click();
});

test('3CX check for Transferred Other Queue Login in 3CX Queue Auto Logout', async ({ page }) => {
  
  console.log('Before navigating to the page');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/people');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/login');
  console.log('After navigating to the page');

  // Login Performing actions on the page
  await page.getByPlaceholder('Extension number').click();
  await page.getByPlaceholder('Extension number').fill('1002');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('S');
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('Shivaay@1042');
  await page.getByRole('button', { name: 'Login' }).click();

  // Check the Queue Extension Logout 
  await page.getByRole('link', { name: 'Panel' }).click();
  await page.getByRole('button', { name: 'All' }).click();
  await page.getByRole('link', { name: 'Test Wallboard' }).click();
  await page.locator('#layout-type2-content').getByText('Tiwari84 jyoti ranjan').click();
  await page.locator('a').filter({ hasText: 'Logged out' }).click();
  await page.waitForTimeout(7000);
  await page.getByRole('link', { name: 'Panel' }).click();
  await page.getByRole('button', { name: 'All' }).click();
  await page.getByRole('link', { name: 'Autocallback' }).click();
  await page.locator('#layout-type2-content').getByText('Tiwari84 jyoti ranjan').click();
  await page.locator('a').filter({ hasText: 'Logged out' }).click();
  await page.waitForTimeout(7000);
  await page.getByRole('img', { name: '1002' }).click();
  await page.locator('#menuLogout').click();
});

test('3CX Web Transferred Other Queue Logout in 3CX Queue Auto Logout', async ({ page }) => {

  console.log('Before navigating to the page');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/people');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/login');
  console.log('After navigating to the page');

  // Login Performing actions on the page
  await page.getByPlaceholder('Extension number').click();
  await page.getByPlaceholder('Extension number').fill('1002');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('S');
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('Shivaay@1042');
  await page.getByRole('button', { name: 'Login' }).click();

  // Check the Queue Extension Logout 
  await page.getByRole('link', { name: 'Panel' }).click();
  await page.getByRole('button', { name: 'All' }).click();
  await page.getByRole('link', { name: 'Test Wallboard' }).click();
  await page.waitForTimeout(7000);
  await page.getByRole('link', { name: 'Panel' }).click();
  await page.waitForTimeout(7000);
  await page.getByRole('img', { name: '1002' }).click();
  await page.locator('#menuLogout').click();
});

test('Auto Logout Settings for Logout from all Queue', async ({ page }) => {
  
  // Open Navigating to a URL
  console.log('Before navigating to the page');
  await page.goto('http://localhost:6150/Login');
  console.log('After navigating to the page');

  // Login Performing actions on the page 
  page.waitForNavigation
  await page.getByLabel('Extension').click();
  await page.waitForTimeout(7000);
  await page.getByLabel('Extension').fill('1002');
  await page.getByLabel('Pin').click();
  await page.getByLabel('Pin').fill('1042');
  await page.getByRole('button', { name: 'Login' }).click();

  // Change the setting to Logout from all the Queues
  await page.getByRole('radio', { name: 'Logout', exact: true }).check();
  await page.getByLabel('Logout from All Queues').check();
  await page.waitForTimeout(7000);
  await page.getByRole('row', { name: 'Autocallback' }).getByLabel('').uncheck();
  await page.waitForTimeout(7000);
  await page.getByRole('row', { name: 'Test Wallboard' }).getByLabel('').uncheck();
  await page.waitForTimeout(7000);
  await page.getByRole('row', { name: 'Autologout' }).getByLabel('').uncheck();
  await page.waitForTimeout(7000);
  await page.getByRole('row', { name: 'OCM Queue' }).getByLabel('').check();
  await page.waitForTimeout(7000);
  await page.getByRole('row', { name: '8006 Queue' }).getByLabel('').check();
  await page.waitForTimeout(7000);
  await page.getByRole('row', { name: '8008 Click to Call' }).getByLabel('').check();
  await page.getByText('3CX Auto Logout 1002 jyoti ranjan Tiwari84 Settings Email License Auto Logout').click();
  await page.getByRole('button', { name: 'Logout' }).click();
});

test('3CX Setting inbound rule for logout from all Queue Auto Logout', async ({ page }) => {
  
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
  await page.getByRole('button', { name: '8004 OCM Queue Ring All' }).click();
  await page.getByRole('link', { name: 'Agents' }).click();
  await page.getByRole('link', { name: 'General' }).click();
  await page.getByPlaceholder('Ring Time (Seconds)').click();
  await page.getByPlaceholder('Ring Time (Seconds)').fill('10');
  await page.getByRole('textbox', { name: '1800' }).click();
  await page.getByRole('textbox', { name: '1800' }).fill('70');
  await page.getByRole('button', { name: 'OK' }).click();

  // Change the Inbound rule and select the Queue for Auto Logout
  await page.waitForSelector
  await page.getByRole('link', { name: ' Inbound Rules' }).click();
  await page.getByRole('button', { name: 'DID 9203068540 Telnyx LLC *' }).click();
  await page.getByLabel('Select box activate').first().click();
  await page.getByRole('searchbox', { name: 'Select box' }).fill('8004');
  await page.getByRole('option', { name: 'OCM Queue' }).locator('span').first().click();
  await page.getByText('OCM Queue').click();
  await page.getByLabel('Select box activate').nth(1).click();
  await page.getByRole('searchbox', { name: 'Select box' }).click();
  await page.getByRole('searchbox', { name: 'Select box' }).fill('8004');
  await page.getByText('OCM Queue').click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('link', { name: 'A', exact: true }).click()
  await page.locator('a').filter({ hasText: 'Logout' }).click();
});

test('3CX Web Client To check all Queue Login For Auto Logout', async ({ page }) => {
  
  console.log('Before navigating to the page');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/people');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/login');
  console.log('After navigating to the page');

  // Login Performing actions on the page
  await page.getByPlaceholder('Extension number').click();
  await page.getByPlaceholder('Extension number').fill('1002');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('S');
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('Shivaay@1042');
  await page.getByRole('button', { name: 'Login' }).click();

  // Check the Queue Extension Login or Logout 
  await page.getByRole('link', { name: 'Panel' }).click();
  await page.getByRole('button', { name: 'All' }).click();
  await page.getByRole('link', { name: 'OCM Queue' }).click();
  await page.locator('#layout-type2-content').getByText('Tiwari84 jyoti ranjan').click();
  await page.locator('a').filter({ hasText: 'Logged out' }).click();
  await page.waitForTimeout(7000);
  await page.getByRole('link', { name: 'Panel' }).click();
  await page.getByRole('img', { name: '1002' }).click();
  await page.locator('#menuLogout').click();
});

test('3CX Web Client To Check all Queue status Logout for Auto Logout', async ({ page }) => {

  console.log('Before navigating to the page');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/people');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/login');
  console.log('After navigating to the page');

  // Login Performing actions on the page
  await page.getByPlaceholder('Extension number').click();
  await page.getByPlaceholder('Extension number').fill('1002');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('S');
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('Shivaay@1042');
  await page.getByRole('button', { name: 'Login' }).click();

  // Check the Queue Extension Logout 
  await page.getByRole('link', { name: 'Panel' }).click();
  await page.getByRole('button', { name: 'All' }).click();
  await page.getByRole('link', { name: 'OCM Queue' }).click();
  await page.waitForTimeout(7000);
  await page.getByRole('link', { name: 'Panel' }).click();
  await page.waitForTimeout(7000);
  await page.getByRole('img', { name: '1002' }).click();
  await page.locator('#menuLogout').click();
});

test('Auto Logout Settings DND', async ({ page }) => {

  // Open Navigating to a URL
  console.log('Before navigating to the page');
  await page.goto('http://localhost:6150/Login');
  console.log('After navigating to the page');

  // Login Performing actions on the page 
  page.waitForNavigation
  await page.getByLabel('Extension').click();
  await page.waitForTimeout(7000);
  await page.getByLabel('Extension').fill('1002');
  await page.getByLabel('Pin').click();
  await page.getByLabel('Pin').fill('1042');
  await page.getByRole('button', { name: 'Login' }).click();

  // Change the setting to DND for the Queues 
  await page.getByLabel('Do Not Disturb').check();
  await page.waitForTimeout(7000);
  await page.getByRole('row', { name: 'OCM Queue' }).getByLabel('').uncheck();
  await page.waitForTimeout(7000);
  await page.getByRole('row', { name: '8006 Queue' }).getByLabel('').uncheck();
  await page.waitForTimeout(7000);
  await page.getByRole('row', { name: '8008 Click to Call' }).getByLabel('').uncheck();
  await page.waitForTimeout(7000);
  await page.getByRole('row', { name: 'power dialer' }).getByLabel('').uncheck();
  await page.waitForTimeout(7000);
  await page.getByRole('row', { name: 'Competitive wallboard' }).getByLabel('').check();
  await page.waitForTimeout(7000);
  await page.getByRole('row', { name: 'power dialer' }).getByLabel('').check();
  await page.waitForTimeout(7000);
  await page.getByRole('row', { name: '8011 OCM' }).getByLabel('').check();
  await page.getByText('3CX Auto Logout 1002 jyoti ranjan Tiwari84 Settings Email License Auto Logout').click();
  await page.getByRole('button', { name: 'Logout' }).click();
});

test('3CX Setting inbound rule for DND Queue Auto Logout', async ({ page }) => {
  
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
  await page.getByRole('button', { name: '8009 Competitive wallboard Ring All' }).click();
  await page.getByRole('link', { name: 'Agents' }).click();
  await page.getByRole('link', { name: 'General' }).click();
  await page.getByPlaceholder('Ring Time (Seconds)').click();
  await page.getByPlaceholder('Ring Time (Seconds)').fill('10');
  await page.getByRole('textbox', { name: '1800' }).click();
  await page.getByRole('textbox', { name: '1800' }).fill('70');
  await page.getByRole('button', { name: 'OK' }).click();
  await page.waitForTimeout(7000);
  await page.getByRole('button', { name: '8010 power dialer Ring All' }).click();
  await page.getByRole('link', { name: 'Agents' }).click();
  await page.getByRole('link', { name: 'General' }).click();
  await page.getByPlaceholder('Ring Time (Seconds)').click();
  await page.getByPlaceholder('Ring Time (Seconds)').fill('10');
  await page.getByRole('textbox', { name: '1800' }).click();
  await page.getByRole('textbox', { name: '1800' }).fill('70');
  await page.getByRole('button', { name: 'OK' }).click();
  await page.waitForTimeout(7000);
  await page.getByRole('button', { name: '8011 OCM Test Ring All' }).click();
  await page.getByRole('link', { name: 'Agents' }).click();
  await page.getByRole('link', { name: 'General' }).click();
  await page.getByPlaceholder('Ring Time (Seconds)').click();
  await page.getByPlaceholder('Ring Time (Seconds)').fill('10');
  await page.getByRole('textbox', { name: '1800' }).click();
  await page.getByRole('textbox', { name: '1800' }).fill('70');
  await page.getByRole('button', { name: 'OK' }).click();
  

  // Change the Inbound rule and select the Queue for Auto Logout
  await page.waitForSelector
  await page.waitForTimeout(7000);
  await page.getByRole('link', { name: ' Inbound Rules' }).click();
  await page.getByRole('button', { name: 'DID 9203068540 Telnyx LLC *' }).click();
  await page.getByLabel('Select box activate').first().click();
  await page.getByRole('searchbox', { name: 'Select box' }).fill('8009');
  await page.getByRole('option', { name: 'Competitive wallboard' }).locator('span').first().click();
  await page.getByText('Competitive wallboard').click();
  await page.getByLabel('Select box activate').nth(1).click();
  await page.getByRole('searchbox', { name: 'Select box' }).click();
  await page.getByRole('searchbox', { name: 'Select box' }).fill('8009');
  await page.getByRole('option', { name: 'Competitive wallboard' }).locator('span').first().click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('link', { name: 'A', exact: true }).click()
  await page.locator('a').filter({ hasText: 'Logout' }).click();
});

test('3CX Web Client To check  Queue Login For DND Auto Logout', async ({ page }) => {
  
  console.log('Before navigating to the page');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/people');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/login');
  console.log('After navigating to the page');

  // Login Performing actions on the page
  await page.getByPlaceholder('Extension number').click();
  await page.getByPlaceholder('Extension number').fill('1002');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('S');
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('Shivaay@1042');
  await page.getByRole('button', { name: 'Login' }).click();

  // Check the Queue Extension Login or Logout 
  await page.getByRole('link', { name: 'Panel' }).click();
  await page.getByRole('button', { name: 'All' }).click();
  await page.getByRole('link', { name: 'Competitive wallboard' }).click();
  await page.locator('#layout-type2-content').getByText('Tiwari84 jyoti ranjan').click();
  await page.locator('a').filter({ hasText: 'Logged out' }).click();
  await page.waitForTimeout(7000);
  await page.getByRole('link', { name: 'Panel' }).click();
  await page.getByRole('img', { name: '1002' }).click();
  await page.locator('#menuLogout').click();
});

test('3CX Web Client To check agent statuse For DND Auto Logout', async ({ page }) => {

  console.log('Before navigating to the page');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/people');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/login');
  console.log('After navigating to the page');

  // Login Performing actions on the page
  await page.getByPlaceholder('Extension number').click();
  await page.getByPlaceholder('Extension number').fill('1002');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('S');
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('Shivaay@1042');
  await page.getByRole('button', { name: 'Login' }).click();

  // Check the Statuse of agent and Queue Logout
  await page.waitForTimeout(7000);
  await page.getByRole('img', { name: '1002' }).click();
  await page.locator('people-list').click();
  await page.getByRole('link', { name: 'Panel' }).click();
  await page.getByRole('button', { name: 'All' }).click();
  await page.getByRole('link', { name: 'Competitive wallboard' }).click();
  await page.waitForTimeout(7000);
  await page.getByRole('img', { name: '1002' }).click();
  await page.locator('#menuLogout').click();
}); 

test('3CX Web Client Change statuse From DND to Available Auto Logout', async ({ page }) => {

  console.log('Before navigating to the page');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/people');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/login');
  console.log('After navigating to the page');
   
  // Login Performing actions on the page
  await page.getByPlaceholder('Extension number').click();
  await page.getByPlaceholder('Extension number').fill('1002');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('S');
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('Shivaay@1042');
  await page.getByRole('button', { name: 'Login' }).click();

  // Change the Statuse of Agent DND to Avaiable
  await page.getByRole('img', { name: '1002' }).click();
  await page.waitForTimeout(7000);
  await page.getByText('Available - Available').click();
  await page.getByRole('link', { name: 'Panel' }).click();
  await page.getByRole('button', { name: 'All' }).click();
  await page.getByRole('link', { name: 'Competitive wallboard' }).click();
  await page.waitForTimeout(7000);
  await page.getByRole('button', { name: 'Competitive wallboard' }).click();
  await page.getByRole('link', { name: 'power dialer' }).click();
  await page.waitForTimeout(7000);
  await page.getByRole('button', { name: 'power dialer' }).click();
  await page.getByRole('link', { name: 'OCM Test' }).click();
  await page.waitForTimeout(7000);
  await page.getByRole('img', { name: '1002' }).click();
  await page.locator('#menuLogout').click();
});

test('Auto Logout setting Change and select the Logout from selected Queue IVR Test', async ({ page }) => {
  
  console.log('Before navigating to the page');
  await page.goto('http://localhost:6150/Login');
  console.log('After navigating to the page');

  // Login Performing actions on the page
  await page.getByLabel('Extension').click();
  await page.waitForTimeout(7000);
  await page.getByLabel('Extension').fill('1002');
  await page.getByLabel('Pin').click();
  await page.getByLabel('Pin').fill('1042');
  await page.getByRole('button', { name: 'Login' }).click();

  // Select the radio button
  await page.getByRole('radio', { name: 'Logout' }).check();
  await page.getByLabel('Logout from Selected Queues').check();
  await page.getByRole('button', { name: 'Logout' }).click();
});

test('3CX Setting IVR and Inbound rule For Auto logout selected Queue', async ({ page }) => {

  console.log('Before navigating to the page');
  await page.goto('https://voiptoolsindia.3cx.us:5001/');
  await page.goto('https://voiptoolsindia.3cx.us:5001/#/loading');
  await page.goto('https://voiptoolsindia.3cx.us:5001/#/login');
  console.log('After navigating to the page');

  // Login Performing actions on the page
  await page.getByPlaceholder('User name or extension number').click();
  await page.getByPlaceholder('User name or extension number').fill('admin');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('{`G+3X%LbX)a@:+F!5');
  await page.getByPlaceholder('Password').click();
  await page.getByRole('button', { name: 'Login' }).click();

  // 3CX Setting Digital Receptionist Selected Queue in Auto Logout
  await page.getByRole('link', { name: ' Digital Receptionists' }).click();
  await page.getByRole('button', { name: '8024 saranya Test Standard' }).click();
  await page.waitForTimeout(7000);
  await page.getByRole('row', { name: '2 Select box activate Select' }).getByRole('combobox').click();
  await page.waitForTimeout(7000);
  await page.getByRole('row', { name: '2 Select box activate Select' }).getByRole('combobox').selectOption('string:TypeOfIVRForward.Queue');
  await page.getByRole('row', { name: '2 Select box activate Select' }).getByLabel('Select box activate').click();
  await page.getByRole('searchbox', { name: 'Select box' }).click();
  await page.getByRole('searchbox', { name: 'Select box' }).fill('8009');
  await page.getByRole('option', { name: 'Competitive wallboard' }).locator('span').first().click();
  await page.getByRole('row', { name: '3 Select box activate Select' }).getByRole('combobox').click();
  await page.waitForTimeout(7000);
  await page.getByRole('row', { name: '3 Select box activate Select' }).getByRole('combobox').selectOption('string:TypeOfIVRForward.Queue');
  await page.getByRole('row', { name: '3 Select box activate Select' }).getByLabel('Select box activate').click();
  await page.getByRole('searchbox', { name: 'Select box' }).fill('8010');
  await page.getByRole('option', { name: 'power dialer' }).locator('span').first().click();
  await page.getByRole('row', { name: '4' }).getByRole('combobox').selectOption('string:TypeOfIVRForward.Queue');
  await page.getByRole('row', { name: '4 Select box activate Select' }).getByLabel('Select box activate').click();
  await page.getByRole('searchbox', { name: 'Select box' }).fill('8011');
  await page.getByRole('option', { name: 'OCM Test' }).locator('span').first().click();
  await page.getByRole('button', { name: 'OK' }).click();

  // 3CX Setting Inbound rule for digital Receptionist Selected Queue
  await page.waitForSelector
  await page.waitForTimeout(7000);
  await page.getByRole('link', { name: ' Inbound Rules' }).click();
  await page.getByRole('button', { name: 'DID 9203068540 Telnyx LLC *' }).click();
  await page.getByLabel('Select box activate').first().click();
  await page.getByRole('searchbox', { name: 'Select box' }).fill('8024');
  await page.getByRole('option', { name: 'IVR 8024 saranya Test' }).locator('span').first().click();
  await page.getByLabel('Select box activate').nth(1).click();
  await page.getByRole('searchbox', { name: 'Select box' }).fill('8024');
  await page.getByRole('option', { name: 'IVR 8024 saranya Test' }).locator('span').first().click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('link', { name: 'A', exact: true }).click();
  await page.locator('a').filter({ hasText: 'Logout' }).click();
});

test('3CX Web Client To check Queue Login IVR selected Queue For Auto Logout', async ({ page }) => {
  
  console.log('Before navigating to the page');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/people');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/login');
  console.log('After navigating to the page');

  // Login Performing actions on the page
  await page.getByPlaceholder('Extension number').click();
  await page.getByPlaceholder('Extension number').fill('1002');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('S');
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('Shivaay@1042');
  await page.getByRole('button', { name: 'Login' }).click();

  // Check the Queue Extension Login or Logout 
  await page.getByRole('link', { name: 'Panel' }).click();
  await page.getByRole('button', { name: 'All' }).click();
  await page.getByRole('link', { name: 'Competitive wallboard' }).click();
  await page.locator('#layout-type2-content').getByText('Tiwari84 jyoti ranjan').click();
  await page.locator('a').filter({ hasText: 'Logged out' }).click();
  await page.waitForTimeout(7000);
  await page.getByRole('link', { name: 'Panel' }).click();
  await page.getByRole('button', { name: 'All' }).click();
  await page.getByRole('link', { name: 'power dialer' }).click();
  await page.locator('#layout-type2-content').getByText('Tiwari84 jyoti ranjan').click();
  await page.locator('a').filter({ hasText: 'Logged out' }).click();
  await page.waitForTimeout(7000);
  await page.getByRole('link', { name: 'Panel' }).click();
  await page.getByRole('button', { name: 'All' }).click();
  await page.getByRole('link', { name: 'OCM Test' }).click();
  await page.locator('#layout-type2-content').getByText('Tiwari84 jyoti ranjan').click();
  await page.locator('a').filter({ hasText: 'Logged out' }).click();
  await page.getByRole('img', { name: '1002' }).click();
  await page.locator('#menuLogout').click();
}); 

test('3CX Calling from Outside 3CX server for Auto Logout IVR selected Queue in auto logout', async ({ page }) => {

  console.log('Before navigating to the page');
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
  
  // Performing the Missied Call for IVR selected Queue Auto logout
  await page.getByRole('button', { name: 'Dialer' }).click();
  await page.getByPlaceholder('Enter name or number...').click();
  await page.getByPlaceholder('Enter name or number...').fill('6085354210');
  await page.locator('#btnCall').click();
  await page.getByRole('button', { name: 'Keypad' }).click();
  await page.waitForTimeout(7000);
  await page.getByRole('button', { name: 'ABC' }).click();
  await page.waitForTimeout(120000);
  await page.locator('#btnKeyPadDecline').click();
});

test('3CX Web Client To Check IVR selected  all Queue status Logout for Auto Logout', async ({ page }) => {

  console.log('Before navigating to the page');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/people');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/login');
  console.log('After navigating to the page');

  // Login Performing actions on the page
  await page.getByPlaceholder('Extension number').click();
  await page.getByPlaceholder('Extension number').fill('1002');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('S');
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('Shivaay@1042');
  await page.getByRole('button', { name: 'Login' }).click();

  // Check the Queue Extension Logout 
  await page.getByRole('link', { name: 'Panel' }).click();
  await page.getByRole('button', { name: 'All' }).click();
  await page.getByRole('link', { name: 'Competitive wallboard' }).click();
  await page.waitForTimeout(7000);
  await page.getByRole('link', { name: 'Panel' }).click();
  await page.getByRole('button', { name: 'All' }).click();
  await page.getByRole('link', { name: 'power dialer' }).click();
  await page.waitForTimeout(7000);
  await page.getByRole('link', { name: 'Panel' }).click();
  await page.getByRole('button', { name: 'All' }).click();
  await page.getByRole('link', { name: 'OCM Test' }).click();
  await page.waitForTimeout(7000);
  await page.getByRole('img', { name: '1002' }).click();
  await page.locator('#menuLogout').click();
});

test('3CX Setting IVR and Inbound rule For Auto logout not selected Queue', async ({ page }) => {

  console.log('Before navigating to the page');
  await page.goto('https://voiptoolsindia.3cx.us:5001/');
  await page.goto('https://voiptoolsindia.3cx.us:5001/#/loading');
  await page.goto('https://voiptoolsindia.3cx.us:5001/#/login');
  console.log('After navigating to the page');

  // Login Performing actions on the page
  await page.getByPlaceholder('User name or extension number').click();
  await page.getByPlaceholder('User name or extension number').fill('admin');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('{`G+3X%LbX)a@:+F!5');
  await page.getByPlaceholder('Password').click();
  await page.getByRole('button', { name: 'Login' }).click();

  // 3CX Setting Digital Receptionist not Selected Queue in Auto Logout
  await page.getByRole('link', { name: ' Digital Receptionists' }).click();
  await page.getByRole('button', { name: '8024 saranya Test Standard' }).click();
  await page.waitForTimeout(7000);
  await page.getByRole('row', { name: '2 Select box activate Select' }).getByRole('combobox').selectOption('string:TypeOfIVRForward.Queue');
  await page.getByRole('row', { name: '2 Select box activate Select' }).getByLabel('Select box activate').click();
  await page.getByRole('searchbox', { name: 'Select box' }).click();
  await page.getByRole('searchbox', { name: 'Select box' }).fill('8000');
  await page.getByRole('option', { name: 'Test Wallboard' }).locator('span').first().click()
  await page.getByRole('row', { name: '3 Select box activate Select' }).getByRole('combobox').click();
  await page.waitForTimeout(7000);
  await page.getByRole('row', { name: '3 Select box activate Select' }).getByRole('combobox').selectOption('string:TypeOfIVRForward.Queue');
  await page.getByRole('row', { name: '3 Select box activate Select' }).getByLabel('Select box activate').click();
  await page.getByRole('searchbox', { name: 'Select box' }).fill('8001');
  await page.getByRole('option', { name: 'Autocallback' }).locator('span').first().click();
  await page.getByRole('row', { name: '4 Select box activate Select' }).getByRole('combobox').click();
  await page.waitForTimeout(7000);
  await page.getByRole('row', { name: '4 Select box activate Select' }).getByRole('combobox').selectOption('string:TypeOfIVRForward.Queue');
  await page.getByRole('row', { name: '4 Select box activate Select' }).getByLabel('Select box activate').click();
  await page.getByRole('searchbox', { name: 'Select box' }).fill('8002');
  await page.getByRole('option', { name: 'Autologout' }).locator('span').first().click();

  // 3CX Setting Inbound rule for digital Receptionist Not Selected Queue
  await page.waitForSelector
  await page.waitForTimeout(7000);
  await page.getByRole('link', { name: ' Inbound Rules' }).click();
  await page.getByRole('button', { name: 'DID 9203068540 Telnyx LLC *' }).click();
  await page.getByLabel('Select box activate').first().click();
  await page.getByRole('searchbox', { name: 'Select box' }).fill('8024');
  await page.getByRole('option', { name: 'IVR 8024 saranya Test' }).locator('span').first().click();
  await page.getByLabel('Select box activate').nth(1).click();
  await page.getByRole('searchbox', { name: 'Select box' }).fill('8024');
  await page.getByRole('option', { name: 'IVR 8024 saranya Test' }).locator('span').first().click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('link', { name: 'A', exact: true }).click();
  await page.locator('a').filter({ hasText: 'Logout' }).click();
});

test('3CX Web Client To check Queue Login IVR Not selected Queue For Auto Logout', async ({ page }) => {
  
  console.log('Before navigating to the page');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/people');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/login');
  console.log('After navigating to the page');

  // Login Performing actions on the page
  await page.getByPlaceholder('Extension number').click();
  await page.getByPlaceholder('Extension number').fill('1002');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('S');
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('Shivaay@1042');
  await page.getByRole('button', { name: 'Login' }).click();

  // Check the Queue Extension Login or Logout 
  await page.getByRole('link', { name: 'Panel' }).click();
  await page.getByRole('button', { name: 'All' }).click();
  await page.getByRole('link', { name: 'Test Wallboard' }).click();
  await page.locator('#layout-type2-content').getByText('Tiwari84 jyoti ranjan').click();
  await page.locator('a').filter({ hasText: 'Logged out' }).click();
  await page.waitForTimeout(7000);
  await page.getByRole('link', { name: 'Panel' }).click();
  await page.getByRole('button', { name: 'All' }).click();
  await page.getByRole('link', { name: 'Autocallback' }).click();
  await page.locator('#layout-type2-content').getByText('Tiwari84 jyoti ranjan').click();
  await page.locator('a').filter({ hasText: 'Logged out' }).click();
  await page.waitForTimeout(7000);
  await page.getByRole('link', { name: 'Panel' }).click();
  await page.getByRole('button', { name: 'All' }).click();
  await page.getByRole('link', { name: 'Autologout' }).click();
  await page.locator('#layout-type2-content').getByText('Tiwari84 jyoti ranjan').click();
  await page.locator('a').filter({ hasText: 'Logged out' }).click();
  await page.getByRole('img', { name: '1002' }).click();
  await page.locator('#menuLogout').click();
});  

 test('3CX Calling from Outside 3CX server for Auto Logout IVR not selected Queue in auto logout', async ({ page }) => {
  
  console.log('Before navigating to the page');
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
  
  // Performing the Missied Call for IVR selected Queue Auto logout
  await page.getByRole('button', { name: 'Dialer' }).click();
  await page.getByPlaceholder('Enter name or number...').click();
  await page.getByPlaceholder('Enter name or number...').fill('6085354210');
  await page.locator('#btnCall').click();
  await page.getByRole('button', { name: 'Keypad' }).click();
  await page.waitForTimeout(7000);
  await page.getByRole('button', { name: 'ABC' }).click();
  await page.waitForTimeout(120000);
  await page.locator('#btnKeyPadDecline').click();
});

test('3CX Web Client To Check IVR Not selected  all Queue status Logout for Auto Logout', async ({ page }) => {

  console.log('Before navigating to the page');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/people');
  await page.goto('https://voiptoolsindia.3cx.us:5001/webclient/#/login');
  console.log('After navigating to the page');
  
  // Login Performing actions on the page
  await page.getByPlaceholder('Extension number').click();
  await page.getByPlaceholder('Extension number').fill('1002');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('S');
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('Shivaay@1042');
  await page.getByRole('button', { name: 'Login' }).click();
  
  // Check the Queue Extension Logout 
  await page.getByRole('link', { name: 'Panel' }).click();
  await page.getByRole('button', { name: 'All' }).click();
  await page.getByRole('link', { name: 'Test Wallboard' }).click();
  await page.waitForTimeout(7000);
  await page.getByRole('link', { name: 'Panel' }).click();
  await page.getByRole('button', { name: 'All' }).click();
  await page.getByRole('link', { name: 'Autocallback' }).click();
  await page.waitForTimeout(7000);
  await page.getByRole('link', { name: 'Panel' }).click();
  await page.getByRole('button', { name: 'All' }).click();
  await page.getByRole('link', { name: 'Autologout' }).click();
  await page.waitForTimeout(7000);
  await page.getByRole('img', { name: '1002' }).click();
  await page.locator('#menuLogout').click();
});
test('Check the Auto Logout Remember Me button and About Tab', async ({ page }) => {
  
  // Open Navigating to a URL
  console.log('Before navigating to the page');
  await page.goto('http://localhost:6150/Login');
  console.log('After navigating to the page');
  
  // Login Performing actions on the page 
  page.waitForNavigation
  await page.getByLabel('Extension').click();
  await page.waitForTimeout(7000);
  await page.getByLabel('Extension').fill('1002');
  await page.getByLabel('Pin').click();
  await page.getByLabel('Pin').fill('1042');
  await page.waitForTimeout(7000);
  await page.getByLabel('Icon Button').click();
  await page.waitForTimeout(7000);
  await page.getByLabel('Remember Me').check();
  await page.waitForTimeout(7000);
  await page.getByRole('row', { name: '3CX Auto Logout' }).getByRole('button').click();
  await page.waitForTimeout(7000);
  await page.getByLabel('Close').click();
  await page.getByRole('row', { name: '3CX Auto Logout' }).getByRole('button').click();
  await page.waitForTimeout(7000);
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Login' }).click();
   
  // After Login Auto Logout check about Tab 
  await page.waitForTimeout(7000);
  await page.getByRole('row', { name: '3CX Auto Logout 1002 jyoti' }).getByRole('button').nth(2).click();
  await page.waitForTimeout(7000);
  await page.getByRole('button', { name: 'OK' }).click();
  await page.waitForTimeout(7000);
  await page.getByRole('row', { name: '3CX Auto Logout 1002 jyoti' }).getByRole('button').nth(2).click();
  await page.waitForTimeout(7000);
  await page.getByLabel('Close').click();
  await page.getByRole('button', { name: 'Logout' }).click();
});

test('Check the Auto Logout in Side Panel ', async ({ page }) => {

  // Open Navigating to a URL
  console.log('Before navigating to the page');
  await page.goto('http://localhost:8004/');
  console.log('After navigating to the page');
  
  // Open side Panel and check Auto logout application 
  await page.locator('#openbtn i').click();
  await page.getByText('New Tab').click();
  await page.getByRole('link', { name: ' Auto Logout' }).click();
  await page.waitForTimeout(7000);
  await page.frameLocator('iframe[name="toolFrame"]').getByLabel('Extension').click();
  await page.frameLocator('iframe[name="toolFrame"]').getByLabel('Extension').fill('1002');
  await page.frameLocator('iframe[name="toolFrame"]').getByLabel('Pin').click();
  await page.frameLocator('iframe[name="toolFrame"]').getByLabel('Pin').fill('1042');
  await page.frameLocator('iframe[name="toolFrame"]').getByLabel('Remember Me').check();
  await page.frameLocator('iframe[name="toolFrame"]').getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(7000);
  await page.frameLocator('iframe[name="toolFrame"]').getByRole('link', { name: 'Email' }).click();
  await page.waitForTimeout(7000);
  await page.frameLocator('iframe[name="toolFrame"]').getByRole('link', { name: 'License' }).click();
  await page.waitForTimeout(7000);
  await page.frameLocator('iframe[name="toolFrame"]').getByRole('cell', { name: 'Logout', exact: true }).click();
  await page.waitForTimeout(7000);
  await page.frameLocator('iframe[name="toolFrame"]').getByRole('button', { name: 'Logout' }).click();
  await page.waitForTimeout(7000);
  
  // Auto Logout application check side panel New tab
  await page.getByText('Same Tab').click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: ' Auto Logout' }).click();
  const page1 = await page1Promise;
  await page.waitForTimeout(7000);
  await page1.getByLabel('Extension').click();
  await page1.getByLabel('Extension').fill('1002');
  await page1.getByLabel('Pin').click();
  await page1.getByLabel('Pin').fill('1042');
  await page1.getByLabel('Remember Me').check();
  await page1.getByRole('button', { name: 'Login' }).click();
  await page1.getByRole('button', { name: 'Logout' }).click();
});


  

