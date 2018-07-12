<template>
  <my-scroll class="suggest" :data="result" @scrollToEnd="searchMore" :pullup="pullup">
    <ul class="suggest-list">
      <li class="suggest-item" v-for="(item,index) in result" :key="index">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
    </ul>
    <div class="no-result-wrapper">
    </div>
  </my-scroll>
</template>

<script>
import MyScroll from '@/components/base/MyScroll/MyScroll';
import { search } from '@/api/search.js';
import { createSong } from '@/common/js/song';
import { ERR_OK } from '@/api/config';
const TYPE_SINGER = 'singer';
export default {
  data() {
    return {
      pageNum: 1,
      result: [],
      pullup: true
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
    MyScroll
  },
  methods: {
    search() {
      // let _this = this;
      search(this.query, this.pageNum, this.showSinger).then(res => {
        if (res.code === ERR_OK) {
          this.result = this.genResult(res.data);
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
    searchMore() { }
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
