import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    tab
  },
  state: {
      /*定义组件间通信变量*/
      userid:-1
  }
})
