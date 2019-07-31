<!-- test -->
<template>
  <div class="test-container">
    <h2>test page</h2>
    <img
      src="../assets/images/testImg.jpg"
      alt=""
    >
    <div>
      <input
        v-model="inpVal"
        type="text"
        @input="inpChangeFun"
      >
    </div>
  </div>
</template>

<script>
import {throttle, throttleTimeOut} from '../util/throttle-debounce/my/throttle'
export default {
  name: 'Test',

  components: {},
  data () {
    return {
      inpVal: '',
    };
  },

  computed: {},

  // mounted() {},

  methods: {
    // inpChangeFun: throttle(function() {
    //   console.log(this.inpVal);
    //   // console.log(this);
    //   console.log('调用搜索接口');
    // }, 1000),
    inpChangeFun: throttleTimeOut(function() {
      console.log(this.inpVal);
      // console.log(this);
      console.log('调用搜索接口');
    }, 1000),
    // inpChangeFun() {
    //   console.log(this.inpVal);
    // }
  }
}

</script>
<style lang='scss' scoped>
.test-container{
  img{
    width: 100%;
    height: 300px;
  }
}
</style>
