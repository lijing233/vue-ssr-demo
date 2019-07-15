const fs = require('fs')
const path = require('path')
// const chalk = require('chalk')
const LRU = require('lru-cache')
const {
  createBundleRenderer
} = require('vue-server-renderer')
// const ServerBundleJson =
const setupDevServer = require('./dev.server')


const isProd = process.env.NODE_ENV === 'production'
const pathResolve = file => path.resolve(__dirname, file)

function createRenderer (bundle, options) {
  // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
  return createBundleRenderer(bundle, Object.assign(options, {
    // for component caching
    cache: new LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15
    }),
    // this is only needed when vue-server-renderer is npm-linked
    basedir: pathResolve('./dist'),
    // recommended for performance
    runInNewContext: false
  }))
}



const getRender = (app) => {
  return new Promise((resolve, reject) => {
    let render = null
    const templateHtmlPath = pathResolve('../public/index.template.html')

    console.log('1');
    if (isProd) {
      console.log('2-prod');
      // prod mode
      const template = fs.readFileSync(templateHtmlPath, 'utf-8')
      console.log('3-prod');
      const serverBundle = require(pathResolve('../dist/vue-ssr-server-bundle.json'))
      console.log('4-prod');
      const clientManifest = require(pathResolve('../dist/vue-ssr-client-manifest.json'))
      render = createRenderer(serverBundle, {
        template,
        clientManifest
      })
      console.log('prod--render', render);
      resolve(render)
    } else {
      console.log('2-dev');
      // dev mode 待添加
      setupDevServer(app, templateHtmlPath, (bundle, options) => {
        render = createRenderer(bundle, options)
        console.log('dev-resolve');
        resolve(render)
      })
    }
    console.log('done');
    // return render
  })

}

module.exports = getRender
