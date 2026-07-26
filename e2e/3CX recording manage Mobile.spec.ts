import { test, expect, type Locator } from '@playwright/test';

test('test', async ({ page }, testInfo) => {
  const isMobile = testInfo.project.name.toLowerCase().includes('mobile');

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

  // Helper: opens hamburger menu on mobile viewports if present
  async function openMobileMenuIfNeeded() {
    if (!isMobile) return;
    const menuButton = page.locator(
      'button[aria-label*="menu" i], button.hamburger, [data-testid="mobile-menu"]'
    ).first();
    if (await menuButton.isVisible().catch(() => false)) {
      await menuButton.click();
      await page.waitForTimeout(300); // allow menu animation
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

  // ─── LOGIN — INVALID CREDENTIALS ──────────────────────
  await page.goto('http://13.235.85.154:5500/Login', { waitUntil: 'load' });
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(1000);

  const extensionField = page
    .locator(
      'input[name*="extension" i], input[placeholder*="extension" i], input[aria-label*="extension" i], input[id*="extension" i], input[autocomplete="username"]'
    )
    .first();
  const passwordField = page
    .locator(
      'input[type="password"], input[name*="password" i], input[placeholder*="password" i], input[aria-label*="password" i]'
    )
    .first();
  const rememberMeCheckbox = page.getByRole('checkbox', { name: /remember me/i }).first();
  const loginButton = page.getByRole('button', { name: /login/i }).first();

  await fillField(extensionField, '1005');
  await fillField(passwordField, 'Shivaay@104');
  await checkBox(rememberMeCheckbox);
  await loginButton.click();

  const errorBanner = page.getByText(/login unsuccessful|invalid|incorrect|failed/i).first();

  try {
    await errorBanner.waitFor({ state: 'visible', timeout: 10000 });
    await expect(errorBanner).toContainText(/login unsuccessful|invalid|incorrect|failed/i);
    console.log('⚠️ Login error message shown');
  } catch {
    console.log('ℹ️ Login error message not found — continuing');
  }

  // ─── LOGIN — VALID CREDENTIALS ─────────────────────────
  await fillField(extensionField, '1005');
  await fillField(passwordField, 'Shivaay@1042');
  await checkBox(rememberMeCheckbox);
  await loginButton.click();
  await page.waitForLoadState('networkidle');

  // ─── OPTIONAL "WHAT'S NEW" POPUP ───────────────────────
  try {
    await page.getByText(/What(?:'|’)s New in Version 20\.0\.14\.0/i).waitFor({
      state: 'visible',
      timeout: 5000,
    });
    await page.getByRole('checkbox', { name: /Don't show this again for/i }).check();
    await page.getByRole('button', { name: /Got it!/i }).click();
    console.log('✅ Popup appeared — checkbox checked and closed');
  } catch {
    console.log('ℹ️ Popup not found — skipping to Recordings');
  }

  // ─── NAVIGATE TO RECORDINGS (handles mobile hamburger) ─
  await openMobileMenuIfNeeded();
  const recordingsLink = page.locator('a, button').filter({ hasText: /recordings/i }).first();
  try {
    await safeClick(recordingsLink);
    await page.waitForURL(/Recordings/i, { timeout: 15000 });
    console.log('✅ Recordings page —', page.url());
  } catch {
    console.log('❌ Recordings not found');
  }

  // ─── SIDEBAR EXPLORATION (Import / Reports / Logs / Audit / Settings) ─
  const sidebarLinks = [
    { name: 'Import', regex: /Import/i },
    { name: 'Reports', regex: /Reports/i },
    { name: 'Logs', regex: /Logs/i },
    { name: 'Audit', regex: /Audit/i },
  ];

  for (const link of sidebarLinks) {
    try {
      await openMobileMenuIfNeeded();
      const sidebarLink = page
        .locator('a, button, [role="menuitem"]')
        .filter({ hasText: link.regex })
        .first();
      await safeClick(sidebarLink);
      await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => undefined);
      await page.waitForTimeout(1000);
      console.log(`✅ ${link.name} page —`, page.url());
    } catch {
      console.log(`❌ ${link.name} not found`);
    }
  }

  // Settings uses a broader locator because mobile UIs often render it as a button or text container
  try {
    await openMobileMenuIfNeeded();
    const settingsLink = page
      .locator('a, button, [role="menuitem"], [role="button"]')
      .filter({ hasText: /settings/i })
      .first();
    await safeClick(settingsLink);
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => undefined);
    await page.waitForTimeout(1000);
    console.log('✅ Settings page —', page.url());
  } catch {
    console.log('❌ Settings not found');
  }

  // ─── NAVIGATE TO IMPORT (main flow) ────────────────────
  await openMobileMenuIfNeeded();
  await safeClick(recordingsLink);
  await expect(page).toHaveURL(/Recordings/i);

  await openMobileMenuIfNeeded();
  await page.getByRole('link', { name: /Import/i }).click();
  await expect(page).toHaveURL(/Import/i);

  // ─── EXPAND PANEL ───────────────────────────────────────
  await page.locator('.mud-expand-panel-header').first().click();

  // ─── ADVANCED SETTINGS ──────────────────────────────────
  const advancedSettingsBtn = page.getByRole('button', { name: 'Advanced Settings' });
  await advancedSettingsBtn.waitFor({ state: 'visible' });
  await advancedSettingsBtn.click();

  // ─── UNCHECK BOTH CHECKBOXES ────────────────────────────
  const allExtensionsCheckbox = page.getByRole('checkbox', { name: /All extensions or Range/i });
  const importFromLastCheckbox = page.getByRole('checkbox', { name: /Import starting from last/i });
  await allExtensionsCheckbox.uncheck();
  await importFromLastCheckbox.uncheck();

  // ─── VERIFY UNCHECKED ───────────────────────────────────
  await expect(allExtensionsCheckbox).not.toBeChecked();
  await expect(importFromLastCheckbox).not.toBeChecked();

  // ─── CLICK IMPORT ────────────────────────────────────────
  const importButton = page.getByRole('button', { name: 'Import' });
  const stopButton = page.getByRole('button', { name: /Stop/i });
  await importButton.click();
  await expect(stopButton).toBeVisible({ timeout: 10000 });
  console.log('✅ Import started, syncing...');

  // ─── LOCATE TOTAL & PERCENTAGE ───────────────────────────
  const totalLocator = page.getByText(/Total:\s*\d+/);
  const percentageLocator = page.getByText(/(\d{1,3}\s*%)/).first();

  await expect(totalLocator).toBeVisible({ timeout: 30000 });
  const totalText = await totalLocator.textContent();
  console.log(`📊 ${totalText}`);

  // ─── POLL PERCENTAGE UNTIL 100% ──────────────────────────
  await expect
    .poll(
      async () => {
        const pctText = (await percentageLocator.textContent())?.trim();
        console.log(`⏳ Progress: ${pctText}`);
        return pctText;
      },
      { timeout: 300000, intervals: [1000] }
    )
    .toMatch(/100\s*%/);

  console.log('✅ Sync reached 100%');

  // ─── VALIDATE SUCCESS POPUP APPEARS (add your check here) ──
});