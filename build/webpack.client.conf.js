//wepback-client-conf.js
const webpack = require('webpack')
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

module.exports = merge(baseConfig, {
  //server端入口文件
  entry: {
    client: './src/entry-client.js'
  },
  resolve: {
    alias: {
      // 'create-api': './create-api-client.js'
    }
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': '"client"'
    }),
    // 此插件在输出目录中
    // 生成 `vue-ssr-client-manifest.json`。
    new VueSSRClientPlugin()
  ],

  // webpack4不再提供 webpack.optimize.CommonsChunkPlugin 来分割代码，需要用到新的属性 optimization.splitChunks
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    // minimizer: true, // 最小化，production模式默认true
    splitChunks:{
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          priority: -10,
          reuseExistingChunk: false,
          test: /node_modules\/(.*)\.js/
        },
        styles: {
          name: 'styles',
          test: /\.(scss|css)$/,
          chunks: 'all',
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    }
  }

})


// SWPrecacheWebpackPlugin是一个webpack插件，用于使用service worker来缓存外部项目依赖项。 它将使用sw-precache生成service worker文件并将其添加到您的构建目录。为了在service worker中生成预缓存的名单, 这个插件必须应用在assets已经被webpack打包之后
// https://www.npmjs.com/package/sw-precache-webpack-plugin
// if (process.env.NODE_ENV === 'production') {
//   config.plugins.push(
//     // auto generate service worker
//     new SWPrecachePlugin({
//       cacheId: 'vue-hn',
//       filename: 'service-worker.js',
//       minify: true,
//       dontCacheBustUrlsMatching: /./,
//       staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
//       runtimeCaching: [
//         {
//           urlPattern: '/',
//           handler: 'networkFirst'
//         },
//         {
//           urlPattern: /\/(top|new|show|ask|jobs)/,
//           handler: 'networkFirst'
//         },
//         {
//           urlPattern: '/item/:id',
//           handler: 'networkFirst'
//         },
//         {
//           urlPattern: '/user/:id',
//           handler: 'networkFirst'
//         }
//       ]
//     })
//   )
// }