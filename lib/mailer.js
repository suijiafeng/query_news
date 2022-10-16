const nodemailer = require("nodemailer");
const fs = require('fs')
const path = require('path')

const user = 'xxxxx@qq.com' // 您的邮箱的账户
const pass = 'xxx'  //  您的邮箱的密码
const from = 'xxxxxx@qq.com' // 发送者的邮箱地址
const to = "xxxxxx@hotmail.com" // 接收者的邮箱地址

module.exports = function (subject, html) {
  const mailOptions = {
    service: 'qq',
    host: "smtp.qq.com", // 邮箱服务器
    port: 587,
    secure: false,
    auth: {
      user,
      pass
    },
  }
  const mailer = nodemailer.createTransport(mailOptions)
  mailer.sendMail({ from, to, subject, html }, function (error, info) {
    if (error) throw error;
    const message = subject + '邮箱发送成功'
    console.log(message)
    fs.writeFileSync(path.resolve(__dirname, '../log.txt'), message + '\n', { flag: 'a' })
    return res.send({ error: false, data: info, message: 'OK' })
  });
}
