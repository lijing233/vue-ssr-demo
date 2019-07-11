<!-- Home -->
<template>
  <div>
    <h2>This is Home Page</h2>
    <div>vuex 获取homeInfo数据：{{homeInfo}}</div>
  </div>
</template>

<script>
export default {
  asyncData ({ store, route }) {
    // 触发 action 后，会返回 Promise
    // console.log('asyncData-Home', route);
    return store.dispatch('getHomeInfo')
  },
  name: 'Home',
  data () {
    return {
    };
  },

  components: {},

  computed: {
    // 从 store 的 state 对象中的获取 item。
    homeInfo () {
      return this.$store.state.homeInfo
    }
  },

  mounted() {
    console.log('window.__INITIAL_STATE__', window.__INITIAL_STATE__);
  },

  methods: {}
}

</script>
<style scoped>
</style>