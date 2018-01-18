/**
 * Created by VALLA on 2018/1/16.
 */
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless: false});
// const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto('https://uat.newwebatm.citibank.com.tw/extfunc22/page/index_nccc?CardType=2&Media=412');
await page.screenshot({path: 'example.png'});

await browser.close();
})();
