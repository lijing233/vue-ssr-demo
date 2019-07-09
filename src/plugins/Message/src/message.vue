<!-- message -->
<template>
  <transition name="el-message-fade">
    <div
      v-show="visible"
      :class="[
        'lee-message',
        type && `lee-message--${ type }`,
      ]"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
      @touchmove="clearTimer"
      @touchend="startTimer"
    >
      {{ message }}
    </div>
  </transition>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      visible: false,
      type: 'toast',
      message: '',
      duration: 3000,
      timer: null,
      closed: false
    }
  },
  components: {},

  computed: {},

  mounted () {
    this.startTimer()
  },

  watch: {
    closed (newVal) {
      if (newVal) {
        this.visible = false
        this.$el.addEventListener('transitionend', this.destroyElement)
      }
    }
  },

  methods: {
    destroyElement () {
      this.$el.removeEventListener('transitionend', this.destroyElement)
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
    },
    close () {
      this.closed = true
    },
    clearTimer () {
      clearTimeout(this.timer)
    },
    startTimer () {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (this.visible) {
            this.close()
          }
        }, this.duration)
      }
    }
  }
}

</script>
<style lang='scss' scoped>

  .lee-message{
    box-sizing: border-box;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    min-width: 150px;
    max-width: 200px;
    min-height: 50px;
    border-radius: 5px;
    padding: 15px 15px 15px 20px;
    font-size: 14px;
    text-align: center;
    transition: all 0.3s;
  }
  .lee-message--toast{
    background: #4c4c4cd6;
    // border: 1px solid #ebeef5;
    color: #fff;
  }
  .lee-message--info{
    background: #edf2fc;
    border: 1px solid #ebeef5;
    color: #909399;
  }
  .lee-message--warn{
    background-color: #fdf6ec;
    border: 1px solid #faecd8;
    color: #e6a23c;
  }
  .lee-message--success{
    background-color: #f0f9eb;
    border: 1px solid #e1f3d8;
    color: #67c23a;
  }
  .lee-message--error{
    background-color: #fef0f0;
    border: 1px solid #fde2e2;
    color: #f56c6c;
  }

.el-message-fade-enter,
.el-message-fade-leave-active {
  opacity: 0;
  transform: translate(-50%, -100%);
}
</style>
