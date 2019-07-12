const Koa = require('koa')
const path = require('path')
const config = require('./server.config')
const koaStatic = require('koa-static');
const router = require('./router')

const resolve = file => path.resolve(__dirname, file)
// const isProd = process.env.NODE_ENV === 'production'

const app = new Koa()

// 生成静态资源服务
app.use(koaStatic(resolve('../dist', {
  maxAge: 30 * 24 * 60 * 60 * 1000
})))

app.use(router.routes())

app.listen(config.app.port || 3000, '0.0.0.0', () => {
  console.log('> server is staring...')
})
