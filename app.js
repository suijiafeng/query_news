const browser = require('./lib/browser')
const sendMail = require('./lib/mailer')
const dayjs = require('dayjs')
const nodeCron = require("node-cron")

const run = () => {
  const starting = dayjs().format('YYYY/MM/DD HH:mm:ss')
  console.log("starting",starting)
  browser.run().then((arr=[]) => {
    const content = arr.flat(Infinity)
    const running  = dayjs().format('YYYY/MM/DD HH:mm:ss')	  
    console.log('running', running);
    sendMail('每日一阅', content.join('<br/>'))
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
