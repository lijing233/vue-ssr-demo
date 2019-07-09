//wepback-base-conf.js
const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')


//把所有路径定位到项目工程根目录下
function resolve(dir) {
  return path.resolve(__dirname, dir);
}

const isProd = process.env.NODE_ENV === 'production'

const extractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: !isProd
});

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
        ),
        options: {
          "plugins": [
            "dynamic-import-webpack"
          ]
        }
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      // ** TODO ** : sass-loader 待添加
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            'vue-style-loader',
            'css-loader',
            'sass-loader'
          ],
        })
      }

      // ** TODO ** : eslint-loader 待添加
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    extractSass
    // ** TODO ** : 其他插件 待添加

    // new CleanWebpackPlugin(),
    // new webpack.NamedModulesPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 2,
      maxAsyncRequests: 5,
      maxInitialRequests: 3
    }
  },
  //webpack 4 分割代码块的插件
  // optimization: {
  //   splitChunks: {
  //     chunks: "async",
  //     minSize: 30000,
  //     minChunks: 1,
  //     maxAsyncRequests: 5,
  //     maxInitialRequests: 3,
  //     automaticNameDelimiter: '~',
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
  // },

  
}