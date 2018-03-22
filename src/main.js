// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import api from'./api/axioscall.js'
import localstore from './api/localstore.js'
import Vuex from 'vuex'
//引入elemeui
import ElementUI from 'element-ui'
//引入样式文件
import 'element-ui/lib/theme-chalk/index.css';
//引入md5
import md5 from 'js-md5'

Vue.use(ElementUI)
Vue.use(Vuex)
Vue.config.productionTip = false
//将api方法绑定到全局
Vue.prototype.$api = api
Vue.prototype.$md5 = md5
Vue.prototype.$localstore = localstore
const store= new Vuex.Store({
  state:{
    authorization:false,
    userid:null,
    username:'',
    role:'',
  },
  mutations: {
    setUser(state,newInfo){
      state.authorization=newInfo.authorization
      state.userid=newInfo.userid
      state.username=newInfo.username
      state.role=newInfo.role
    },
    clearUser(state){
      state.userid=null
      state.username=''
      state.role=''
      state.authorization=false
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
