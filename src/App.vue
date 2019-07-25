<template>
  <div id="app">
    <h1>Vue SSR DEMO</h1>
    <router-link to="/">
      HOME
    </router-link>
    <router-link to="/test">
      TEST
    </router-link>
    <router-link to="/store">
      STORE
    </router-link>
    <div class="line" />
    <transition
      name="fade"
      mode="out-in"
    >
      <router-view class="view" />
    </transition>
  </div>
</template>

<style>
body{
  color: #333;
}
.fade-enter-active, .fade-leave-active {
  transition: all .2s ease;
}

.fade-enter, .fade-leave-active {
  opacity: 0;
}
</style>

<style lang="scss" scoped>
.line{
  width: 100%;
  height: 1px;
  background: #ddd;
  margin: 40px 0;
}
.router-link-exact-active{
  color: hotpink;
}
</style>

