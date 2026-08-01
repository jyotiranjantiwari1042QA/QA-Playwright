import { test, expect, type Locator, type Page } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://13.235.85.154:5500';
con                                                                                 st EXTENSION = process.env.TEST_EXTENSION || '1005';
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

async function login(page: Page, extension: string, password: string) {
  await page.goto(`${BASE_URL}/Login`, { waitUntil: 'load' });
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(500);

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

  await expect(loginButton).toBeVisible({ timeout: TIMEOUTS.default });
  await expect(loginButton).toBeEnabled({ timeout: TIMEOUTS.default });

  await fillField(extensionField, extension);
  await fillField(passwordField, password);
  await setCheckbox(rememberMeCheckbox, true);
  await safeClick(loginButton);
  await page.waitForLoadState('networkidle');
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

  console.log('✅ Import reached 100%');
}

async function verifyImportSuccess(page: Page) {
  await expect(page.getByRole('heading', { name: /Imports/i })).toBeVisible({ timeout: TIMEOUTS.default });
  await expect(page.getByText('Import Completed Successfully')).toBeVisible({ timeout: TIMEOUTS.default });
  await expect(page.getByRole('button', { name: 'OK' })).toBeVisible({ timeout: TIMEOUTS.default });

  await page.getByRole('button', { name: 'OK' }).click();
  await expect(page.getByText('Import Completed Successfully')).not.toBeVisible({ timeout: TIMEOUTS.default });
  console.log('✅ Success popup closed');
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

test.describe('3CX Recording Manager - Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await login(page, EXTENSION, PASSWORD);
    await dismissWhatsNewPopup(page);
    await navigateToRecordings(page);
  });

  for (const tab of ['Reports', 'Logs', 'Audit', 'Settings'] as const) {
    test(`navigates to ${tab} tab`, async ({ page }) => {
      const link = page.getByRole('link', { name: new RegExp(tab, 'i') }).or(page.getByText(tab, { exact: true }));
      await link.waitFor({ state: 'visible', timeout: TIMEOUTS.default });
      await link.scrollIntoViewIfNeeded();
      await safeClick(link);
      await expect(page).toHaveURL(new RegExp(tab, 'i'), { timeout: TIMEOUTS.navigation });
      console.log(`✅ ${tab} page:`, page.url());
    });
  }
});

test.describe('3CX Recording Manager - Invalid Login', () => {
  test('shows error for invalid credentials', async ({ page }) => {
    await page.goto(`${BASE_URL}/Login`, { waitUntil: 'load' });
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
    console.log('✅ Invalid login correctly rejected');
  });
});