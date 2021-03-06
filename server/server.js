const Koa = require('koa')
const path = require('path')
const config = require('./config/server.config')
const koaStatic = require('koa-static')
// const logger = require('koa-logger')
const proxy = require('koa-proxies')

const resolve = file => path.resolve(__dirname, file)
const isProd = process.env.NODE_ENV === 'production'
const ENV_CONFIG = require(`../env_config/${process.env.ENV_CONFIG}.env`)
const SSR = require('./ssr')

// https证书问题会报错（待补充） 设置环境变量回避非授信证书的问题
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const app = new Koa()

// 添加日志收集
if (isProd) {
  const logsUtil = require('./utils/log.js');
  app.use(async (ctx, next) => {
    const start = new Date();                             // 响应开始时间
    let intervals;                                            // 响应间隔时间
    try {
      await next();
      intervals = new Date() - start;
      logsUtil.logResponse(ctx, intervals);     //记录响应日志
    } catch (error) {
      intervals = new Date() - start;
      logsUtil.logError(ctx, error, intervals); //记录异常日志
    }
  })
}

// proxy客户端本地环境接口代理
console.log(!isProd && ENV_CONFIG.ENV === 'dev' && ENV_CONFIG.USE_PROXY === 'true');
if (!isProd && ENV_CONFIG.ENV === 'dev' && ENV_CONFIG.USE_PROXY === 'true') {
  console.log(config.proxy.base);
  console.log(config.proxy.config);
  app.use(proxy(config.proxy.base || '/proxy', config.proxy.config))
}

// app.use(logger())

// 生成静态资源服务
app.use(koaStatic(isProd ? resolve('../dist') : resolve('../public'), {
  maxAge: 30 * 24 * 60 * 60 * 1000
}))

SSR(app).then(server => {
  server.listen(config.app.port, '0.0.0.0', () => {
    console.log('> server is staring...')
  })
})
