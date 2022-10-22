const nodemailer = require("nodemailer");
const fs = require('fs')
const path = require('path');
const {mailOptions,from,to}  = require('./config')

module.exports = function (subject,html) {
  const mailer = nodemailer.createTransport(mailOptions)
  mailer.sendMail({from,to,subject,html},function(error,info){
    if(error)throw error;
    const message = `${subject} 邮件发送成功`
    console.log(message)
    fs.writeFileSync(path.resolve(__dirname,'../log.txt'), message  +'\n',{flag:'a'})
    return res.send({error:false, data: info, message: 'OK'})
  });
}
