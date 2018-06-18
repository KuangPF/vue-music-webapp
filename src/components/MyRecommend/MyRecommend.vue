<!-- 推荐页组件 -->
<template>
  <div class="my-recommend" ref="recommend">
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
            <li v-for="(item,index) in lists" class="item" :key="index" @click="selectItem(item)">
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
      </div>
      <!-- loading 组件 -->
      <div v-show="!lists.length" class="loading-container">
        <my-loading></my-loading>
      </div>
    </my-scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import MyScroll from '@/components/base/MyScroll/MyScroll';
import MySlider from '@/components/base/MySlider/MySlider';
import MyLoading from '@/components/base/MyLoading/MyLoading';
import { getRecommend, getList } from '@/api/recommend.js';
import { mapMutations } from 'vuex';
import { playlistMixin } from '../../common/js/mixin.js';

export default {
  mixins: [playlistMixin],
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
    setTimeout(() => {
      this._getList();
    }, 1000);
  },
  methods: {
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : '';
      this.$refs.recommend.style.bottom = bottom;
      this.$refs.scroll.refresh();
    },
    ...mapMutations({
      setSonglist: 'SET_SONGLIST'
    }),
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
    },
    selectItem(item) {
      console.log(item);
      this.$router.push({
        path: `/recommend/${item.dissid}`
      });
      // 写入 vuex
      this.setSonglist(item);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/common/scss/myRecommend/myRecommend.scss";
</style>
