const { chromium } = require('playwright');
const cheerio = require('cheerio')
const url = require('url')
const timeout = 60 * 1000
const link = (href, text, webUrl) => {
  if (/https?/.test(href)) {
    return `<a href=${href}>${text}</a>`
  } else {
    const { host, protocol } = url.parse(webUrl)
    return `<a href='${protocol}//${host}${href}'>${text}</a>`
  }
}
async function run() {
  const sites = {
    juejin: {
      url: 'https://juejin.cn/frontend?sort=newest',
      selector: '.entry-list-wrap .item .title-row .title'
    },
    cnblogs: {
      url: 'https://www.cnblogs.com/cate/108703/',
      selector: '#post_list .post-item .post-item-title'
    },
    segmentfault: {
      url: 'https://segmentfault.com/channel/frontend###',
      selector: '.middle-wrap ul li h3 a'
    },
    // csdn: { 
    //   url: 'https://blog.csdn.net/nav/web',
    //   selector: '.blog-content .blog .Community-h-tag'
    // }
  }
  const browser = await chromium.launch({
    slowMo:1000
  });
  const context = await browser.newContext();
  const result = await Promise.all(
    Object.keys(sites).map(async webName => {
      const name = sites[webName]
      const page = await context.newPage();
      await page.goto(name.url);
      // await page.mouse.wheel(0,10000)
      // await page.waitForTimeout(3000)
      const html = await page.content();
      const $ = cheerio.load(html);
      const elementList = [`<br/><b>${webName} 推荐：</b>`]
      $(name.selector).each((i, v) => {
        const title = $(v).text()
        const href = $(v).attr('href')
        elementList.push(link(href, title, name.url))
      })
      await page.waitForLoadState('networkidle', { timeout })
      await page.close();
      return elementList
    }))
  await context.close();
  await browser.close();
  return result
}

module.exports = {
  run
}