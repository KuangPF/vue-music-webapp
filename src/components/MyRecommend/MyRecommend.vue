<!-- 推荐页组件 -->

<template>
  <div class="my-recommmend">
    <!-- better-scroll 滚动组件，当请求到 lists 时才渲染 -->
    <my-scroll>
      <div>
        <!-- 轮播图，当请求到 recommends 时才渲染 -->
      </div>
    </my-scroll>
  </div>
</template>

<script>
import MyScroll from '@/components/base/MyScroll/MyScroll';
export default {
  components: {
    MyScroll
  }
};
</script>

<style>

</style>
