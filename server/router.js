const Router = require('koa-router')
const router = new Router()
// const getRender = require('./render')

const createRouter = (renderer) => {
  console.log('router');
  console.log(renderer);
  // const render = getRender(app);
  // console.log('renderer', renderer);
  router.get('*', async (ctx, next) => {
    if (!renderer) {
      ctx.type = 'html'
      ctx.body = 'no render! waiting for compilation... refresh in a moment.'
      next()
      return
    }

    const context = {
      url: ctx.url,
      title: 'lj-test-title'
    }

    const html = await renderer.renderToString(context)
    ctx.body = html
    next()
  })

  return router.routes()

}

module.exports = createRouter

