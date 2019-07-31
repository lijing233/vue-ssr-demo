<!-- test -->
<template>
  <div class="test-container">
    <h2>test page</h2>
    <!-- <img
      src="../assets/images/testImg.jpg"
      alt=""
    > -->
    <div class="block">
      <div class="title">
        节流防抖测试
      </div>
      <input
        v-model="inpVal"
        type="text"
        @input="inpChangeFun"
      >
    </div>
    <!-- 居中问题 -->
    <div class="block">
      <div class="title">
        居中测试
      </div>
      <div class="middle-div">
        <span class="sp1">居中</span>
        <span class="sp2">居中</span>
      </div>
      <div class="middle-div2">
        <span class="sp1">居中</span>
        <span class="sp2">居中</span>
      </div>
      <div class="middle-div3">
        <span class="sp1">居中</span>
        <span class="sp2">居中</span>
      </div>
      <div class="middle-div4">
        <span class="sp1">居中</span>
        <span class="sp2">居中</span>
      </div>
    </div>
    <!-- 1px问题 -->
    <div class="block">
      <h2>dpr:{{ devicePixelRatio }}</h2>
      <div class="title">
        1px
      </div>
      <div class="bordertit">
        1px
      </div>
      <ul class="testborder">
        <li class="yi">
          1
        </li>
        <li class="yi">
          2
        </li>
      </ul>

      <div class="bordertit">
        0.5px
      </div>
      <ul class="testborder">
        <li class="dianwu">
          1
        </li>
        <li class="dianwu">
          2
        </li>
      </ul>

      <div class="bordertit">
        0.3px
      </div>
      <ul class="testborder">
        <li class="diansan">
          1
        </li>
        <li class="diansan">
          2
        </li>
      </ul>

      <div class="bordertit">
        transform
      </div>
      <ul class="testborder">
        <li class="trans">
          1
        </li>
        <li class="trans">
          2
        </li>
      </ul>

      <div class="bordertit">
        transform 边框带圆角
      </div>
      <div class="transb" />
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
      devicePixelRatio: ''
    };
  },

  computed: {},

  mounted() {
    this.devicePixelRatio = window.devicePixelRatio || '--';
  },

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
  input{
    border: 1px solid #ddd;
  }
  img{
    width: 100%;
    height: 300px;
  }

  .block{
    width: 100%;
    padding: 20px;
    margin: 30px 0;
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #ddd;
    .title{
      font-size: 20px;
      // font-weight: bold;
      color:indianred;
      margin-bottom: 20px;
    }
  }

  .middle-div{
    height: 60px;
    // background: pink;
    border: 1px solid #ddd;
    margin-bottom: 5px;
    .sp1{
      line-height: normal;
      background: lightgreen;
      line-height: 60px;
      font-size: 30px;
    }
    .sp2{
      line-height: normal;
      background: lightblue;
      line-height: 60px;
      font-size: 14px;
    }
  }
  .middle-div2{
    height: 60px;
    // background: pink;
    border: 1px solid #ddd;
    margin-bottom: 5px;
    span{
      display: inline-block;
      vertical-align: middle;
    }
    .sp1{
      line-height: normal;
      background: lightgreen;
      height: 60px;
      line-height: 60px;
      font-size: 30px;
    }
    .sp2{
      line-height: normal;
      background: lightblue;
      height: 60px;
      line-height: 60px;
      font-size: 14px;
    }
  }
  .middle-div3{
    height: 60px;
    // background: pink;
    border: 1px solid #ddd;
    margin-bottom: 5px;
    span{
      float: left;
    }
    .sp1{
      line-height: normal;
      background: lightgreen;
      height: 60px;
      line-height: 60px;
      font-size: 30px;
    }
    .sp2{
      line-height: normal;
      background: lightblue;
      height: 60px;
      line-height: 60px;
      font-size: 14px;
    }
  }
  .middle-div4{
    // width: 100%;
    height: 60px;
    // background: pink;
    border: 1px solid #ddd;
    margin-bottom: 5px;
    display: table;
    span{
      display: table-cell;
      vertical-align: middle;
    }
    .sp1{
      line-height: normal;
      background: lightgreen;
      // height: 60px;
      // line-height: 60px;
      font-size: 30px;
    }
    .sp2{
      line-height: normal;
      background: lightblue;
      // height: 60px;
      // line-height: 60px;
      font-size: 14px;
    }
  }

  // 1px
  .bordertit{
    background: #ddd;
    margin: 10px 0;
  }
  .testborder{
    width: 100%;
    li{
      width: 100%;
      height: 40px;
      line-height: 40px;
    }

    .yi{
      border-bottom: 1px solid #000;
    }

    .dianwu{
      border-bottom: 0.5px solid #000;
    }
    .diansan{
      border-bottom: 0.333px solid #000;
    }

    .trans{
      position:relative;
      &::after{
        position: absolute;
        content: '';
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 1px;
        background: #000;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
        transform-origin:0 0;
      }
    }

  }
  .transb{
    width: 80%;
    height: 50px;
    position: relative;
    &::after{
      content: " ";
      width: 200%;
      height: 200%;
      border-radius: 4px;
      border: 1px solid #000;
      transform: scale(0.5, 0.5);
      transform-origin: 0 0;
      position: absolute;
    }
  }
}
</style>
