import { test, expect } from '@playwright/test';

test('test', async ({ page }, testInfo) => {
  const isMobile = testInfo.project.name.toLowerCase().includes('mobile');

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

  // ─── LOGIN — INVALID CREDENTIALS ──────────────────────
  await page.goto('http://13.235.85.154:5500/Login', { waitUntil: 'load' });
  await page.getByRole('textbox', { name: 'extension' }).fill('1005');
  await page.locator('input[type="password"]').fill('Shivaay@104');
  await page.getByRole('checkbox', { name: 'Remember Me' }).check();
  await page.getByRole('button', { name: /login/i }).click();

  const errorBanner = page.getByText(/Login Unsuccessful\.?/i);
  await errorBanner.waitFor({ state: 'visible', timeout: 10000 });
  await expect(errorBanner).toHaveText(/Login Unsuccessful\.?/i);

  // ─── LOGIN — VALID CREDENTIALS ─────────────────────────
  await page.getByRole('textbox', { name: 'extension' }).click();
  await page.getByRole('textbox', { name: 'extension' }).fill('1005');
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('Shivaay@1042');
  await page.getByRole('checkbox', { name: 'Remember Me' }).check();
  await page.getByRole('button', { name: /login/i }).click();
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
    await recordingsLink.waitFor({ state: 'visible', timeout: 20000 });
    await recordingsLink.scrollIntoViewIfNeeded();
    await recordingsLink.click();
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
      await page.getByRole('link', { name: link.regex }).click();
      await page.waitForURL(link.regex, { timeout: 15000 });
      console.log(`✅ ${link.name} page —`, page.url());
    } catch {
      console.log(`❌ ${link.name} not found`);
    }
  }

  // Settings uses getByText instead of getByRole('link'), kept separate
  try {
    await openMobileMenuIfNeeded();
    await page.getByText('Settings').scrollIntoViewIfNeeded();
    await page.getByText('Settings').click();
    await page.waitForURL(/Settings/i, { timeout: 15000 });
    console.log('✅ Settings page —', page.url());
  } catch {
    console.log('❌ Settings not found');
  }

  // ─── NAVIGATE TO IMPORT (main flow) ────────────────────
  await openMobileMenuIfNeeded();
  await recordingsLink.waitFor({ state: 'visible', timeout: 20000 });
  await recordingsLink.scrollIntoViewIfNeeded();
  await recordingsLink.click();
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