const axios = require('axios')

module.exports= function(){
  const data = {"id_type":2,"sort_type":300,"cate_id":"6809637767543259144","tag_id":"6809640407484334093","cursor":"0","limit":20}
  return axios({
    url:'https://api.juejin.cn/recommend_api/v1/article/recommend_cate_tag_feed',
    method: 'post',
    data,
    headers:{
      "v": "1.0",
      "referer": "https://juejin.cn/",
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36"
    }
  }).then(res => {
    const list  = res.data.data??[]
    return list.map(item=>(`<a href="https://juejin.cn/post/${item.article_id}">${item.article_info.title}</a>`))
  })
}
