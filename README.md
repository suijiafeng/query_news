### 在此之前，默认你已经具备了nodejs基础知识，并且`npm install` 或者 `yarn` 下载好了依赖包。

step 1：设置邮箱配置  

``` /lib/malier.js

user:'xxxxx@qq.com' // 您的邮箱的账户
pass:'xxx'  //  您的邮箱的密码
from:'xxxxxx@qq.com' // 发送者的邮箱地址
to:"xxxxxx@hotmail.com" // 接收者的邮箱地址

```

step 2：执行邮件程序

```
npm run test   // 测试程序可用性

npm run pm2   // 正式运行程序

```

step 3：执行成功后，每天上午10:00将会获取 juejin 、segmentfault 前端最新文章，并邮件形式发送到您指定的邮箱。





