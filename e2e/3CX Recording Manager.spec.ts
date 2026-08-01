import { test, expect, type Locator, type Page } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://13.235.85.154:5500';
const EXTENSION = process.env.TEST_EXTENSION || '1005';
const PASSWORD = process.env.TEST_PASSWORD || 'Shivaay@1042';

const TIMEOUTS = {
  default: 20_000,
  navigation: 15_000,
  longOperation: 300_000,
} as const;

async function safeClick(locator: Locator) {
  await locator.waitFor({ state: 'visible', timeout: TIMEOUTS.default });
  await locator.scrollIntoViewIfNeeded();
  try {
    await locator.click({ timeout: TIMEOUTS.default });
  } catch {
    await locator.evaluate((el: HTMLElement) => {
      el.scrollIntoView({ block: 'center', inline: 'center' });
      el.click();
    });
  }
}

async function fillField(locator: Locator, value: string) {
  await locator.waitFor({ state: 'visible', timeout: TIMEOUTS.default });
  await locator.scrollIntoViewIfNeeded();
  await locator.click({ force: true });
  await locator.clear();
  await locator.fill(value);
}

async function setCheckbox(locator: Locator, checked: boolean) {
  await locator.waitFor({ state: 'visible', timeout: TIMEOUTS.default });
  await locator.scrollIntoViewIfNeeded();
  await locator.setChecked(checked);
}

async function logout(page: Page) {
  const logoutButton = page.locator('button, a').filter({ hasText: /logout/i }).first();
  await logoutButton.waitFor({ state: 'visible', timeout: TIMEOUTS.default });
  await logoutButton.scrollIntoViewIfNeeded();
  await safeClick(logoutButton);
  await expect(page).toHaveURL(/Login/i, { timeout: TIMEOUTS.navigation });
  console.log('✅ Logged out successfully');
}

async function dismissWhatsNewPopup(page: Page) {
  try {
    await page.getByText(/What(?:'|')s New in Version 20\.0\.14\.0/i).waitFor({
      state: 'visible',
      timeout: 5_000,
    });
    await page.getByRole('checkbox', { name: /Don't show this again for/i }).check();
    await page.getByRole('button', { name: /Got it!/i }).click();
    console.log('✅ "What\'s New" popup dismissed');
  } catch {
    console.log('ℹ️ No "What\'s New" popup');
  }
}

async function navigateToRecordings(page: Page) {
  const recordingsLink = page.locator('a, button').filter({ hasText: /recordings/i }).first();
  await recordingsLink.waitFor({ state: 'visible', timeout: TIMEOUTS.default });
  await recordingsLink.scrollIntoViewIfNeeded();
  await safeClick(recordingsLink);
  await expect(page).toHaveURL(/Recordings/i, { timeout: TIMEOUTS.navigation });
  console.log('✅ Recordings page:', page.url());
}

async function navigateToImport(page: Page) {
  await page.getByRole('link', { name: /Import/i }).click();
  await expect(page).toHaveURL(/Import/i, { timeout: TIMEOUTS.navigation });
  console.log('✅ Import page:', page.url());
}

async function expandAdvancedSettings(page: Page) {
  // Click the expand panel header if collapsed
  const expandHeader = page.locator('[role="button"][aria-expanded="true"], .mud-expand-panel-header').first();
  if (await expandHeader.isVisible({ timeout: 2_000 }).catch(() => false)) {
    const isExpanded = await expandHeader.getAttribute('aria-expanded');
    if (isExpanded === 'false') {
      await safeClick(expandHeader);
    }
  }

  await page.getByRole('button', { name: 'Advanced Settings' }).waitFor({ state: 'visible', timeout: TIMEOUTS.default });
  await page.getByRole('button', { name: 'Advanced Settings' }).click();
}

async function setAdvancedOptions(page: Page, allExtensions: boolean, fromLastImport: boolean) {
  const allExtCheckbox = page.getByRole('checkbox', { name: /All extensions or Range/i });
  const lastImportCheckbox = page.getByRole('checkbox', { name: /Import starting from last/i });

  await expect(allExtCheckbox).toBeVisible({ timeout: TIMEOUTS.default });
  await expect(lastImportCheckbox).toBeVisible({ timeout: TIMEOUTS.default });

  await setCheckbox(allExtCheckbox, allExtensions);
  await setCheckbox(lastImportCheckbox, fromLastImport);

  await expect(allExtCheckbox).toBeChecked({ checked: allExtensions, timeout: TIMEOUTS.default });
  await expect(lastImportCheckbox).toBeChecked({ checked: fromLastImport, timeout: TIMEOUTS.default });
}

async function runImportAndWaitForCompletion(page: Page) {
  const importButton = page.getByRole('button', { name: 'Import' });
  const stopButton = page.getByRole('button', { name: /Stop/i });
  const totalLocator = page.getByText(/Total:\s*\d+/);
  const percentageLocator = page.getByText(/(\d{1,3}\s*%)/).first();

  await safeClick(importButton);
  await expect(stopButton).toBeVisible({ timeout: TIMEOUTS.default });
  console.log('✅ Import started');

  await expect(totalLocator).toBeVisible({ timeout: TIMEOUTS.navigation });
  const totalText = await totalLocator.textContent();
  console.log(`📊 ${totalText?.trim()}`);

  await expect.poll(
    async () => {
      const pctText = (await percentageLocator.textContent())?.trim();
      console.log(`⏳ Progress: ${pctText}`);
      return pctText;
    },
    { timeout: TIMEOUTS.longOperation, intervals: [1_000] }
  ).toMatch(/100\s*%/);

  /**
 * Verifies that import completed successfully
 * @param page - Playwright Page object
 */
async function verifyImportSuccess(page: Page) {
  // Check for success message or completion indicator
  const successIndicator = page.getByText(/import completed|success|completed successfully/i).first();
  await expect(successIndicator).toBeVisible({ timeout: TIMEOUTS.default });
  console.log('✅ Import completed successfully');

  // Optionally check that recordings table has data
  try {
    const recordingsTable = page.locator('table').first();
    await expect(recordingsTable).toBeVisible({ timeout: TIMEOUTS.default });
    console.log('✅ Recordings table visible');
  } catch {
    console.log('ℹ️ No recordings table found');
  }
}
 * @param page - Playwright Page object
 * @param extension - User extension number
 * @param password - User password
 */
async function login(page: Page, extension: string, password: string) {
  console.log(`🔐 Attempting login with extension: ${extension}`);

  // Navigate to login page
  await page.goto(`${BASE_URL}/Login`, { waitUntil: 'load' });
  await page.waitForLoadState('domcontentloaded');
  console.log(`✅ Navigated to login page: ${page.url()}`);

  // Find login form elements using robust selectors
  const extensionField = page
    .locator('input[name*="extension" i], input[placeholder*="extension" i], input[aria-label*="extension" i], input[id*="extension" i], input[autocomplete="username"]')
    .first();
  const passwordField = page
    .locator('input[type="password"], input[name*="password" i], input[placeholder*="password" i], input[aria-label*="password" i], input[id*="password" i], input[autocomplete="current-password"]')
    .first();
  const rememberMeCheckbox = page.getByRole('checkbox', { name: /remember me/i }).first();
  const loginButton = page.getByRole('button', { name: /login/i }).first();

  // Fill login form
  await fillField(extensionField, extension);
  await fillField(passwordField, password);
  await setCheckbox(rememberMeCheckbox, true);

  // Click login button
  await safeClick(loginButton);

  // Wait for successful login - verify we're redirected away from login page
  await expect(page).not.toHaveURL(/Login/i, { timeout: TIMEOUTS.navigation });
  console.log('✅ Login successful, redirected from login page');

  // Additional verification: check for dashboard elements or user menu
  try {
    // Look for common elements that appear after successful login
    const dashboardIndicator = page.locator('h1, h2, h3, .dashboard, .welcome, [data-testid="user-menu"]').first();
    await dashboardIndicator.waitFor({ state: 'visible', timeout: TIMEOUTS.default });
    console.log('✅ Dashboard elements visible after login');
  } catch (error) {
    console.log('⚠️ No dashboard elements found, but login appears successful based on URL change');
  }

  // Wait for any initial loading to complete
  await page.waitForLoadState('networkidle');
  console.log('✅ Page fully loaded after login');
}

test.describe.configure({ retries: 1 });

test.describe('3CX Recording Manager - Import', () => {
  test.beforeEach(async ({ page }) => {
    await login(page, EXTENSION, PASSWORD);
    await dismissWhatsNewPopup(page);
    await navigateToRecordings(page);
    await navigateToImport(page);
  });

  test('import with default settings (both advanced options unchecked)', async ({ page }) => {
    await expandAdvancedSettings(page);
    await setAdvancedOptions(page, false, false);
    await runImportAndWaitForCompletion(page);
    await verifyImportSuccess(page);
  });

  test('import with "All extensions" and "From last import date" checked', async ({ page }) => {
    await expandAdvancedSettings(page);
    await setAdvancedOptions(page, true, true);
    await runImportAndWaitForCompletion(page);
    await verifyImportSuccess(page);
  });
});

test.describe('3CX Recording Manager - Comprehensive Navigation', () => {
  test('login once and navigate through all pages then logout', async ({ page }) => {
    // Open base URL first
    await page.goto(BASE_URL, { waitUntil: 'load' });
    console.log(`✅ Opened base URL: ${BASE_URL}`);

    // Login once
    await login(page, EXTENSION, PASSWORD);
    await dismissWhatsNewPopup(page);

    // Navigate to Recordings page
    await navigateToRecordings(page);

    // Navigate to Import page
    await navigateToImport(page);

    // Navigate to Reports page
    const reportsLink = page.getByRole('link', { name: /Reports/i }).or(page.getByText('Reports', { exact: true }));
    await reportsLink.waitFor({ state: 'visible', timeout: TIMEOUTS.default });
    await reportsLink.scrollIntoViewIfNeeded();
    await safeClick(reportsLink);
    await expect(page).toHaveURL(/Reports/i, { timeout: TIMEOUTS.navigation });
    console.log('✅ Reports page:', page.url());

    // Navigate to Logs page
    const logsLink = page.getByRole('link', { name: /Logs/i }).or(page.getByText('Logs', { exact: true }));
    await logsLink.waitFor({ state: 'visible', timeout: TIMEOUTS.default });
    await logsLink.scrollIntoViewIfNeeded();
    await safeClick(logsLink);
    await expect(page).toHaveURL(/Logs/i, { timeout: TIMEOUTS.navigation });
    console.log('✅ Logs page:', page.url());

    // Navigate to Audit page
    const auditLink = page.getByRole('link', { name: /Audit/i }).or(page.getByText('Audit', { exact: true }));
    await auditLink.waitFor({ state: 'visible', timeout: TIMEOUTS.default });
    await auditLink.scrollIntoViewIfNeeded();
    await safeClick(auditLink);
    await expect(page).toHaveURL(/Audit/i, { timeout: TIMEOUTS.navigation });
    console.log('✅ Audit page:', page.url());

    // Navigate to Settings page
    const settingsLink = page.getByRole('link', { name: /Settings/i }).or(page.getByText('Settings', { exact: true }));
    await settingsLink.waitFor({ state: 'visible', timeout: TIMEOUTS.default });
    await settingsLink.scrollIntoViewIfNeeded();
    await safeClick(settingsLink);
    await expect(page).toHaveURL(/Settings/i, { timeout: TIMEOUTS.navigation });
    console.log('✅ Settings page:', page.url());

    // Logout
    await logout(page);
  });
});

test.describe('3CX Recording Manager - Invalid Login', () => {
  test('open base URL then attempt invalid login', async ({ page }) => {
    // Open base URL first
    await page.goto(BASE_URL, { waitUntil: 'load' });
    console.log(`✅ Opened base URL: ${BASE_URL}`);

    // Navigate to login page if not already there
    if (!page.url().includes('/Login')) {
      await page.goto(`${BASE_URL}/Login`, { waitUntil: 'load' });
    }
    await page.waitForLoadState('domcontentloaded');

    const extensionField = page
      .locator('input[name*="extension" i], input[placeholder*="extension" i], input[aria-label*="extension" i], input[id*="extension" i], input[autocomplete="username"]')
      .first();
    const passwordField = page
      .locator('input[type="password"], input[name*="password" i], input[placeholder*="password" i], input[aria-label*="password" i], input[id*="password" i], input[autocomplete="current-password"]')
      .first();
    const rememberMeCheckbox = page.getByRole('checkbox', { name: /remember me/i }).first();
    const loginButton = page.getByRole('button', { name: /login/i }).first();

    await fillField(extensionField, '1005');
    await fillField(passwordField, 'WrongPassword123');
    await setCheckbox(rememberMeCheckbox, true);
    await safeClick(loginButton);

    const errorBanner = page.getByText(/login unsuccessful|invalid|incorrect|failed/i).first();
    await expect(errorBanner).toBeVisible({ timeout: TIMEOUTS.default });
    await expect(errorBanner).toContainText(/login unsuccessful|invalid|incorrect|failed/i);
    console.log('✅ Invalid login correctly rejected after opening base URL');
  });
});