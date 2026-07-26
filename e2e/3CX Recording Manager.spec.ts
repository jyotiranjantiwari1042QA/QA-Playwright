import { test, expect } from '@playwright/test';

test('test', async ({page}) => {

// Navigate to the Login page 
    await page.goto('http://13.235.85.154:5500/Login', { waitUntil: 'load' });
// Fill login page with not valid credentials and click on login button
    await page.getByRole('textbox', { name: 'extension' }).fill('1005');
    await page.locator('input[type="password"]').fill('Shivaay@104');
    await page.getByRole('checkbox', { name: 'Remember Me' }).check();
    await page.getByRole('button', { name: /login/i }).click();
    const errorBanner = page.getByText(/Login Unsuccessful\.?/i);
    await page.waitForSelector('text=Login Unsuccessful', { state: 'visible', timeout: 10000 });    
    await expect(errorBanner).toHaveText(/Login Unsuccessful\.?/i);

// Fill login page with valid credentials and click on login button
   await page.getByRole('textbox', { name: 'extension' }).click();
   await page.getByRole('textbox', { name: 'extension' }).fill('1005');
   await page.locator('input[type="password"]').click();
   await page.locator('input[type="password"]').fill('Shivaay@1042');
   await page.getByRole('checkbox', { name: 'Remember Me' }).check();
   await page.getByRole('button', { name: /login/i }).click();
   await page.waitForLoadState('networkidle');


// ✅ Optional — only click if popup appears, skip if not
try {
  // Wait for popup
  await page.getByText(/What(?:'|’)s New in Version 20\.0\.14\.0/i).waitFor({
    state: 'visible',
    timeout: 5000
  });

  // ✅ If popup appears — check checkbox and click Got it!
  await page.getByRole('checkbox', { name: /Don't show this again for/i }).check();
  await page.getByRole('button', { name: /Got it!/i }).click();
  console.log('✅ Popup appeared — checkbox checked and closed');

} catch {
  // ✅ If popup not found — go directly to Recordings
  console.log('ℹ️ Popup not found — skipping to Recordings');
}
// ✅ Always open Recordings page regardless
const recordingsLink = page.locator('a, button').filter({ hasText: /recordings/i }).first();
try {
  await recordingsLink.waitFor({ state: 'visible', timeout: 20000 });
  await recordingsLink.scrollIntoViewIfNeeded();
  await recordingsLink.click();
  await page.waitForURL(/Recordings/i, { timeout: 15000 });
  console.log('✅ Recordings page —', page.url());
} catch { console.log('❌ Recordings not found'); }

// Import
try {
  await page.getByRole('link', { name: /Import/i }).click();
  await page.waitForURL(/Import/i, { timeout: 15000 });
  console.log('✅ Import page —', page.url());
} catch { console.log('❌ Import not found'); }

// Reports
try {
  await page.getByRole('link', { name: /Reports/i }).click();
  await page.waitForURL(/Reports/i, { timeout: 15000 });
  console.log('✅ Reports page —', page.url());
} catch { console.log('❌ Reports not found'); }

// Logs
try {
  await page.getByRole('link', { name: /Logs/i }).click();
  await page.waitForURL(/Logs/i, { timeout: 15000 });
  console.log('✅ Logs page —', page.url());
} catch { console.log('❌ Logs not found'); }

// Audit
try {
  await page.getByRole('link', { name: /Audit/i }).click();
  await page.waitForURL(/Audit/i, { timeout: 15000 });
  console.log('✅ Audit page —', page.url());
} catch { console.log('❌ Audit not found'); }

// Settings
try {
  await page.getByText('Settings').scrollIntoViewIfNeeded();
  await page.getByText('Settings').click();
  await page.waitForURL(/Settings/i, { timeout: 15000 });
  console.log('✅ Settings page —', page.url());
} catch { console.log('❌ Settings not found'); }

// ─── NAVIGATE TO IMPORT ───────────────────────────────
  await recordingsLink.waitFor({ state: 'visible', timeout: 20000 });
  await recordingsLink.scrollIntoViewIfNeeded();
  await recordingsLink.click();
  await expect(page).toHaveURL(/Recordings/i);

  await page.getByRole('link', { name: /Import/i }).click();
  await expect(page).toHaveURL(/Import/i);
  
// ─── EXPAND PANEL ─────────────────────────────────────
  await page.locator('.mud-expand-panel-header').first().click();

// ─── ADVANCED SETTINGS ────────────────────────────────
  await page.getByRole('button', { name: 'Advanced Settings' }).waitFor({ state: 'visible' });
  await page.getByRole('button', { name: 'Advanced Settings' }).click();

// ─── UNCHECK BOTH CHECKBOXES ──────────────────────────
  await page.getByRole('checkbox', { name: /All extensions or Range/i }).uncheck();
  await page.getByRole('checkbox', { name: /Import starting from last/i }).uncheck();

// ─── VERIFY UNCHECKED ─────────────────────────────────
  await expect(
    page.getByRole('checkbox', { name: /All extensions or Range/i })
  ).not.toBeChecked();
  await expect(
    page.getByRole('checkbox', { name: /Import starting from last/i })
  ).not.toBeChecked();

// ─── CLICK IMPORT ────────────────────────
  const importButton = page.getByRole('button', { name: 'Import' });
  const stopButton = page.getByRole('button', { name: /Stop/i });
  await importButton.click();
  await expect(stopButton).toBeVisible({ timeout: 10000 });
  console.log('✅ Import started, syncing...');

// ─── LOCATE TOTAL & PERCENTAGE (adjust based on your actual DOM) ────────────────────────
  const totalLocator = page.getByText(/Total:\s*\d+/);
  const percentageLocator = page.getByText(/(\d{1,3}\s*%)/).first();

// ─── WAIT FOR TOTAL TO SHOW UP FIRST ────────────────────────
  await expect(totalLocator).toBeVisible({ timeout: 30000 });
  const totalText = await totalLocator.textContent();
  console.log(`📊 ${totalText}`);

// ─── POLL PERCENTAGE INSTEAD OF SINGLE toHaveText (more resilient to re-renders) ────────────────────────
 await expect
  .poll(
    async () => {
      const pctText = (await percentageLocator.textContent())?.trim();
      console.log(`⏳ Progress: ${pctText}`);
      return pctText;
    },
    {
      timeout: 300000,
      intervals: [1000],
    }
  )
  .toMatch(/100\s*%/);

 console.log("✅ Sync reached 100%");

// Validate success popup appears
  await expect(page.getByText('Success')).toBeVisible({ timeout: 10000 });
  await expect(page.getByText('Import Completed Successfully')).toBeVisible();
  
// Click OK and confirm popup closes
  await page.getByRole('button', { name: 'OK' }).click();
  await expect(page.getByText('Import Completed Successfully')).not.toBeVisible();

// Fallback: at least confirm it's the current page via URL
  await expect(page).toHaveURL(/import/i);
  await expect(page.getByRole('button', { name: 'Import' })).toBeVisible();
  await expect(page.getByText('Extension:')).toBeVisible();
  await expect(page.getByText('File:')).toBeVisible();
  await expect(page.getByText('Start Time:')).toBeVisible();
  await expect(page.getByText('Duration:')).toBeVisible();
  await expect(page.getByText('Count:')).toBeVisible();
  await expect(page.getByText('Total:')).toBeVisible();
  await expect(page.getByText('Percent:')).toBeVisible();
  await expect(page.getByText('Est.Finish:')).toBeVisible();

  // Default counters before an import is started
  await expect(page.getByText('Count:').locator('..')).toContainText('0');
  await expect(page.getByText('Percent:').locator('..')).toContainText('0%');

  await expect(page.getByText('Advanced Settings')).toBeVisible();
  await expect(page.getByText('Import Restrictions')).toBeVisible();

  const allExtensionsCheckbox = page.getByRole('checkbox', { name: /All extensions or Range/i });
  const lastImportDateCheckbox = page.getByRole('checkbox', { name: /Import starting from last import date/i });
  const embeddedDateCheckbox = page.getByRole('checkbox', { name: /Use the recording date embed(d)?ed in the file name/i });

  await expect(allExtensionsCheckbox).toBeVisible();
  await expect(lastImportDateCheckbox).toBeVisible();
  await expect(embeddedDateCheckbox).toBeVisible();
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByText('Login Unsuccessful.').click();
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('alert').locator('svg').click();








});
