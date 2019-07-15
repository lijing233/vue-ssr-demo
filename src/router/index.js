import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false, // 浏览器不支持 history.pushState 控制路由是否应该回退到 hash 模式
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      {
        path: '/', component: () => import('@/pages/Home.vue') },
      { path: '/test', component: () => import('@/pages/Test.vue') },
      { path: '/store', component: () => import('@/pages/Store.vue') }
    ]
  })
}
