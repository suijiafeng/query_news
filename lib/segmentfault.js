const axios = require('axios')
const cheerio = require('cheerio')
const url = require('url')

module.exports = function(){
    const web={
      url:'https://segmentfault.com/channel/frontend###',
      selector:'.middle-wrap ul li h3 a'
    }
    return axios({
      url:web.url,
      method: 'get',
      data:{},
      headers:{
        "v": "1.0",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36"
      }
    }).then(res => {
      const html = res.data
      const $ = cheerio.load(html);
      const result = []
      $(web.selector).each((i,v)=>{
        const text = $(v).text()
        const href = $(v).attr('href')
        let html = ''
        if(/https?/.test(href)) {
          html = `<a href=${href}>${text}</a>`
        }else {
          const {host,protocol} = url.parse(web.url)
          html = `<a href='${protocol}//${host}${href}'>${text}</a>`
        }
        result.push(html)
      })
      return result
    })
  }