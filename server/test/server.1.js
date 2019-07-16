const Koa = require('koa')
const path = require('path')
const config = require('../config/server.config')
const koaStatic = require('koa-static')
const logger = require('koa-logger')
// const createRouter = require('./router')
// const chalk = require('chalk')
// const getRender = require('./render')

const resolve = file => path.resolve(__dirname, file)
const isProd = process.env.NODE_ENV === 'production'
const SSR = require('../ssr')

// https证书问题会报错（待补充） 设置环境变量回避非授信证书的问题
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const app = new Koa()

app.use(logger())

// let renderer = null

// 生成静态资源服务
app.use(koaStatic(isProd ? resolve('../dist') : resolve('../public'), {
  maxAge: 30 * 24 * 60 * 60 * 1000
}))

// app.use(async (ctx, next) => {
//   console.log('bbbbgin');
//   renderer = await getRender(app)
//   console.log('renderer', renderer);
//   console.log('bbbend');
//   await next()
// })


// // 使用koa-router
// // app.use(createRouter(renderer))

// app.use(async (ctx, next) => {
//   console.log('请求');
//   if (!renderer) {
//     ctx.type = 'html'
//     ctx.body = 'waiting for compilation... refresh in a moment.'
//     next()
//     return
//   }

//   let status = 200
//   let html = null
//   const context = {
//     url: ctx.url,
//     title: 'OKOKOK'
//   }

//   try {
//     status = 200
//     html = await renderer.renderToString(context)
//   } catch (e) {
//     if (e.message === '404') {
//       status = 404
//       html = '404 | Not Found'
//     } else {
//       status = 500
//       console.log(chalk.red('\nError: '), e.message)
//       html = '500 | Internal Server Error'
//     }
//   }
//   ctx.type = 'html'
//   ctx.status = status || ctx.status
//   ctx.body = html
//   console.log('请求html', html);
//   console.log('next', next);
//   next()
// })

// app.listen(config.app.port || 3000, '0.0.0.0', () => {
//   console.log('> server is staring...')
// })


SSR(app).then(server => {
  server.listen(config.app.port, '0.0.0.0', () => {
    console.log('> server is staring...')
  })
})
