// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import api from'./api/axioscall.js'
//引入elemeui
import ElementUI from 'element-ui'
//引入样式文件
import 'element-ui/lib/theme-chalk/index.css';
//引入md5
import md5 from 'js-md5'

Vue.use(ElementUI)
Vue.config.productionTip = false
//将api方法绑定到全局
Vue.prototype.$api = api
Vue.prototype.$md5 = md5

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
