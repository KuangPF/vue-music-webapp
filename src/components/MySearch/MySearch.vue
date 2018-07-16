<template>
  <div class="my-search">
    <div class="search-box-wrapper">
      <my-search-box @query="onQueryChange"></my-search-box>
    </div>
    <div ref="shortcutWrapper" class="shortcut-wrapper" v-show="!query">
      <my-scroll ref="shortcut" class="shortcut">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li class="item" v-for="(item,index) in hotKey" :key="index">
                <span>{{item.k}}</span>
              </li>
            </ul>
          </div>
          <div class="search-history">

          </div>
        </div>
      </my-scroll>
    </div>
    <div class="search-result" v-show="query">
      <my-suggest :query="query"></my-suggest>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import MySearchBox from '@/components/base/MySearchBox/MySearchBox';
import MyScroll from '@/components/base/MyScroll/MyScroll';
import MySuggest from '@/components/MySuggest/MySuggest';
import { getHotKey } from '@/api/search.js';
import { ERR_OK } from '@/api/config';
export default {
  data() {
    return {
      hotKey: [],
      query: ''
    };
  },
  components: {
    MySearchBox,
    MyScroll,
    MySuggest
  },
  created() {
    this._getHotKey();
  },
  methods: {
    _getHotKey() {
      getHotKey().then(res => {
        if (res.code === ERR_OK) {
          this.hotKey = res.data.hotkey.slice(0, 10);
        }
      });
    },
    onQueryChange(query) {
      this.query = query;
    }
  }
};
</script>

<style lang='scss' scoped>
@import "~@/common/scss/mySearch/mySearch.scss";
</style>
