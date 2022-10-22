const browser = require('./lib/browser')
const sendMail = require('./lib/mailer')
const dayjs = require('dayjs')
const nodeCron = require("node-cron")

const run = (e) => {
  browser.run().then(info => {
    const content = Object.entries(info).flat(Infinity).map(item => {
      if (item.indexOf('<') > -1) return item
      return `<br/><b>${item} 推荐：</b>`
    })
    const date = dayjs().format('YYYY/MM/DD HH:mm:ss')
    console.log(`running at ${date}`);
    sendMail(date, content.join('<br/>'))
  }).catch(err => {
    console.log('err', err)
  })
}

if (process.env.NODE_ENV === 'test') {
  run()
} else {
    // 生产环境
    // 这里设置定时任务 https://cron.qqe2.com/
  nodeCron.schedule('55 21,11 * * *', run);
  console.log('schedule runing')
}
