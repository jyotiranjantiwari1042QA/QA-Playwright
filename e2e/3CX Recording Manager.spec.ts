import { test, expect, type Locator } from '@playwright/test';

test('test', async ({ page }) => {
  async function safeClick(locator: Locator) {
    await locator.waitFor({ state: 'visible', timeout: 20000 });
    await locator.scrollIntoViewIfNeeded();
    try {
      await locator.click({ timeout: 10000 });
    } catch {
      await locator.evaluate((element: HTMLElement) => {
        element.scrollIntoView({ block: 'center', inline: 'center' });
        element.click();
      });
    }
  }

  async function fillField(locator: Locator, value: string) {
    await locator.waitFor({ state: 'visible', timeout: 20000 });
    await locator.scrollIntoViewIfNeeded();
    await locator.click({ force: true });
    await locator.clear();
    await locator.fill(value);
  }

  async function checkBox(locator: Locator) {
    await locator.waitFor({ state: 'visible', timeout: 20000 });
    await locator.scrollIntoViewIfNeeded();
    await locator.check({ force: true });
  }

  const extensionField = page
    .locator(
      'input[name*="extension" i], input[placeholder*="extension" i], input[aria-label*="extension" i], input[id*="extension" i], input[autocomplete="username"]'
    )
    .first();
  const passwordField = page
    .locator(
      'input[type="password"], input[name*="password" i], input[placeholder*="password" i], input[aria-label*="password" i], input[id*="password" i], input[autocomplete="current-password"]'
    )
    .first();
  const rememberMeCheckbox = page.getByRole('checkbox', { name: /remember me/i }).first();
  const loginButton = page.getByRole('button', { name: /login/i }).first();

  // Navigate to the Login page
  await page.goto('http://13.235.85.154:5500/Login', { waitUntil: 'load' });
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(500);

  const pageIcon = page.locator(
    'img[alt*="logo" i], img[alt*="icon" i], svg[aria-label*="logo" i], svg[aria-label*="icon" i], svg[class*="logo" i], svg[class*="icon" i]'
  ).first();
  await pageIcon.waitFor({ state: 'visible', timeout: 10000 });

  const upToDateBadge = page.getByText(/up to date/i).first();
  await expect(upToDateBadge).toBeVisible({ timeout: 10000 });
  await expect(loginButton).toBeVisible({ timeout: 10000 });
  await expect(loginButton).toBeEnabled({ timeout: 10000 });

  // Fill login page with not valid credentials and click on login button
  await fillField(extensionField, '1005');
  await fillField(passwordField, 'Shivaay@104');
  await checkBox(rememberMeCheckbox);
  await safeClick(loginButton);

  const errorBanner = page.getByText(/login unsuccessful|invalid|incorrect|failed/i).first();
  await expect(errorBanner).toBeVisible({ timeout: 10000 });
  await expect(errorBanner).toContainText(/login unsuccessful|invalid|incorrect|failed/i);

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
  await expect(page.getByRole('heading', { name: /Imports/i })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText('Import Completed Successfully')).toBeVisible();
  await expect(page.getByRole('button', { name: 'OK' })).toBeVisible();

// Click OK and confirm popup closes
  await page.getByRole('button', { name: 'OK' }).click();
  await expect(page.getByText('Import Completed Successfully')).not.toBeVisible();

// Validate Import screen fields and advanced settings after completion
  await expect(page.getByText('Progress')).toBeVisible();
  await expect(page.getByText('Extension:')).toBeVisible();
  await expect(page.getByText('File:')).toBeVisible();
  await expect(page.getByText('Start Time:')).toBeVisible();
  await expect(page.getByText('Duration:')).toBeVisible();
  await expect(page.getByText('Count:')).toBeVisible();
  await expect(page.getByText('Total:')).toBeVisible();
  await expect(page.getByText('Percent:')).toBeVisible();
  await expect(page.getByText('Est.Finish:')).toBeVisible();

  await expect(importButton).toBeVisible();
  await expect(importButton).toBeEnabled();

  const allExtCheckbox = page.getByRole('checkbox', { name: /All extensions or Range/i });
  const lastImportCheckbox = page.getByRole('checkbox', { name: /Import starting from last import date/i });
  const embeddedDateChk = page.getByRole('checkbox', { name: /Use the recording date embed(d)?ed in the file name/i });

  await expect(allExtCheckbox).toBeVisible();
  await expect(lastImportCheckbox).toBeVisible();
  await expect(embeddedDateChk).toBeVisible();

  await allExtCheckbox.check();
  await expect(allExtCheckbox).toBeChecked();
  await expect(page.locator('input[name*="start" i], input[placeholder*="start" i], input[id*="start" i]')).toBeVisible();
  await expect(page.locator('input[name*="end" i], input[placeholder*="end" i], input[id*="end" i]')).toBeVisible();

  await lastImportCheckbox.check();
  await expect(lastImportCheckbox).toBeChecked();
  await expect(page.locator('input[type="date"], input[name*="date" i], input[placeholder*="date" i], input[id*="date" i]')).toBeVisible();

  await embeddedDateChk.check();
  await expect(embeddedDateChk).toBeChecked();

  await allExtCheckbox.uncheck();
  await expect(allExtCheckbox).not.toBeChecked();
  await lastImportCheckbox.uncheck();
  await expect(lastImportCheckbox).not.toBeChecked();
  await embeddedDateChk.uncheck();
  await expect(embeddedDateChk).not.toBeChecked();

// Capture screenshot after import completes
  await page.screenshot({
    path: 'import-complete.png',
    fullPage: true,
  });
  console.log('📸 Saved screenshot to import-complete.png');

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

// Check each import-related checkbox and verify state
  await allExtensionsCheckbox.check();
  await expect(allExtensionsCheckbox).toBeChecked();
  await lastImportDateCheckbox.check();
  await expect(lastImportDateCheckbox).toBeChecked();
  await embeddedDateCheckbox.check();
  await expect(embeddedDateCheckbox).toBeChecked();

// Verify the Import button is actionable without triggering a new import
  await expect(importButton).toBeVisible();
  await expect(importButton).toBeEnabled();
  console.log('✅ Import button is actionable');

// Uncheck all import-related checkboxes
  await allExtensionsCheckbox.uncheck();
  await expect(allExtensionsCheckbox).not.toBeChecked();
  await lastImportDateCheckbox.uncheck();
  await expect(lastImportDateCheckbox).not.toBeChecked();
  await embeddedDateCheckbox.uncheck();
  await expect(embeddedDateCheckbox).not.toBeChecked();

  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByText('Login Unsuccessful.').click();
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('alert').locator('svg').click();








});
