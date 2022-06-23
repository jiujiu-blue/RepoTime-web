import Vue from 'vue'
import App from './App.vue'
import router from './router'  //引入 vue-router
import store from './store/index'    //引入 vuex

// 全局配置
import '@/assets/scss/reset.scss' //全局样式
import 'element-ui/lib/theme-chalk/index.css' //element-ui样式
import './mock'   // mockjs
import axios from 'axios'
// 第三方包
// 引入echarts
import * as echarts from 'echarts'
import ElementUI from 'element-ui'
Vue.use(ElementUI)
Vue.prototype.$echarts = echarts 
Vue.config.productionTip = false
Vue.prototype.$axios = axios;
axios.defaults.baseURL = '/api'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
