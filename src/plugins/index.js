import Message from './Message'

const install = function (Vue) {
  Vue.prototype.$message = Message
  window.$message = Message
}

export default {
  install
}
