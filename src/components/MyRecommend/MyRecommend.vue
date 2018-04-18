<!-- 推荐页组件 -->
<template>
  <div class="my-recommend">
    <!-- better-scroll 滚动组件，当请求到 lists 时才渲染 -->
    <my-scroll ref="scroll" :data="lists" class="recommend-content">
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

        <!-- list 列表 -->
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="(item,index) in lists" class="item" :key="index">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl">
              </div>
              <div class="text">
                <p v-html="item.creator.name" class="name"></p>
                <p v-html="item.dissname" class="desc"></p>
              </div>
            </li>
          </ul>
        </div>
        <!-- loading 组件 -->
        <div class="loading-container" v-show="false">
          <my-loading></my-loading>
        </div>
      </div>
    </my-scroll>
  </div>
</template>

<script>
import MyScroll from '@/components/base/MyScroll/MyScroll';
import MySlider from '@/components/base/MySlider/MySlider';
import MyLoading from '@/components/base/MyLoading/MyLoading';
import { getRecommend, getList } from '@/api/recommend.js';
export default {
  data() {
    return {
      recommends: [],
      lists: []
    };
  },
  components: {
    MyScroll,
    MySlider,
    MyLoading
  },
  created() {
    this._getRecommend();
    this._getList();
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
    _getList() {
      getList().then((res) => {
        this.lists = res.data.list;
        console.log('list' + res);
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
