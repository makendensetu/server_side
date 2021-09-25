import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const targetElementSelector = '#tw-container';

  await page.goto('https://google.co.jp');
  await page.type('input[name="q"]', 'pupperteer 翻訳');
  await page.click('button[type="submit"]');

  await page.waitForSelector(targetElementSelector);

  await page.screenshot({ path: 'page-ss.png' });

  const clip = await page.evaluate((s) => {
    const el = document.querySelector(s);

    // エレメントの高さと位置を取得
    const { width, height, top: y, left: x } = el.getBoundingClientRect();
    return { width, height, x, y };
  }, targetElementSelector);

  // スクリーンショットに位置と大きさを指定してclipする
  await page.screenshot({ clip, path: 'tw-container-ss.png' });

  browser.close();
})();
