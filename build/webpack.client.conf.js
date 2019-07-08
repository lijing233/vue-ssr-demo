//wepback-client-conf.js
const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack-base-conf');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

//把所有路径定位到项目工程根目录下
function resolve(dir) {
    return path.resolve(__dirname, dir);
}


module.exports = merge(baseConfig, {
    //server端入口文件
    entry: {
        client: resolve('../www/entry-client.js')
    },
    // 这允许 webpack 以 Node 适用方式(Node-appropriate fashion)处理动态导入(dynamic import)，
    // 并且还会在编译 Vue 组件时，
    // 告知 `vue-loader` 输送面向服务器代码(server-oriented code)。
    // target: 'node',

    devtool: 'source-map',

    output: {
        // libraryTarget: 'commonjs2'
        path: resolve('../www/dist/client')
    },
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
    // externals: nodeExternals({
    //     // 不要外置化 webpack 需要处理的依赖模块。
    //     // 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
    //     // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
    //     whitelist: /\.css$/
    // }),
    plugins: [
        new HtmlWebpackPlugin({
            template: resolve('../www/index.template.html')
        }),
        // 此插件在输出目录中
        // 生成 `vue-ssr-client-manifest.json`。
        new VueSSRClientPlugin()
    ]
})