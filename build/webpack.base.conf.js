//wepback-base-conf.js
const path = require('path');
// const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const EslintFriendlyFormatterPlugin = require('eslint-friendly-formatter')

//把所有路径定位到项目工程根目录下
function resolve(dir) {
  return path.resolve(__dirname, dir);
}

console.log('--当前环境--', process.env.NODE_ENV)
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  devtool: isProd ? 'none' : 'cheap-module-source-map', // 此选项控制是否生成，以及如何生成 source map
  mode: isProd ? 'production' : 'development',
  output: {
    path: resolve('../dist'),
    // publicPath: '/dist/',
    filename: 'js/[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'], // 自动解析确定的扩展
    alias: {
      '@': path.join(__dirname, '../src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        //指定检查的目录
        include: [resolve('../src')],
        //eslint检查报告的格式规范
        options: {
          formatter: EslintFriendlyFormatterPlugin
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        // 确保 JS 的转译应用到 node_modules 的 Vue 单文件组件
        // exclude: /node_modules/
        exclude: file => (
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file)
        )
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: 'assets/images/[name].[hash:8].[ext]'
          }
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'assets/media/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: 'assets/font/[name].[hash:8].[ext]'
          }
        }
      },
      // ** TODO ** : eslint-loader 待添加
    ]
  },
  plugins: isProd ? [
    new VueLoaderPlugin(),
    new OptimizeCSSPlugin()
  ] : [
    new VueLoaderPlugin(),
    new FriendlyErrorsPlugin(),


    // ** TODO ** : 其他插件 待添加
    // new webpack.NamedModulesPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
  ],

  // optimization: {
  //   splitChunks:{
  //     chunks: 'async',
  //     minSize: 30000,
  //     maxSize: 0,
  //     minChunks: 1,
  //     maxAsyncRequests: 5,
  //     maxInitialRequests: 3,
  //     automaticNameDelimiter: '~',
  //     automaticNameMaxLength: 30,
  //     name: true,
  //     cacheGroups: {
  //       vendor: {
  //         name: 'vendor',
  //         chunks: 'initial',
  //         priority: -10,
  //         reuseExistingChunk: false,
  //         test: /node_modules\/(.*)\.js/
  //       },
  //       // styles: {
  //       //   name: 'styles',
  //       //   test: /\.(scss|css)$/,
  //       //   chunks: 'all',
  //       //   minChunks: 1,
  //       //   reuseExistingChunk: true,
  //       //   enforce: true
  //       // },
  //       default: {
  //         minChunks: 2,
  //         priority: -20,
  //         reuseExistingChunk: true
  //       }
  //     }
  //   }
  // }

  //webpack 4 默认分割代码块配置
  // optimization: {
  //   splitChunks: {
  //     chunks: 'async',
  //     minSize: 30000,
  //     maxSize: 0,
  //     minChunks: 1,
  //     maxAsyncRequests: 5,
  //     maxInitialRequests: 3,
  //     automaticNameDelimiter: '~',
  //     automaticNameMaxLength: 30,
  //     name: true,
  //     cacheGroups: {
  //       vendors: {
  //         test: /[\\/]node_modules[\\/]/,
  //         priority: -10
  //       },
  //       default: {
  //         minChunks: 2,
  //         priority: -20,
  //         reuseExistingChunk: true
  //       }
  //     }
  //   }
  // }


}
