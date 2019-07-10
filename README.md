# Vue-SSR-Demo

vue

webpack 4.x

Koa

vuex

axios





### webpack4配置中遇到的问题和解决办法

#### 1.路由懒加载在 webpack4 中报错

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



#### 2.使用 extract-text-webpack-plugin 报错

webpack4中分割css代码使用mini-css-extract-plugin

或 npm install extract-text-webpack-plugin@next （此方法未尝试）



#### 3.配置webpack环境参数

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

