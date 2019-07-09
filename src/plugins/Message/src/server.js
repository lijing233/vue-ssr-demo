import Vue from 'vue'
import MessageTemplate from './message.vue'
import PopupManager from '../../popupManager.js'

let MessageConstructor = Vue.extend(MessageTemplate)

let instance
let instances = []
let seed = 1

const Message = function (options) {
  if (Vue.prototype.$isServer) return
  options = options || {}
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }

  let id = `message_${seed++}`
  options.onClose = function () {
    Message.close(id)
  }
  instance = new MessageConstructor({
    data: options
  })
  instance.id = id
  instance.vm = instance.$mount()
  instance.dom = instance.vm.$el
  document.body.appendChild(instance.dom)
  instance.vm.visible = true
  instance.dom.style.zIndex = PopupManager.nextZIndex()
  instances.push(instance)
  return instance.vm
};

// 定义message.success('成功')的调用方法
['success', 'warning', 'info', 'error'].forEach(type => {
  Message[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options
      }
    }
    options.type = type
    return Message(options)
  }
})

// instances中删除message
Message.close = function (id) {
  for (let i = 0, len = instances.length; i < len; i++) {
    if (id === instances[i].id) {
      instances.splice(i, 1)
      break
    }
  }
}

export default Message
