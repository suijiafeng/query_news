const juejin = require('./lib/juejin')
const segmentfault = require('./lib/segmentfault')
const sendMail= require('./lib/mailer')
const dayjs = require('dayjs')


async function main(){
  const content1 = await juejin()
  const content2 = await segmentfault()
  const content = ['<b>juejin推荐:</b>',...content1,'<br/><b>segmentfault推荐:</b>',...content2].join('<br/>')
  const date = dayjs().format('YYYY/MM/DD')
  sendMail(date,content)
}
main()