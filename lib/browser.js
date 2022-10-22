const { chromium } = require('playwright');
const cheerio = require('cheerio')
const url = require('url')

const link = (href, text, webUrl) => {
  if (/https?/.test(href)) {
    return `<a href=${href}>${text}</a>`
  } else {
    const { host, protocol } = url.parse(webUrl)
    return `<a href='${protocol}//${host}${href}'>${text}</a>`
  }
}
async function run() {
  const juejin = []
  const cnblogs = []
  const segmentfault = []
  const browser = await chromium.launch({
    slow_mo: 1000
  });
  const context = await browser.newContext();
  const sites = {
    juejin: {
      url: 'https://juejin.cn/?sort=newest',
      selector: '.entry-list.list a.title'
    },
    cnblogs: {
      url: 'https://www.cnblogs.com/cate/108703/',
      selector: '#post_list .post-item .post-item-title'
    },
    segmentfault: {
      url: 'https://segmentfault.com/channel/frontend###',
      selector: '.middle-wrap ul li h3 a'
    }
  }
  // const result = {}
  // Object.keys(sites).forEach(async webName => {
  //   const name = sites[webName]
  //   const page = await context.newPage();
  //   await page.goto(name.url);
  //   const html = await page.content();
  //   console.log(html)
  //   const $ = cheerio.load(html);
  //   if (!Array.isArray(result[webName])) result[webName] = []
  //   $(name.selector).each((i, v) => {
  //     const title = $(v).text()
  //     const href = $(v).attr('href')
  //     result[webName].push(link(href, title,name.url))
  //   })
  //   await page.waitForTimeout(3000)
  //   await page.close();
  // })
  // return Promise.resolve(result) 

  const page1 = await context.newPage();
  await page1.goto(sites.juejin.url);
  const html1 = await page1.$$(sites.juejin.selector)
  html1.forEach(async ele => {
    const title = await ele.innerText()
    const href = await ele.getAttribute('href')
    juejin.push(link(href, title, sites.juejin.url))
  });
  await page1.waitForTimeout(3000)

  const page2 = await context.newPage();
  await page2.goto(sites.cnblogs.url);
  const html2 = await page2.content();
  const $1 = cheerio.load(html2);
  $1(sites.cnblogs.selector).each((i, v) => {
    const title = $1(v).text()
    const href = $1(v).attr('href')
    cnblogs.push(link(href, title, sites.cnblogs.url))
  })
  await page2.waitForTimeout(3000)

  const page3 = await context.newPage();
  await page3.goto(sites.segmentfault.url);
  const html3 = await page3.content();

  const $2 = cheerio.load(html3);
  $2(sites.segmentfault.selector).each((i, v) => {
    const title = $2(v).text()
    const href = $2(v).attr('href')
    segmentfault.push(link(href, title, sites.segmentfault.url))
  })

  await page1.close();
  await page2.close();
  await page3.close();

  await context.close();
  await browser.close();

  return { juejin, cnblogs, segmentfault }

}

module.exports = {
  run
}