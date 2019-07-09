<template>
  <div id="app">
    <h1>Vue SSR DEMO</h1>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<style>
.fade-enter-active, .fade-leave-active {
  transition: all .2s ease;
}

.fade-enter, .fade-leave-active {
  opacity: 0;
}
</style>