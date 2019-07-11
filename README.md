# Vue-SSR-Demo

vue

webpack 4.x

Koa

vuex

axios





## TODO:

### 1.sass部分提取文件，当配置mini-css-extract-plugin时打包成功，但使用到sass的页面不能正常访问

### 2.eslint

### 3.dev-server 本地环境部分开发

### 4.koa代码优化，缓存机制等

### 5.head管理

### 6.ts(优先级低)



## webpack4配置中遇到的问题和解决办法

### 1.路由懒加载在 webpack4 中报错

（**Support for the experimental syntax 'dynamicImport' isn't currently enabled**）

fixed: 

```js
// 1.安装插件babel-plugin-dynamic-import-webpack
  npm install babel-plugin-dynamic-import-webpack -D
  
// 2.webpack module中配置
  {
    test: /\.js$/,
    loader: 'babel-loader',
    // 确保 JS 的转译应用到 node_modules 的 Vue 单文件组件
    // exclude: /node_modules/
    exclude: file => (
       node_modules/.test(file) &&
       !/\.vue\.js/.test(file)
    ),
    options: {
      "plugins": [
        "dynamic-import-webpack"
       ]
    }
  },
```

或

```
npm install --save-dev @babel/plugin-syntax-dynamic-import
// .babelrc
{
  "plugins": [
    "@babel/plugin-syntax-dynamic-import",
  ]
}
```



### 2.使用 extract-text-webpack-plugin 报错

webpack4中分割css代码使用mini-css-extract-plugin

或 npm install extract-text-webpack-plugin@next （此方法未尝试）



### 3.配置webpack环境参数

npm script 中配置env.test参数为 lijing

```
"build:client": "webpack --config build/webpack.client.conf.js --env.test=lijing --progress",
```

webpack.config

```
// webpack配置env参数需要将配置作为函数导出
module.exports = (env, argv) => {
	console.log(env.test) // lijing
	return {
		... // 此处为配置项
	}
}
```



### 4.file-loader

我们配置url-loader来对较小图片做base64转化，以减少请求来优化新能

但对于超出转化临界值的资源，url-loader是无法处理的，任然需要安装file-loader,即便我们不需要在配置中显现的配置它

```shell
npm i -D file-loader
```



### 5.压缩JS及CSS文件

1.配置项

```
optimization.minimizer: true
```

2.插件

```js
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

new OptimizeCSSPlugin()
或
module.exports = {
    //...
    optimization: {
        minimizer: [
            // js mini
            new UglifyJsPlugin({
              cache: true,
              parallel: true,
              sourceMap: false // set to true if you want JS source maps
            }),
            // css mini
            new OptimizeCSSPlugin({})
        ]
    }
}
```

