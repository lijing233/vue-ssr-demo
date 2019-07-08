import { createApp } from './app'
const {app, router} = createApp();

//解析完所有路由（包括异步路由）
router.onReady(() => {    
    app.$mount('#app')
})