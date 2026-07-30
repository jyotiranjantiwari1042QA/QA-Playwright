const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: false, args: ['--disable-blink-features=AutomationControlled'] });
  const page = await browser.newPage({ userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' });
  await page.goto('https://www.airtelpayments.bank.in/login', { waitUntil: 'domcontentloaded', timeout: 60000 });
  console.log('TITLE:', await page.title());
  console.log('URL:', page.url());
  console.log('BODY START:', await page.locator('body').innerText().then(t => t.slice(0, 2000)));
  const elements = await page.$$eval('*', els => els.filter(e => /otp|one time password|send otp|mobile number|registered mobile/i.test(e.textContent || '')).map(e => ({ tag: e.tagName, text: e.textContent?.trim().slice(0, 200), role: e.getAttribute('role'), id: e.id, class: e.className }))); 
  console.log('MATCHING ELEMENTS:', elements.slice(0, 50));
  await browser.close();
})();
