module.exports = {
  root: true,
  parserOptions: {
    "ecmaVersion": 6, // ECMAScript 版本
    "parser": "babel-eslint",
    "sourceType": 'module'
  },
  // 全局变量
  globals: {
  },
  env: {
    "browser": true,
    "node": true,
    "commonjs": true,
    "amd": true,
    "es6":true,
  },
  plugins: [
    "vue"
  ],
  extends: [
    'plugin:vue/recommended'
  ],
  rules: {
    /**
     * 语法校验
     */
    // 禁止条件表达式中出现赋值操作符
    "no-cond-assign": 2,
    // 禁止 function 定义中出现重名参数
    "no-dupe-args": 2,
    // 禁止对象字面量中出现重复的 key
    "no-dupe-keys": 2,
    // 禁止重复的 case 标签
    "no-duplicate-case": 2,
    // 禁止空语句块
    "no-empty": 2,
    // 禁止不必要的分号
    "no-extra-semi": 2,
    // 禁止对 function 声明重新赋值
    "no-func-assign": 2,
    //  禁止在嵌套的块中出现 function 或 var 声明
    "no-inner-declarations": [2, "functions"],
    // 禁止在字符串和注释之外不规则的空白
    "no-irregular-whitespace": 2,
    // 禁止把全局对象 (Math 和 JSON) 作为函数调用  错误：var math = Math();
    "no-obj-calls": 2,
    // 禁止出现令人困惑的多行表达式
    "no-unexpected-multiline": 2,
    // 禁止在return、throw、continue 和 break语句之后出现不可达代码
    "no-unreachable": 2,
    // 要求使用 isNaN() 检查 NaN
    "use-isnan": 2,
    // typeof foo === "undefimed" 错误
    "valid-typeof": 2,
    // switch 语句强制 default 分支，也可添加 // no default 注释取消此次警告
    "default-case": 2,
    // 使用 === 替代 == allow-null允许null和undefined==
    "eqeqeq": [2, "allow-null"],
    // 禁用 alert、confirm 和 prompt
    "no-alert": 1,
    // 不允许在 case 子句中使用词法声明
    "no-case-declarations":2,
    // 禁止出现空函数.如果一个函数包含了一条注释，它将不会被认为有问题。
    "no-empty-function":1,
    // 禁用 eval()
    "no-eval": 2,
    // 禁止使用 var 多次声明同一变量
    "no-redeclare": 2,
    // 禁止自身比较
    "no-self-compare": 2,
    // // 禁用未使用过的标签
    // "no-unused-labels":2,
    // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
    "no-undef": 2,
    // 禁止出现未使用过的变量
    "no-unused-vars": [2, { "vars": "all", "args": "none" }],
    // 不允许在变量定义之前使用它们
    "no-use-before-define": 0,

    //////////////////////////
    // Node.js and CommonJS //
    //////////////////////////

    // require return statements after callbacks
    "callback-return":0,
    // 要求 require() 出现在顶层模块作用域中
    "global-require": 1,
    // 要求回调函数中有容错处理
    "handle-callback-err": [2, "^(err|error)$"],
    // 禁止混合常规 var 声明和 require 调用
    "no-mixed-requires": 0,
    // 禁止调用 require 时使用 new 操作符
    "no-new-require": 2,
    // 禁止对 __dirname 和 __filename进行字符串连接
    "no-path-concat": 0,
    // 禁用 process.env
    "no-process-env": 0,
    // 禁用 process.exit()
    "no-process-exit": 0,
    // 禁用同步方法
    // "no-sync": 0,

    /**
     * 风格规范
     */
    // 指定数组的元素之间要以空格隔开(, 后面)， never参数：[ 之前和 ] 之后不能带空格，always参数：[ 之前和 ] 之后必须带空格
    "array-bracket-spacing": [2, "never"],
    // 禁止或强制在单行代码块中使用空格(禁用)
    "block-spacing":[1,"never"],
    // 控制逗号前后的空格
    "comma-spacing": [2, { "before": false, "after": true }],
    // 文件末尾强制换行
    "eol-last": 2,
    // 换行
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    // 强制在对象字面量的属性中键和值之间使用一致的间距
    "key-spacing": [2, { "beforeColon": false, "afterColon": true }],
    // 不允许空格和 tab 混合缩进
    "no-mixed-spaces-and-tabs": 2,
    //  禁用行尾空格
    "no-trailing-spaces": 2,
    // 强制使用一致的反勾号、双引号或单引号
    "quotes": [2, "single", "avoid-escape"],
  }
}