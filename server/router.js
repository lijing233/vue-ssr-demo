const Router = require('koa-router')
const router = new Router()
const render = require('./render')

router.get('*', async (ctx, next) => {
  if (!render) {
    ctx.type = 'html'
    ctx.body = 'no render! waiting for compilation... refresh in a moment.'
    next()
    return
  }

  const context = {
    url: ctx.url,
    title: 'lj-test-title'
  }

  const html = await render.renderToString(context)
  ctx.body = html
  next()
})

module.exports = router

