<template>
  <div class="my-search">
    <div class="search-box-wrapper">
      <my-search-box @query ="onQueryChange"></my-search-box>
    </div>
    <div ref="shortcutWrapper" class="shortcut-wrapper">
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
        </div>
      </my-scroll>
    </div>
  </div>
</template>

<script>
import MySearchBox from '@/components/base/MySearchBox/MySearchBox';
import MyScroll from '@/components/base/MyScroll/MyScroll';
import { getHotKey } from '@/api/search.js';
import { ERR_OK } from '@/api/config';
export default {
  data() {
    return {
      hotKey: []
    };
  },
  components: {
    MySearchBox,
    MyScroll
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
      console.log(query);
    }
  }
};
</script>

<style lang='scss' scoped>
@import "~@/common/scss/mySearch/mySearch.scss";
</style>
