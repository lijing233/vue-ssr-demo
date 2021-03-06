const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const LRU = require('lru-cache')
const {
  createBundleRenderer
} = require('vue-server-renderer')
const isProd = process.env.NODE_ENV === 'production'
const setUpDevServer = require('./setup-dev-server')
// const HtmlMinifier = require('html-minifier').minify

const pathResolve = file => path.resolve(__dirname, file)

module.exports = app => {
  return new Promise((resolve, reject) => {
    const createRenderer = (bundle, options) => {
      return createBundleRenderer(bundle, Object.assign(options, {
        cache: new LRU({
          max: 1000,
          maxAge: 1000 * 60 * 15
        }),
        basedir: pathResolve('../dist'),
        runInNewContext: false
      }))
    }

    const templateHtmlPath = pathResolve('../public/index.template.html')

    let renderer = null
    if (isProd) {
      // prod mode
      // const template = HtmlMinifier(fs.readFileSync(pathResolve('../public/index.html'), 'utf-8'), {
      //   collapseWhitespace: true,
      //   removeAttributeQuotes: true,
      //   removeComments: false
      // })
      const template = fs.readFileSync(templateHtmlPath, 'utf-8')
      const bundle = require(pathResolve('../dist/vue-ssr-server-bundle.json'))
      const clientManifest = require(pathResolve('../dist/vue-ssr-client-manifest.json'))
      renderer = createRenderer(bundle, {
        template,
        clientManifest
      })
    } else {
      // dev mode
      setUpDevServer(app, (bundle, options) => {
        try {
          renderer = createRenderer(bundle, options)
          resolve(app)
        } catch (e) {
          console.log(chalk.red('\nServer error'), e)
        }
      })
    }

    app.use(async (ctx, next) => {
      if (!renderer) {
        ctx.type = 'html'
        ctx.body = 'waiting for compilation... refresh in a moment.'
        next()
        return
      }

      let status = 200
      let html = null
      const context = {
        url: ctx.url,
        title: 'OK'
      }


      console.log('context', context);
      console.log('ctx.type :', ctx.type);
      try {
        status = 200
        html = await renderer.renderToString(context)
      } catch (e) {
        console.log('e :', e);
        console.log(e.code === 404);
        console.log(e.code === '404');
        if (e.code === 404) {
          status = 404
          html = '404 | Not Found'
          /* TODO: 处理重定向 */
          // context.url = '/404'
          // context.title = status
          // html = await renderer.renderToString(context)
          // ctx.redirect('/404')
        } else {
          status = 500
          // console.log(e)
          console.log(chalk.red('\nError: '), e.message)
          html = '500 | Internal Server Error'
          /* TODO: 处理重定向 */
          // context.url = '/500'
          // context.title = status
          // html = await renderer.renderToString(context)
        }
      }
      console.log('try-catch-end');
      ctx.type = 'html'
      ctx.status = status || ctx.status
      ctx.body = html
      next()
    })

    if (isProd) {
      resolve(app)
    }
  })
}
