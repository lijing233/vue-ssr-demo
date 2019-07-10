const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const LRU = require('lru-cache')
const {
  createBundleRenderer
} = require('vue-server-renderer')


const isProd = process.env.NODE_ENV === 'production'
const resolve = file => path.resolve(__dirname, file)

function createRenderer (bundle, options) {
  // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
  return createBundleRenderer(bundle, Object.assign(options, {
    // for component caching
    cache: new LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15
    }),
    // this is only needed when vue-server-renderer is npm-linked
    basedir: resolve('./dist'),
    // recommended for performance
    runInNewContext: false
  }))
}

let render = null
const templateHtmlPath = resolve('../public/index.template.html')

if (isProd) {
  // prod mode
  const template = fs.readFileSync(templateHtmlPath, 'utf-8')
  const serverBundle = require(resolve('../dist/vue-ssr-server-bundle.json'))
  const clientManifest = require(resolve('../dist/vue-ssr-client-manifest.json'))
  render = createRenderer(serverBundle, {
    template,
    clientManifest
  })
} else {
  // dev mode 待添加
}

module.exports = render