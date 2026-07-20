const { test, expect } = require('@playwright/test');

test('Test Title', async ({ page }) => {
  // Test code goes here
  
  
  // Open Navigating to a URL
  console.log('Before navigating to the page');
  await page.goto('http://localhost:6150/Login');
  console.log('After navigating to the page');

 
  // Login Performing actions on the page 
  page.waitForNavigation
  await page.getByLabel('Extension').click();
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
  await page.getByRole('button', { name: 'OK' }).click();

  
  // Navigate to Email page
  await page.getByRole('link', { name: 'Email' }).click();
  await page.getByLabel('Email Extension').check();
  await page.locator('.mud-input-slot').first().click();
  await page.locator('.mud-input-slot').first().click();
  await page.locator('.mud-input-slot').first().fill('smtp.office365.com');
  await page.locator('div:nth-child(3) > .mud-input-control-input-container > .mud-input > input').click();
  await page.locator('div:nth-child(3) > .mud-input-control-input-container > .mud-input > input').fill('587');
  await page.locator('div:nth-child(4) > .mud-input-control-input-container > .mud-input > input').click();
  await page.locator('div:nth-child(4) > .mud-input-control-input-container > .mud-input > input').click();
  await page.locator('div:nth-child(4) > .mud-input-control-input-container > .mud-input > input').click
  await page.locator('div:nth-child(4) > .mud-input-control-input-container > .mud-input > input').fill('mail@voiptools.com');
  await page.locator('div:nth-child(5) > .mud-input-control-input-container > .mud-input > input').click();
  await page.locator('div:nth-child(5) > .mud-input-control-input-container > .mud-input > input').press('CapsLock');
  await page.locator('div:nth-child(5) > .mud-input-control-input-container > .mud-input > input').fill('L');
  await page.locator('div:nth-child(5) > .mud-input-control-input-container > .mud-input > input').press('CapsLock');
  await page.locator('div:nth-child(5) > .mud-input-control-input-container > .mud-input > input').fill('Logout from ');
  await page.locator('div:nth-child(5) > .mud-input-control-input-container > .mud-input > input').press('CapsLock');
  await page.locator('div:nth-child(5) > .mud-input-control-input-container > .mud-input > input').fill('Logout from Q');
  await page.locator('div:nth-child(5) > .mud-input-control-input-container > .mud-input > input').press('CapsLock');
  await page.locator('div:nth-child(5) > .mud-input-control-input-container > .mud-input > input').fill('Logout from Queue');
  await page.locator('div:nth-child(6) > .mud-input-control-input-container > .mud-input > input').click();
  await page.locator('div:nth-child(6) > .mud-input-control-input-container > .mud-input > input').press('CapsLock');
  await page.locator('div:nth-child(6) > .mud-input-control-input-container > .mud-input > input').fill('J');
  await page.locator('div:nth-child(6) > .mud-input-control-input-container > .mud-input > input').press('CapsLock');
  await page.locator('div:nth-child(6) > .mud-input-control-input-container > .mud-input > input').fill('jyoti.ranjan@voiptools.com');
  await page.getByLabel('Requires Authentication').check();
  await page.locator('div:nth-child(8) > .mud-input-control-input-container > .mud-input > input').click();
  await page.locator('div:nth-child(8) > .mud-input-control-input-container > .mud-input > input').click();
  await page.locator('div:nth-child(8) > .mud-input-control-input-container > .mud-input > input').fill('mail@voiptools.com');
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('/.r%`oVaCxx*Li4m;,');
  await page.getByLabel('Requires SSL').check();
  await page.getByRole('button', { name: 'Test' }).click();
  await page.getByRole('button', { name: 'OK' }).click();

  // Navigate to Setting page
  await page.getByRole('link', { name: 'Settings' }).click();
  await page.getByRole('textbox').first().fill('2');
  await page.getByLabel('Logout from Selected Queues').check();
  await page.getByRole('row', { name: '8000 Test Wallboard' }).getByLabel('').check();
  await page.getByRole('row', { name: '8001 Autocallback' }).getByLabel('').check();
  await page.getByRole('row', { name: '8002 Autologout' }).getByLabel('').check();
  await page.getByLabel('Open Time Picker').click();
  await page.getByRole('button', { name: 'PM' }).click();
  await page.locator('.mud-picker-stick').first().click();
  await page.locator('div:nth-child(43)').click();
  await page.getByRole('button', { name: 'Logout' }).click();

  
  
  

  


  

  



});

  
