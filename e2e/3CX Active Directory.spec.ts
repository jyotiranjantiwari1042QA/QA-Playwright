import { test, expect } from '@playwright/test';

test('test', async ({ page, request }) => {
  await page.goto('http://localhost:7550/');
  await page.locator('#MainContent_LoginDialog_tbExtension_I').click();
  await page.locator('#MainContent_LoginDialog_tbExtension_I').fill('1001');
  await page.locator('#MainContent_LoginDialog_tbPass').click();
  await page.locator('#MainContent_LoginDialog_tbPass').fill('1042');
  await page.locator('#MainContent_LoginDialog_rememberme').check();
  await page.locator('#MainContent_LoginDialog_btnLogin_CD span').click();
  await page.locator('#MainContent_rpAD_tbDomain_I').click();
  await page.locator('#MainContent_rpAD_tbDomain_I').fill('52.13.190.117');
  await page.locator('#MainContent_rpAD_tbUserName_I').click();
  await page.locator('#MainContent_rpAD_tbUserName_I').fill('administrator')
  await page.locator('#MainContent_rpAD_tbPassword_I').click();
  await page.locator('#MainContent_rpAD_tbPassword_I').fill('Inf0SysHelp');
  await page.locator('#MainContent_rpAD_cbPhone_I').click();
  await page.locator('#MainContent_rpAD_cbPhone_B-1Img').click();
  await page.locator('#MainContent_rpAD_cbArchiveExtension_I').click();
  await page.locator('#MainContent_rpAD_cbArchiveExtension_B-1').click();
  await page.locator('#MainContent_rpAD_cbArchiveExtension_B-1Img').click();
  await page.getByRole('cell', { name: 'Jyoti Ranjan Tiwari240', exact: true }).click();
  await page.locator('#MainContent_rpAD_chkArchiveVoicemails_S_D').click();
  await page.locator('#MainContent_rpAD_chkArchiveRecordings_S_D').click();
  await page.locator('#MainContent_rpAD_chkArchiveRecordings_S_D').click();
  await page.locator('#MainContent_rpAD_chkArchiveRecordings_S_D').click();
  await page.locator('#MainContent_rpAD_btnSaveCreds_CD').click();
  await page.getByRole('cell', { name: 'OK OK' }).locator('span').click();
  await page.locator('#MainContent_rpAD_chkArchiveRecordings_S_D').click();
  await page.locator('#MainContent_rpAD_CRC').getByRole('cell').nth(1).click();
  await page.locator('#MainContent_rpAD_CRC').getByRole('cell').nth(1).click();
  await page.locator('#MainContent_rpAD_chkArchiveRecordings_S_D').click();
  await page.locator('#MainContent_rpSettings_cbAddExtFromAD_S_D').click();
  await page.locator('#MainContent_rpSettings_cbAddExtFromAD_S_D').click();
  
  
  

  
  
});