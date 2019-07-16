# Vue-SSR-Demo



## 使用说明

```shell
git clone https://github.com/lijing233/vue-ssr-demo.git
cd vue-ssr-demo
npm install
# 运行开发环境
npm run dev
# 打包并运行生产环境
npm run build
npm run start
```



## 使用到的相关技术点

vue

vue-router

vuex

axios

webpack 4.x

Koa2



## 添加了日志系统

- 使用koa-logger进行基本日志打印

- 使用log4js，并封装相关方法，进行日志收集和日志文件保存

  详情见 /server/config/log.config.js , /server/utils/log.js

  ```javascript
  // 引入
  require(~/utils/log.js)
  // 使用
  logInfo('test-inof')
  logResponse('test-response')
  logHandle('test-handle')
  logError('test-error')
  ```

  

- 日志保存在 /log 文件夹中

  ```shell
  npm run clearlog  # 清空日志
  ```

  



## 注意事项

### 1.vue的生命周期钩子函数中，  **beforeCreate**和 **created** 会在服务器端渲染(SSR)过程中被调用

### 2.使用window、document对象之前需要判断加载环境（process.env.VUE_ENV）

### 3.vue-router 路由模式必须为history



## TODO:

### 1.sass部分提取文件，当配置mini-css-extract-plugin时打包成功，但使用到sass的页面不能正常访问

fixed! -- 0712

服务端不可分割css，所以对webpack服务端和客户端配置做了区分，客户端部分进行代码分割，服务端不做

### 2.eslint

done! 已添加 -- 0712

### 3.dev-server 本地环境部分开发

done! -- 0716

### 4.koa代码优化，缓存机制等

​	const HtmlMinifier = require('html-minifier').minify

### 5.head管理

### 6.ts(优先级低)

### 7.postcss-loader

### 8.koa日志、路由异常处理、重定向等

添加日志记录，日志收集，打印日志公共方法 -- 0716







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

