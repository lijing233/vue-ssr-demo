//wepback-base-conf.js
const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

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
    filename: '[name].[chunkhash].js'
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
      {
        test: /\.css$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader', 
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
            options: {
              hmr: !isProd,
            },
          },
          'css-loader',
          'sass-loader'
        ],
      },
      // ** TODO ** : eslint-loader 待添加
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: isProd ? '[name].[hash].css' : '[name].css',
      chunkFilename: isProd ? '[id].[hash].css' : '[id].css'
    }),
    new FriendlyErrorsPlugin(),
    new CopyWebpackPlugin([{
      from: resolve('../public'),
      to: resolve('../dist/public'),
      ignore: ['.*', 'index.template.html']
    }]),
    // ** TODO ** : 其他插件 待添加

    // new CleanWebpackPlugin(),
    // new webpack.NamedModulesPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
  ],

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