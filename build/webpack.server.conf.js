//webpack-server-conf.js

const path = require('path');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const baseConfig = require('./webpack-base-conf');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

//把所有路径定位到项目工程根目录下
function resolve(dir) {
    return path.resolve(__dirname, dir);
}

module.exports = merge(baseConfig, {
    //server端入口文件
    entry: {
        server: resolve('../www/entry-server.js'),
    },
    // 这允许 webpack 以 Node 适用方式(Node-appropriate fashion)处理动态导入(dynamic import)，
    // 并且还会在编译 Vue 组件时，
    // 告知 `vue-loader` 输送面向服务器代码(server-oriented code)。
    target: 'node',

    devtool: 'source-map',

    output: {
        libraryTarget: 'commonjs2',
        path: resolve('../www/dist/client/')
    },

    externals: nodeExternals({
        // 不要外置化 webpack 需要处理的依赖模块。
        // 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
        // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
        whitelist: /\.css$/
    }),

    // 这是将服务器的整个输出
    // 构建为单个 JSON 文件的插件。
    // 默认文件名为 `vue-ssr-server-bundle.json`
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: resolve('../www/index.template.html'),
        //     filename: 'index.template.html',
        //     files: {
        //         js: 'client.bundle.js'
        //     },
        //     excludeChunks: ['server']
        // }),
        new VueSSRServerPlugin()
    ]
})