import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import 'common/stylus/index.styl'
import lazyLoad from "vue-lazyload"
//懒加载
Vue.use(lazyLoad,{
  loading:require('common/image/default.png')
})

//  解决手机端三秒的延迟
fastclick.attach(document.body)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
