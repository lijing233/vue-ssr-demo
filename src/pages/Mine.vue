<!-- Mine -->
<template>
  <div class="mine-container">
    <h2>This is Mine Page</h2>
    <!-- <div>{{ fooCount }}</div> -->
    <img src="../assets/images/testImg.jpg" alt="">
  </div>
</template>

<script>
// 在这里导入模块，而不是在 `store/index.js` 中
// import fooStoreModule from '../store/modules/foo'
export default {
  // asyncData ({ store }) {
  //   store.registerModule('foo', fooStoreModule)
  //   return store.dispatch('foo/inc')
  // },

  name: 'Mine',
  data () {
    return {
    };
  },

  components: {},

  computed: {
    // fooCount () {
    //   return this.$store.state.foo.count
    // }
  },

  mounted() {},

  // 重要信息：当多次访问路由时，
  // 避免在客户端重复注册模块。
  destroyed () {
    // this.$store.unregisterModule('foo')
  },

  methods: {}
}

</script>

<style lang="scss" scoped>
.mine-container{
  img{
    width: 100%;
    height: 300px;
  }
}
</style>
