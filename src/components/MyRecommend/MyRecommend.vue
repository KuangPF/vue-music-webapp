<!-- 推荐页组件 -->

<template>
  <div class="my-recommmend">
    <!-- better-scroll 滚动组件，当请求到 lists 时才渲染 -->
    <my-scroll>
      <div>
        <!-- 轮播图，当请求到 recommends 时才渲染 -->
        <div v-if="recommends.length" class="slide-wrapper">
          <my-slider>
            <div v-for="(recommend,index) in recommends" :key="index">
              <a :href="recommend.linkUrl">
                <img @load="loadImg" :src="recommend.picUrl" class="needsclick">
              </a>
            </div>
          </my-slider>
        </div>
      </div>
    </my-scroll>
  </div>
</template>

<script>
import MyScroll from '@/components/base/MyScroll/MyScroll';
import MySlider from '@/components/base/MySlider/MySlider';
export default {
  data() {
    return {
      recommends: []
    };
  },
  components: {
    MyScroll,
    MySlider
  }
};
</script>

<style>

</style>
