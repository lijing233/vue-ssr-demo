const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const MFS = require('memory-fs')
const webpack = require('webpack')
const chokidar = require('chokidar')
const serverConfig = require('../build/webpack.server.conf')
const webConfig = require('../build/webpack.client.conf')
const webpackDevMiddleware = require('./middleware/dev-middleware')
const webpackHotMiddleware = require('./middleware/hot-middleware')
// const readline = require('readline')
const conf = require('./config/server.config')
const {
  openBrowser
} = require('./lib')

const readFile = (fs, file) => {
  try {
    return fs.readFileSync(path.join(webConfig.output.path, file), 'utf-8')
  } catch (e) {
    console.log(e);
  }
}

module.exports = (app, cb) => {
  let bundle, template, clientManifest, serverTime, webTime, apiTime
  let isFrist = true

  // const clearConsole = () => {
  //   if (process.stdout.isTTY) {
  //     // Fill screen with blank lines. Then move to 0 (beginning of visible part) and clear it
  //     const blank = '\n'.repeat(process.stdout.rows)
  //     console.log(blank)
  //     readline.cursorTo(process.stdout, 0, 0)
  //     readline.clearScreenDown(process.stdout)
  //   }
  // }

  const update = () => {
    if (bundle && template && clientManifest) {
      if (isFrist) {
        const url = 'http://' + conf.app.devHost + ':' + conf.app.port
        console.log(chalk.bgGreen.black(' DONE ') + ' ' + chalk.green(`Compiled successfully in ${serverTime + webTime + apiTime}ms`))
        console.log()
        console.log(`  App running at: ${chalk.cyan(url)}`)
        console.log()
        console.log('  Note that the development build is not optimized.')
        console.log()
        if (conf.app.open) openBrowser(url)
        isFrist = false
      }
      cb(bundle, {
        template,
        clientManifest
      })
    }
  }

  // web server for ssr
  const serverCompiler = webpack(serverConfig)
  const mfs = new MFS()
  serverCompiler.outputFileSystem = mfs
  serverCompiler.watch({}, (err, stats) => {
    if (err) throw err
    stats = stats.toJson()
    if (stats.errors.length) return
    // console.log('server-dev...')
    bundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json'))
    update()
  })
  serverCompiler.plugin('done', stats => {
    stats = stats.toJson()
    stats.errors.forEach(err => console.error(err))
    stats.warnings.forEach(err => console.warn(err))
    if (stats.errors.length) return

    serverTime = stats.time
  })

  // web
  webConfig.entry.app = ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true', webConfig.entry.app]
  webConfig.output.filename = '[name].js'
  webConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
  const clientCompiler = webpack(webConfig)
  const devMiddleware = webpackDevMiddleware(clientCompiler, {
    // publicPath: webConfig.output.publicPath,
    stats: { // or 'errors-only'
      colors: true
    },
    reporter: (middlewareOptions, options) => {
      const { log, state, stats } = options

      if (state) {
        const displayStats = (middlewareOptions.stats !== false)

        if (displayStats) {
          if (stats.hasErrors()) {
            log.error(stats.toString(middlewareOptions.stats))
          } else if (stats.hasWarnings()) {
            log.warn(stats.toString(middlewareOptions.stats))
          } else {
            log.info(stats.toString(middlewareOptions.stats))
          }
        }

        let message = 'Compiled successfully.'

        if (stats.hasErrors()) {
          message = 'Failed to compile.'
        } else if (stats.hasWarnings()) {
          message = 'Compiled with warnings.'
        }
        log.info(message)

        // clearConsole()

        update()
      } else {
        log.info('Compiling...')
      }
    },
    noInfo: true,
    serverSideRender: false
  })

  app.use(devMiddleware)

  const templatePath = path.resolve(__dirname, '../public/index.template.html')

  // read template from disk and watch
  template = fs.readFileSync(templatePath, 'utf-8')
  chokidar.watch(templatePath).on('change', () => {
    template = fs.readFileSync(templatePath, 'utf-8')
    console.log('index.html template updated.')
    update()
  })

  clientCompiler.plugin('done', stats => {
    stats = stats.toJson()
    stats.errors.forEach(err => console.error(err))
    stats.warnings.forEach(err => console.warn(err))
    if (stats.errors.length) return

    clientManifest = JSON.parse(readFile(
      devMiddleware.fileSystem,
      'vue-ssr-client-manifest.json'
    ))

    webTime = stats.time
  })
  app.use(webpackHotMiddleware(clientCompiler))
  // app.use(require('webpack-hot-middleware')(clientCompiler, { heartbeat: 5000 }))
}
