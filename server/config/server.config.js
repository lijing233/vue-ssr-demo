const ENV_CONFIG = require(`../../env_config/${process.env.env_config}.env`)
module.exports = {
  app: {
    port: 8686, // 监听的端口
    devHost: '127.0.0.1', // 开发环境下打开的地址，监听了0.0.0.0，但是不是所有设备都支持访问这个地址，用127.0.0.1或localhost代替
    open: true // 是否打开浏览器
  },
  proxy: {
    base: ENV_CONFIG.TARGET_API || '/proxy',
    config: {
      target: ENV_CONFIG.BASE_API,
      changeOrigin: true,
      // agent: new httpsProxyAgent('http://1.2.3.4:88'), // if you need or just delete this line
      rewrite: path => path.replace(/^\/proxy/, ''),
      logs: true
    }
  }
}
