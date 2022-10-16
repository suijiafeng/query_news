const juejin = require('./lib/juejin')
const segmentfault = require('./lib/segmentfault')
const sendMail = require('./lib/mailer')
const dayjs = require('dayjs')
const nodeCron = require("node-cron")

async function main() {
  const content1 = await juejin()
  const content2 = await segmentfault()
  const content = ['<b>juejin推荐:</b>', ...content1, '<br/><b>segmentfault推荐:</b>', ...content2].join('<br/>')
  const date = dayjs().format('YYYY/MM/DD HH:mm:ss')
  sendMail(date, content)
}

// // https://github.com/node-cron/node-cron 
if (process.env.NODE_ENV === 'test') {
  main()
} else {
  nodeCron.schedule('0 10 * * *', () => {
    // 这里cron是每天上午10点整执行一次
    main()
    console.log('running a task every minute');
  });
}

