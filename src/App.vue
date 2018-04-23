<template>
  <div id="app">
    <my-header></my-header>
    <my-tab></my-tab>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import MyHeader from '@/components/MyHeader/MyHeader'; // eslint-disable-line
import MyTab from '@/components/MyTab/MyTab';
export default {
  name: 'App',
  components: {
    MyHeader,
    MyTab
  }
};
</script>

<style>
/* 图片懒加载样式 */
img[lazy="loaded"] {
  animation: imgLoaded 0.2s ease-in-out;
}
@keyframes imgLoaded {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
