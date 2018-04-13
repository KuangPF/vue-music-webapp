import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// 路由懒加载
const MyRecommend = (resolve) => {
  import('@/components/MyRecommend/MyRecommend').then((module) => {
    resolve(module);
  });
};
export default new Router({
  routes: [{
    path: '/',
    redict: '/recommend'
  }, {
    path: '/recommend',
    name: 'ecommend',
    component: MyRecommend

  }]
});
