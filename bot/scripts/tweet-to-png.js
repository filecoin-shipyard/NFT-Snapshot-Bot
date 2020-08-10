const puppeteer = require('puppeteer');
const axios = require('axios');

(async () => {
  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  const thread = encodeURIComponent(`https://twitter.com/BlockRocketTech/status/1247098778928193536`);

  const {data} = await axios.get(`https://publish.twitter.com/oembed?url=${thread}&align=center`);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({
    width: 550,
    height: 1200,
    deviceScaleFactor: 1,
  });

  await page.setContent(data.html);

  await sleep(3000); // allow script to load? Not sure if this is needed

  await page.screenshot({path: `./scripts/temp/tweet-${new Date().getTime()}.png`});

  await browser.close();
})();
