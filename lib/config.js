module.exports= {
  from:'xxx@qq.com',    // 发送者的邮箱
  to:"xxx@hotmail.com", // 接收者的邮箱地址
  mailOptions:{
    service:'qq',        // 邮箱服务器名称
    host: "smtp.qq.com", // 邮箱服务器地址
    port: 587,           // 邮箱服务器端口
    secure: false,
    auth: {
      user:'xxx@qq.com', // 邮箱账户
      pass:'xxxxxxxxx'   // 邮箱服务器密码
    },
  }
}