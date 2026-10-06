const { test, expect } = require('@playwright/test');

const PAGES = ['/', '/services.html', '/gallery.html', '/about.html', '/reviews.html', '/contact.html'];
const WIDTHS = [320, 360, 390, 412, 768];
const BASE = process.env.TEST_URL || 'https://salon-demo-website-mu.vercel.app';

test.describe('Mobile overflow check', () => {
  for (const width of WIDTHS) {
    for (const path of PAGES) {
      test(`${path} no overflow at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 780 });
        await page.goto(BASE + path, { waitUntil: 'networkidle' });
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
        await page.waitForTimeout(400);
        await page.evaluate(() => window.scrollTo(0, 0));
        const r = await page.evaluate(() => ({
          sw: document.documentElement.scrollWidth,
          cw: document.documentElement.clientWidth,
        }));
        if (r.sw > r.cw + 1) {
          const safeName = path === '/' ? 'home' : path.replace(/[/.]/g, '');
          await page.screenshot({ path: `tests/ss-${width}-${safeName}.png` });
        }
        expect(r.sw, `${path} at ${width}px: sw=${r.sw} cw=${r.cw}`).toBeLessThanOrEqual(r.cw + 1);
      });
    }
  }
});
