<template>
  <div class="my-rank">
    <!-- 排行榜数据 -->
    <my-scroll ref="scrollRef" :data="toplist" class="toplist">
      <ul>
        <li class="item" v-for="(item,index) in toplist" :key="index" @click="selectItem(item)">
          <!-- 左图 -->
          <div class="icon">
            <img width="100" height="100" v-lazy="item.picUrl" @load="loadImg">
          </div>

          <!-- 右歌 -->
          <ul class="songlist">
            <!-- <h3 class="title">{{ item.topTitle }}</h3> -->
            <li class="song" v-for="(song, index) in item.songList" :key="index">
              <span>{{ index + 1 }}</span>
              <span>{{ song.songname }}</span>
              <span class="singername"> - {{ song.singername }}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div v-show="!toplist.length" class="loading-container">
        <my-loading></my-loading>
      </div>
    </my-scroll>
    <router-view></router-view>
  </div>

</template>

<script>
import MyScroll from '@/components/base/MyScroll/MyScroll';
import MyLoading from '@/components/base/MyLoading/MyLoading';
import { getRankList } from '@/api/rank.js';
import { mapMutations } from 'vuex';
export default {
  components: {
    MyScroll,
    MyLoading
  },
  data() {
    return {
      toplist: []
    };
  },

  created() {
    this._getRankList();
  },
  methods: {
    ...mapMutations({
      setRankList: 'SET_RANKLIST'
    }),
    _getRankList() {
      getRankList().then((res) => {
        if (res.code === 0) {
          this.toplist = res.data.topList;
        }
      });
    },

    // 当首次获取到图片时，Better-scroll 重新计算
    loadImg() {
      if (!this.flag) {
        this.$refs.scrollRef.refresh();
        this.flag = true;
      }
    },

    selectItem(item) {
      this.$router.push({
        path: `/rank/${item.id}`
      });
      this.setRankList(item);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/common/scss/myRank/myRank.scss";
</style>
