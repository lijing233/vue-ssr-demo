//wepback-base-conf.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html文件
const CleanWebpackPlugin = require('clean-webpack-plugin'); //每次build的时候清空之前的目录
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');


//把所有路径定位到项目工程根目录下
function resolve(dir) {
    return path.resolve(__dirname, dir);
}

module.exports = {
    devtool: 'source-map',
    mode: 'none',
    entry: {
        main: resolve('../www/entry-server.js'),
    },
    output: {
        path: resolve('dist'),
        filename: '[hash].[name].[id].js'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': resolve('../www')
        }
    },
    devServer: {
        contentBase: resolve('dist'),
        historyApiFallback: true, //不跳转
        // inline: true, //实时刷新
        hot: true
    },
    //webpack 4 分割代码块的插件
    optimization: {
        splitChunks: {
            chunks: "async",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('../www'), resolve('../node_modules/webpack-dev-server/client')],
                options: {
                    "plugins": [
                        "dynamic-import-webpack"
                    ]
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // new HtmlWebpackPlugin({
        //     title: 'Development',
        //     // template: resolve('src/index.html')
        // }),
        new VueLoaderPlugin()
    ]
}