// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import VueLazyload from 'vue-lazyload';

// 消除 click 移动浏览器300ms延迟
import attachFastClick from 'fastclick';
attachFastClick.attach(document.body);

Vue.config.productionTip = false;

import '@/common/scss/index.scss'; // eslint-disable-line

/* 图片懒加载 */
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: require('@/common/img/default.png'),
  attempt: 1
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
});
