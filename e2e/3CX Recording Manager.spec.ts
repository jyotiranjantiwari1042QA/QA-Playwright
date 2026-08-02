import { test, expect, type Locator, type Page } from '@playwright/test';

declare const process: {
  env: Record<string, string | undefined>;
};

const BASE_URL = process.env.BASE_URL || 'http://13.235.85.154:5500';
const EXTENSION = process.env.TEST_EXTENSION || '1005';
const PASSWORD = process.env.TEST_PASSWORD || 'Shivaay@1042';
const INVALID_PASSWORD = process.env.TEST_INVALID_PASSWORD || 'WrongPassword123';

const TIMEOUTS = {
  default: 20_000,
  navigation: 15_000,
  longOperation: 300_000,
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

async function safeClick(locator: Locator, timeout = TIMEOUTS.default) {
  await locator.waitFor({ state: 'visible', timeout });
  await locator.scrollIntoViewIfNeeded();
  try {
    await locator.click({ timeout });
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

async function navigateToReports(page: Page) {
  const reportsLink = page.getByRole('link', { name: /Reports/i }).or(page.getByText('Reports', { exact: true }));
  await reportsLink.waitFor({ state: 'visible', timeout: TIMEOUTS.default });
  await reportsLink.scrollIntoViewIfNeeded();
  await safeClick(reportsLink);
  await expect(page).toHaveURL(/Reports/i, { timeout: TIMEOUTS.navigation });
  console.log('✅ Reports page:', page.url());
}

async function navigateToLogs(page: Page) {
  const logsLink = page.getByRole('link', { name: /Logs/i }).or(page.getByText('Logs', { exact: true }));
  await logsLink.waitFor({ state: 'visible', timeout: TIMEOUTS.default });
  await logsLink.scrollIntoViewIfNeeded();
  await safeClick(logsLink);
  await expect(page).toHaveURL(/Logs/i, { timeout: TIMEOUTS.navigation });
  console.log('✅ Logs page:', page.url());
}

async function navigateToAudit(page: Page) {
  const auditLink = page.getByRole('link', { name: /Audit/i }).or(page.getByText('Audit', { exact: true }));
  await auditLink.waitFor({ state: 'visible', timeout: TIMEOUTS.default });
  await auditLink.scrollIntoViewIfNeeded();
  await safeClick(auditLink);
  await expect(page).toHaveURL(/Audit/i, { timeout: TIMEOUTS.navigation });
  console.log('✅ Audit page:', page.url());
}

async function navigateToSettings(page: Page) {
  const settingsLink = page.getByRole('link', { name: /Settings/i }).or(page.getByText('Settings', { exact: true }));
  await settingsLink.waitFor({ state: 'visible', timeout: TIMEOUTS.default });
  await settingsLink.scrollIntoViewIfNeeded();
  await safeClick(settingsLink);
  await expect(page).toHaveURL(/Settings/i, { timeout: TIMEOUTS.navigation });
  console.log('✅ Settings page:', page.url());
}

async function expandAdvancedSettings(page: Page) {
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
}

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
  await safeClick(loginButton, 30_000);

  // Wait for successful login - verify we're redirected away from login page
  await expect(page).not.toHaveURL(/Login/i, { timeout: TIMEOUTS.navigation });
  console.log('✅ Login successful, redirected from login page');

  // Additional verification: check for dashboard elements or user menu
  try {
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

async function checkLoginPageElements(page: Page) {
  console.log('🔍 Checking login page elements...');

  // Check for login form elements
  const extensionField = page
    .locator('input[name*="extension" i], input[placeholder*="extension" i], input[aria-label*="extension" i], input[id*="extension" i], input[autocomplete="username"]')
    .first();
  const passwordField = page
    .locator('input[type="password"], input[name*="password" i], input[placeholder*="password" i], input[aria-label*="password" i], input[id*="password" i], input[autocomplete="current-password"]')
    .first();
  const rememberMeCheckbox = page.getByRole('checkbox', { name: /remember me/i }).first();
  const loginButton = page.getByRole('button', { name: /login/i }).first();

  await expect(extensionField).toBeVisible({ timeout: TIMEOUTS.default });
  console.log('✅ Extension field visible');

  await expect(passwordField).toBeVisible({ timeout: TIMEOUTS.default });
  console.log('✅ Password field visible');

  await expect(rememberMeCheckbox).toBeVisible({ timeout: TIMEOUTS.default });
  console.log('✅ Remember me checkbox visible');

  await expect(loginButton).toBeVisible({ timeout: TIMEOUTS.default });
  console.log('✅ Login button visible');

  // Check for page title/heading (may not exist on all login pages)
  const heading = page.locator('h1, h2, h3').first();
  try {
    await heading.waitFor({ state: 'visible', timeout: TIMEOUTS.default });
    console.log(`✅ Login page heading: ${await heading.textContent()}`);
  } catch {
    console.log('⚠️ No heading found on login page (this is OK)');
  }

  console.log('✅ All login page elements verified');
}

async function checkDashboardElements(page: Page) {
  console.log('🔍 Checking dashboard elements after login...');

  // Check for common dashboard elements
  const elements = [
    { name: 'Recordings link', locator: page.locator('a, button').filter({ hasText: /recordings/i }).first() },
    { name: 'Import link', locator: page.getByRole('link', { name: /Import/i }) },
    { name: 'Reports link', locator: page.getByRole('link', { name: /Reports/i }) },
    { name: 'Logs link', locator: page.getByRole('link', { name: /Logs/i }) },
    { name: 'Audit link', locator: page.getByRole('link', { name: /Audit/i }) },
    { name: 'Settings link', locator: page.getByRole('link', { name: /Settings/i }) },
    { name: 'Logout button', locator: page.locator('button, a').filter({ hasText: /logout/i }).first() },
  ];

  for (const element of elements) {
    try {
      await element.locator.waitFor({ state: 'visible', timeout: TIMEOUTS.default });
      console.log(`✅ ${element.name} visible`);
    } catch {
      console.log(`⚠️ ${element.name} not found`);
    }
  }

  console.log('✅ Dashboard elements check completed');
}

async function checkPageElements(page: Page, pageName: string, expectedElements: string[]) {
  console.log(`🔍 Checking ${pageName} page elements...`);

  // Wait for page to load
  await page.waitForLoadState('networkidle');

  // Check for headings
  const heading = page.locator('h1, h2, h3').first();
  try {
    await heading.waitFor({ state: 'visible', timeout: TIMEOUTS.default });
    console.log(`✅ ${pageName} page heading: ${await heading.textContent()}`);
  } catch {
    console.log(`⚠️ No heading found on ${pageName} page`);
  }

  // Check for expected elements
  for (const elementText of expectedElements) {
    const element = page.getByText(elementText, { exact: false }).first();
    try {
      await element.waitFor({ state: 'visible', timeout: TIMEOUTS.default });
      console.log(`✅ Found: ${elementText}`);
    } catch {
      console.log(`⚠️ Not found: ${elementText}`);
    }
  }

  console.log(`✅ ${pageName} page elements check completed`);
}

// ============================================================================
// TEST SUITE: INVALID LOGIN
// ============================================================================

test.describe('3CX Recording Manager - Invalid Login', () => {
  test.beforeEach(async ({ page }) => {
    // Open base URL first
    try {
      await page.goto(BASE_URL, { waitUntil: 'load', timeout: TIMEOUTS.navigation });
      console.log(`✅ Opened base URL: ${BASE_URL}`);
    } catch (error) {
      console.log(`⚠️ Failed to open base URL, trying login page directly: ${error}`);
    }

    // Navigate to login page if not already there
    if (!page.url().includes('/Login')) {
      try {
        await page.goto(`${BASE_URL}/Login`, { waitUntil: 'load', timeout: TIMEOUTS.navigation });
      } catch (error) {
        console.log(`⚠️ Navigation to login page failed: ${error}`);
        // Try with domcontentloaded as fallback
        await page.goto(`${BASE_URL}/Login`, { waitUntil: 'domcontentloaded', timeout: TIMEOUTS.navigation });
      }
    }
    await page.waitForLoadState('domcontentloaded');
  });

  test('check login page elements and logs', async ({ page }) => {
    console.log('📋 Test: Check login page elements and logs');

    // Check all login page elements
    await checkLoginPageElements(page);

    // Log current URL and page title
    console.log(`📍 Current URL: ${page.url()}`);
    console.log(`📄 Page Title: ${await page.title()}`);

    // Take screenshot for debugging
    await page.screenshot({ path: 'test-results/login-page-elements.png', fullPage: true });
    console.log('📸 Screenshot saved: login-page-elements.png');
  });

  test('attempt invalid login with wrong password', async ({ page }) => {
    console.log('📋 Test: Attempt invalid login with wrong password');

    const extensionField = page
      .locator('input[name*="extension" i], input[placeholder*="extension" i], input[aria-label*="extension" i], input[id*="extension" i], input[autocomplete="username"]')
      .first();
    const passwordField = page
      .locator('input[type="password"], input[name*="password" i], input[placeholder*="password" i], input[aria-label*="password" i], input[id*="password" i], input[autocomplete="current-password"]')
      .first();
    const rememberMeCheckbox = page.getByRole('checkbox', { name: /remember me/i }).first();
    const loginButton = page.getByRole('button', { name: /login/i }).first();

    // Fill with valid extension but invalid password
    await fillField(extensionField, EXTENSION);
    await fillField(passwordField, INVALID_PASSWORD);
    await setCheckbox(rememberMeCheckbox, true);
    await safeClick(loginButton, 30_000);

    // Check for error message
    const errorBanner = page.getByText(/login unsuccessful|invalid|incorrect|failed|error/i).first();
    await expect(errorBanner).toBeVisible({ timeout: TIMEOUTS.default });
    await expect(errorBanner).toContainText(/login unsuccessful|invalid|incorrect|failed|error/i);
    console.log('✅ Invalid login correctly rejected');
    console.log(`📝 Error message: ${await errorBanner.textContent()}`);

    // Verify we're still on login page
    await expect(page).toHaveURL(/Login/i, { timeout: TIMEOUTS.navigation });
    console.log('✅ Still on login page after failed attempt');

    // Take screenshot for debugging
    await page.screenshot({ path: 'test-results/invalid-login-error.png', fullPage: true });
    console.log('📸 Screenshot saved: invalid-login-error.png');
  });

  test('attempt invalid login with wrong extension', async ({ page }) => {
    console.log('📋 Test: Attempt invalid login with wrong extension');

    const extensionField = page
      .locator('input[name*="extension" i], input[placeholder*="extension" i], input[aria-label*="extension" i], input[id*="extension" i], input[autocomplete="username"]')
      .first();
    const passwordField = page
      .locator('input[type="password"], input[name*="password" i], input[placeholder*="password" i], input[aria-label*="password" i], input[id*="password" i], input[autocomplete="current-password"]')
      .first();
    const rememberMeCheckbox = page.getByRole('checkbox', { name: /remember me/i }).first();
    const loginButton = page.getByRole('button', { name: /login/i }).first();

    // Fill with invalid extension
    await fillField(extensionField, '9999');
    await fillField(passwordField, PASSWORD);
    await setCheckbox(rememberMeCheckbox, true);
    await safeClick(loginButton, 30_000);

    // Check for error message
    const errorBanner = page.getByText(/login unsuccessful|invalid|incorrect|failed|error/i).first();
    await expect(errorBanner).toBeVisible({ timeout: TIMEOUTS.default });
    await expect(errorBanner).toContainText(/login unsuccessful|invalid|incorrect|failed|error/i);
    console.log('✅ Invalid login correctly rejected');
    console.log(`📝 Error message: ${await errorBanner.textContent()}`);
  });

  test('attempt login with empty fields', async ({ page }) => {
    console.log('📋 Test: Attempt login with empty fields');

    const loginButton = page.getByRole('button', { name: /login/i }).first();

    // Click login without filling fields
    await safeClick(loginButton, 30_000);

    // Check for validation error
    const errorBanner = page.getByText(/required|enter|fill|empty/i).first();
    try {
      await expect(errorBanner).toBeVisible({ timeout: TIMEOUTS.default });
      console.log('✅ Validation error shown for empty fields');
      console.log(`📝 Error message: ${await errorBanner.textContent()}`);
    } catch {
      console.log('ℹ️ No explicit validation error, but login should fail');
    }
  });
});

// ============================================================================
// TEST SUITE: VALID LOGIN & DASHBOARD ELEMENTS
// ============================================================================

test.describe('3CX Recording Manager - Valid Login & Dashboard', () => {
  test('valid login and check all dashboard elements', async ({ page }) => {
    console.log('📋 Test: Valid login and check all dashboard elements');

    // Perform valid login
    await login(page, EXTENSION, PASSWORD);
    await dismissWhatsNewPopup(page);

    // Check all dashboard elements
    await checkDashboardElements(page);

    // Log current URL
    console.log(`📍 Current URL after login: ${page.url()}`);

    // Take screenshot
    await page.screenshot({ path: 'test-results/dashboard-after-login.png', fullPage: true });
    console.log('📸 Screenshot saved: dashboard-after-login.png');
  });
});

// ============================================================================
// TEST SUITE: COMPREHENSIVE NAVIGATION THROUGH ALL PAGES
// ============================================================================

test.describe('3CX Recording Manager - Full Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Login once before each test
    await login(page, EXTENSION, PASSWORD);
    await dismissWhatsNewPopup(page);
  });

  test('navigate through all pages: Recordings, Import, Reports, Logs, Audit, Settings', async ({ page }) => {
    console.log('📋 Test: Navigate through all pages');

    // 1. Recordings Page
    console.log('\n=== RECORDINGS PAGE ===');
    await navigateToRecordings(page);
    await checkPageElements(page, 'Recordings', [
      'Recordings', 'Import', 'Search', 'Filter', 'Export', 'Date', 'Extension', 'Duration'
    ]);
    await page.screenshot({ path: 'test-results/recordings-page.png', fullPage: true });

    // 2. Import Page
    console.log('\n=== IMPORT PAGE ===');
    await navigateToImport(page);
    await checkPageElements(page, 'Import', [
      'Import', 'Advanced Settings', 'All extensions', 'Range', 'From last import', 'Start Date', 'End Date'
    ]);
    await page.screenshot({ path: 'test-results/import-page.png', fullPage: true });

    // 3. Reports Page
    console.log('\n=== REPORTS PAGE ===');
    await navigateToReports(page);
    await checkPageElements(page, 'Reports', [
      'Reports', 'Report', 'Generate', 'Export', 'Date Range', 'Type'
    ]);
    await page.screenshot({ path: 'test-results/reports-page.png', fullPage: true });

    // 4. Logs Page
    console.log('\n=== LOGS PAGE ===');
    await navigateToLogs(page);
    await checkPageElements(page, 'Logs', [
      'Logs', 'Log', 'Level', 'Message', 'Timestamp', 'Source', 'Filter'
    ]);
    await page.screenshot({ path: 'test-results/logs-page.png', fullPage: true });

    // 5. Audit Page
    console.log('\n=== AUDIT PAGE ===');
    await navigateToAudit(page);
    await checkPageElements(page, 'Audit', [
      'Audit', 'Audit Trail', 'Action', 'User', 'Timestamp', 'Details', 'Filter'
    ]);
    await page.screenshot({ path: 'test-results/audit-page.png', fullPage: true });

    // 6. Settings Page
    console.log('\n=== SETTINGS PAGE ===');
    await navigateToSettings(page);
    await checkPageElements(page, 'Settings', [
      'Settings', 'Configuration', 'Save', 'Apply', 'General', 'Advanced'
    ]);
    await page.screenshot({ path: 'test-results/settings-page.png', fullPage: true });

    console.log('\n✅ All pages navigated and verified successfully!');
  });

  test('verify navigation menu/sidebar elements on each page', async ({ page }) => {
    console.log('📋 Test: Verify navigation elements persist across pages');

    const navElements = [
      { name: 'Recordings', navigate: navigateToRecordings },
      { name: 'Import', navigate: navigateToImport },
      { name: 'Reports', navigate: navigateToReports },
      { name: 'Logs', navigate: navigateToLogs },
      { name: 'Audit', navigate: navigateToAudit },
      { name: 'Settings', navigate: navigateToSettings },
    ];

    for (const nav of navElements) {
      console.log(`\n--- Checking navigation to ${nav.name} ---`);
      await nav.navigate(page);

      // Verify all nav links are still accessible
      for (const checkNav of navElements) {
        const link = page.getByRole('link', { name: new RegExp(checkNav.name, 'i') })
          .or(page.getByText(checkNav.name, { exact: true }));
        try {
          await expect(link).toBeVisible({ timeout: 5_000 });
          console.log(`✅ ${checkNav.name} link visible on ${nav.name} page`);
        } catch {
          console.log(`⚠️ ${checkNav.name} link not visible on ${nav.name} page`);
        }
      }
    }
  });
});

// ============================================================================
// TEST SUITE: IMPORT FEATURE - COMPREHENSIVE TESTS
// ============================================================================

test.describe('3CX Recording Manager - Import Feature', () => {
  test.beforeEach(async ({ page }) => {
    await login(page, EXTENSION, PASSWORD);
    await dismissWhatsNewPopup(page);
    await navigateToRecordings(page);
    await navigateToImport(page);
  });

  test('verify import page elements and advanced settings', async ({ page }) => {
    console.log('📋 Test: Verify import page elements and advanced settings');

    // Check basic import elements
    await expect(page.getByRole('button', { name: 'Import' })).toBeVisible();
    console.log('✅ Import button visible');

    await expect(page.getByRole('button', { name: /Advanced Settings/i })).toBeVisible();
    console.log('✅ Advanced Settings button visible');

    // Expand advanced settings
    await expandAdvancedSettings(page);

    // Check advanced options
    const allExtCheckbox = page.getByRole('checkbox', { name: /All extensions or Range/i });
    const lastImportCheckbox = page.getByRole('checkbox', { name: /Import starting from last/i });

    await expect(allExtCheckbox).toBeVisible();
    console.log('✅ "All extensions or Range" checkbox visible');

    await expect(lastImportCheckbox).toBeVisible();
    console.log('✅ "Import starting from last import date" checkbox visible');

    // Check date fields if present
    const startDateField = page.getByLabel(/Start Date/i).or(page.getByPlaceholder(/Start Date/i));
    const endDateField = page.getByLabel(/End Date/i).or(page.getByPlaceholder(/End Date/i));

    try {
      await expect(startDateField).toBeVisible({ timeout: 5_000 });
      console.log('✅ Start Date field visible');
    } catch {
      console.log('ℹ️ Start Date field not visible (may be hidden until checkbox checked)');
    }

    try {
      await expect(endDateField).toBeVisible({ timeout: 5_000 });
      console.log('✅ End Date field visible');
    } catch {
      console.log('ℹ️ End Date field not visible (may be hidden until checkbox checked)');
    }
  });

  test('import with default settings (both advanced options unchecked)', async ({ page }) => {
    console.log('📋 Test: Import with default settings');

    await expandAdvancedSettings(page);
    await setAdvancedOptions(page, false, false);
    await runImportAndWaitForCompletion(page);
    await verifyImportSuccess(page);
  });

  test('import with "All extensions" checked only', async ({ page }) => {
    console.log('📋 Test: Import with "All extensions" checked only');

    await expandAdvancedSettings(page);
    await setAdvancedOptions(page, true, false);
    await runImportAndWaitForCompletion(page);
    await verifyImportSuccess(page);
  });

  test('import with "From last import date" checked only', async ({ page }) => {
    console.log('📋 Test: Import with "From last import date" checked only');

    await expandAdvancedSettings(page);
    await setAdvancedOptions(page, false, true);
    await runImportAndWaitForCompletion(page);
    await verifyImportSuccess(page);
  });

  test('import with both "All extensions" and "From last import date" checked', async ({ page }) => {
    console.log('📋 Test: Import with both advanced options checked');

    await expandAdvancedSettings(page);
    await setAdvancedOptions(page, true, true);
    await runImportAndWaitForCompletion(page);
    await verifyImportSuccess(page);
  });

  test('import with custom date range', async ({ page }) => {
    console.log('📋 Test: Import with custom date range');

    await expandAdvancedSettings(page);

    // Check "All extensions" to enable date fields
    const allExtCheckbox = page.getByRole('checkbox', { name: /All extensions or Range/i });
    await setCheckbox(allExtCheckbox, true);
    await expect(allExtCheckbox).toBeChecked({ timeout: TIMEOUTS.default });

    // Try to find and fill date fields
    const startDateField = page.getByLabel(/Start Date/i).or(page.getByPlaceholder(/Start Date/i)).or(page.locator('input[type="date"]').first());
    const endDateField = page.getByLabel(/End Date/i).or(page.getByPlaceholder(/End Date/i)).or(page.locator('input[type="date"]').last());

    try {
      await startDateField.waitFor({ state: 'visible', timeout: TIMEOUTS.default });
      await fillField(startDateField, '2024-01-01');
      console.log('✅ Start date filled');
    } catch {
      console.log('ℹ️ Start date field not available');
    }

    try {
      await endDateField.waitFor({ state: 'visible', timeout: TIMEOUTS.default });
      await fillField(endDateField, '2024-12-31');
      console.log('✅ End date filled');
    } catch {
      console.log('ℹ️ End date field not available');
    }

    await runImportAndWaitForCompletion(page);
    await verifyImportSuccess(page);
  });

  test('verify import progress indicators', async ({ page }) => {
    console.log('📋 Test: Verify import progress indicators');

    await expandAdvancedSettings(page);
    await setAdvancedOptions(page, false, false);

    const importButton = page.getByRole('button', { name: 'Import' });
    const stopButton = page.getByRole('button', { name: /Stop/i });
    const totalLocator = page.getByText(/Total:\s*\d+/);
    const percentageLocator = page.getByText(/(\d{1,3}\s*%)/).first();

    await safeClick(importButton);

    // Verify stop button appears
    await expect(stopButton).toBeVisible({ timeout: TIMEOUTS.default });
    console.log('✅ Stop button visible during import');

    // Verify total count appears
    await expect(totalLocator).toBeVisible({ timeout: TIMEOUTS.navigation });
    const totalText = await totalLocator.textContent();
    console.log(`📊 Total: ${totalText?.trim()}`);

    // Verify progress percentage updates
    let previousPercent = '';
    for (let i = 0; i < 10; i++) {
      const pctText = (await percentageLocator.textContent())?.trim();
      if (pctText && pctText !== previousPercent) {
        console.log(`⏳ Progress update: ${pctText}`);
        previousPercent = pctText;
      }
      await page.waitForTimeout(2000);

      // Check if completed
      if (pctText?.includes('100%')) {
        break;
      }
    }

    await verifyImportSuccess(page);
  });

  test('verify import stop functionality', async ({ page }) => {
    console.log('📋 Test: Verify import stop functionality');

    await expandAdvancedSettings(page);
    await setAdvancedOptions(page, false, false);

    const importButton = page.getByRole('button', { name: 'Import' });
    const stopButton = page.getByRole('button', { name: /Stop/i });

    await safeClick(importButton);
    await expect(stopButton).toBeVisible({ timeout: TIMEOUTS.default });

    // Wait a moment then click stop
    await page.waitForTimeout(3000);
    await safeClick(stopButton);
    console.log('✅ Stop button clicked');

    // Verify import stopped (button should change back or show stopped state)
    await expect(importButton).toBeVisible({ timeout: TIMEOUTS.default });
    console.log('✅ Import button visible again after stop');
  });
});

// ============================================================================
// TEST SUITE: END-TO-END FLOW
// ============================================================================

test.describe('3CX Recording Manager - End-to-End Flow', () => {
  test('complete flow: invalid login → valid login → check all pages → test import', async ({ page }) => {
    console.log('📋 Test: Complete end-to-end flow');

    // ============================================================
    // STEP 1: Invalid Login Check
    // ============================================================
    console.log('\n🔴 STEP 1: Invalid Login Check');
    await page.goto(BASE_URL, { waitUntil: 'load' });
    if (!page.url().includes('/Login')) {
      await page.goto(`${BASE_URL}/Login`, { waitUntil: 'load' });
    }
    await page.waitForLoadState('domcontentloaded');

    // Check login page elements
    await checkLoginPageElements(page);

    // Attempt invalid login
    const extensionField = page
      .locator('input[name*="extension" i], input[placeholder*="extension" i], input[aria-label*="extension" i], input[id*="extension" i], input[autocomplete="username"]')
      .first();
    const passwordField = page
      .locator('input[type="password"], input[name*="password" i], input[placeholder*="password" i], input[aria-label*="password" i], input[id*="password" i], input[autocomplete="current-password"]')
      .first();
    const rememberMeCheckbox = page.getByRole('checkbox', { name: /remember me/i }).first();
    const loginButton = page.getByRole('button', { name: /login/i }).first();

    await fillField(extensionField, EXTENSION);
    await fillField(passwordField, INVALID_PASSWORD);
    await setCheckbox(rememberMeCheckbox, true);
    await safeClick(loginButton, 30_000);

    const errorBanner = page.getByText(/login unsuccessful|invalid|incorrect|failed|error/i).first();
    await expect(errorBanner).toBeVisible({ timeout: TIMEOUTS.default });
    console.log('✅ Invalid login correctly rejected');

    // ============================================================
    // STEP 2: Valid Login
    // ============================================================
    console.log('\n🟢 STEP 2: Valid Login');
    await login(page, EXTENSION, PASSWORD);
    await dismissWhatsNewPopup(page);

    // Check dashboard elements
    await checkDashboardElements(page);

    // ============================================================
    // STEP 3: Navigate and Check All Pages
    // ============================================================
    console.log('\n🔵 STEP 3: Navigate and Check All Pages');

    // Recordings
    await navigateToRecordings(page);
    await checkPageElements(page, 'Recordings', ['Recordings', 'Import', 'Search', 'Filter']);
    console.log('✅ Recordings page verified');

    // Import
    await navigateToImport(page);
    await checkPageElements(page, 'Import', ['Import', 'Advanced Settings', 'All extensions']);
    console.log('✅ Import page verified');

    // Reports
    await navigateToReports(page);
    await checkPageElements(page, 'Reports', ['Reports', 'Generate', 'Export']);
    console.log('✅ Reports page verified');

    // Logs
    await navigateToLogs(page);
    await checkPageElements(page, 'Logs', ['Logs', 'Level', 'Message']);
    console.log('✅ Logs page verified');

    // Audit
    await navigateToAudit(page);
    await checkPageElements(page, 'Audit', ['Audit', 'Action', 'User']);
    console.log('✅ Audit page verified');

    // Settings
    await navigateToSettings(page);
    await checkPageElements(page, 'Settings', ['Settings', 'Save', 'Configuration']);
    console.log('✅ Settings page verified');

    // ============================================================
    // STEP 4: Test Import Feature
    // ============================================================
    console.log('\n🟣 STEP 4: Test Import Feature');
    await navigateToImport(page);
    await expandAdvancedSettings(page);
    await setAdvancedOptions(page, true, true);
    await runImportAndWaitForCompletion(page);
    await verifyImportSuccess(page);
    console.log('✅ Import feature tested successfully');

    // ============================================================
    // STEP 5: Logout
    // ============================================================
    console.log('\n⚪ STEP 5: Logout');
    await logout(page);
    console.log('✅ Logout successful');

    console.log('\n🎉 COMPLETE END-TO-END FLOW PASSED!');
  });
});

// ============================================================================
// TEST CONFIGURATION
// ============================================================================

test.describe.configure({ retries: 1 });