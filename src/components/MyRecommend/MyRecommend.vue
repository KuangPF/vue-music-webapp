<!-- 推荐页组件 -->
<template>
  <div class="my-recommend">
    <!-- better-scroll 滚动组件，当请求到 lists 时才渲染 -->
    <my-scroll ref="scroll" class="recommend-content">
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
import { getRecommend } from '@/api/recommend.js';
export default {
  data() {
    return {
      recommends: []
    };
  },
  components: {
    MyScroll,
    MySlider
  },
  created() {
    this._getRecommend();
  },
  methods: {
    // 获取轮播图数据
    _getRecommend() {
      getRecommend().then((res) => {
        if (res.code === 0) {
          this.recommends = res.data.slider;
        }
      });
    },
    // 当首次获取到图片时，Better-scroll 重新计算
    loadImg() {
      if (!this.flag) {
        this.$refs.scroll.refresh();
        this.flag = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/common/scss/myRecommend/myRecommend.scss";
</style>
