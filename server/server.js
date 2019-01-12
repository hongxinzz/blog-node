const Koa = require('koa');
const Router = require('koa-router');
const path = require('path');
const mongoose = require('mongoose');
const serve = require('koa-static');
const app = new Koa();

const home   = serve(path.join(__dirname)+'/dist/');
// 创建一个主机名
const hostname = '0.0.0.0';
// 创建一个服务端号
const port = 80;
// 连接数据库 本地需要启动
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });

//使用bodyParser获取body(post方法)
app.use(home)
//引入数据库模型 并通过路由返回数据
  .use(require('./routers/article-router.js').routes())
  .use(require('./routers/message-router.js').routes())
  .use(require('./routers/user-router.js').routes());


app.listen(port, hostname, () => {
  console.log(`server running at http://${hostname}:${port}/`)
})

