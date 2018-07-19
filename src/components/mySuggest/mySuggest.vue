<template>
  <my-scroll class="suggest" :data="result" @scrollToEnd="searchMore" :pullup="pullup" ref="suggest">
    <ul class="suggest-list">
      <li class="suggest-item" @click="selectItem(item)" v-for="(item,index) in result" :key="index">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <my-loading v-show="hasMore" title=""></my-loading>
    </ul>
    <div class="no-result-wrapper">
    </div>
  </my-scroll>
</template>

<script>
import MyScroll from '@/components/base/MyScroll/MyScroll';
import MyLoading from '@/components/base/MyLoading/MyLoading';
import { search } from '@/api/search.js';
import { Singer } from '@/common/js/SingerClass';
import { createSong } from '@/common/js/song';
import { ERR_OK } from '@/api/config';
import { mapMutations, mapActions } from 'vuex';
const TYPE_SINGER = 'singer';
const perpage = 20;
export default {
  data() {
    return {
      pageNum: 1,
      result: [],
      pullup: true,
      hasMore: true
    };
  },
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  components: {
    MyScroll,
    MyLoading
  },
  methods: {
    search() {
      // let _this = this;
      this.hasMore = true;
      this.pageNum = 1;
      this.$refs.suggest.scrollTo(0, 0);
      search(this.query, this.pageNum, this.showSinger, perpage).then(res => {
        if (res.code === ERR_OK) {
          this.result = this.genResult(res.data);
          this.checkMore(res.data);
        }
      });
    },
    genResult(data) {
      let ret = [];
      if (data.zhida && data.zhida.singerid) {
        ret.push({ ...data.zhida, ...{ type: TYPE_SINGER } });
      }
      if (data.song) {
        ret = ret.concat(this._normalized(data.song.list));
      }
      return ret;
    },
    _normalized(list) {
      let ret = [];
      list.forEach((musicData) => {
        if (musicData.songid && musicData.albumid) {
          ret.push(createSong(musicData));
        }
      });
      return ret;
    },
    getIconCls(item) {
      if (item.type === TYPE_SINGER) {
        return 'icon-mine';
      } else {
        return 'icon-music';
      }
    },
    getDisplayName(item) {
      if (item.type === TYPE_SINGER) {
        return item.singername;
      } else {
        return `${item.name} - ${item.singer}`;
      }
    },
    selectItem(item) {
      if (item.type === TYPE_SINGER) {
        const singer = new Singer({
          id: item.singermid,
          name: item.singername
        });
        this.$router.push({
          path: `/singer/${singer.id}`
        });
        this.setSinger(singer);
      } else {
        this.insertSong(item);
      }
    },
    searchMore() {
      if (!this.hasMore) {
        return; // eslint-disable-line
      }
      this.pageNum++;
      search(this.query, this.pageNum, this.showSinger, perpage).then(res => {
        if (res.code === ERR_OK) {
          this.result = this.result.concat(this.genResult(res.data));
        }
        this.checkMore(res.data);
      });
    },
    checkMore(data) {
      const song = data.song;
      if (!song.list.length || (song.curnum + song.curpage * perpage) >= song.totlenum) {
        this.hasMore = false;
      }
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    ...mapActions([
      'insertSong'
    ])
  },
  watch: {
    query() {
      this.search();
    }

  }
};
</script>

<style lang="scss" scoped>
@import "~@/common/scss/const.scss";
@import "~@/common/scss/mixin.scss";
.suggest {
  height: 100%;
  overflow: hidden;
  .suggest-list {
    padding: 0 30px;
    .suggest-item {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
    }
    .icon {
      flex: 0 0 30px;
      width: 30px;
      [class^="icon-"] {
        font-size: 14px;
        color: $color-text-d;
      }
    }
    .name {
      flex: 1;
      font-size: $font-size-medium;
      color: $color-text-d;
      overflow: hidden;
      .text {
        @include no-wrap();
      }
    }
  }
  .no-result-wrapper {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
