const path = require('path');
const Koa = require('koa');
const logger = require('koa-logger')
const router = require('./server/routes/index.js') //后端路由文件
const staticify = require('koa-static');
const home = staticify(path.resolve(__dirname, './www/dist/client'))

console.log(path.resolve(__dirname, './www/dist/client'))
// const webserve = require('koa-static');
// const home = webserve(path.resolve(__dirname, './www'));

let app = new Koa();
app.use(logger())
  .use(home)

app.use(router.routes())
  .use(router.allowedMethods())
  .listen(8088, (ctx) => {
    console.log(`server is runnning at 8088`)
  });