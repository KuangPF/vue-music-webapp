<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>
    <div ref="shortcutWrapper" class="shortcut-wrapper" v-show="!query">
      <scroll :refreshDelayv="refreshDelay" ref="shortcut" class="shortcut" :data="shortcut">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li  class="item" v-for="item in hotKey" @click="addQuery(item.k)">
                <span>{{item.k}}</span>
              </li>
            </ul>
          </div>
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span  class="clear" @click="showConfirm">
                <i class="icon-clear"></i>
              </span>
            </h1>
            <search-list @delete="deleteSearchHistory" @select="addQuery" :searches="searchHistory"></search-list>
          </div>
        </div>
      </scroll>
    </div>
    <div class="search-result" ref="searchResult" v-show="query">
      <suggest ref="suggest"  :query="query" @listScroll="blurInput" @select="saveSearch"></suggest>
    </div>
    <confirm ref="confirm" @confirm="clearSearchHistory" text="是否清空所有搜索历史" confirmBtnText="清空"></confirm>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getHotKey} from "../../api/search";
  import {ERR_OK} from "../../api/config";
  import Scroll from "../../base/scroll/scroll"
 import SearchBox from "../../base/search-box/search-box"
  import Suggest from '../../components/suggest/suggest'
  import {mapActions} from 'vuex'
  import searchList from '../../base/search-list/search-list'
  import {playlistMixin,searchMixin} from "../../common/js/mixin";
  import Confirm from '../../base/confirm/confirm'

  export default {
    mixins:[playlistMixin,searchMixin],
    components:{
      SearchBox,
      Scroll,
      Suggest,
      searchList,
      Confirm
    },
    data(){
      return{
        hotKey:[],
        refreshDelay:120
      }
    },
    computed:{
      shortcut(){
        return this.hotKey.concat(this.searchHistory)
      }
    },
    methods:{
      handlePlaylist(playlist){
          const bottom =playlist.length>0?'60px':0
        this.$refs.searchResult.style.bottom=bottom
        this.$refs.suggest.refresh()
        this.$refs.shortcutWrapper.style.bottom=bottom
        this.$refs.shortcut.refresh()


      },
      _getHotKey(){
        getHotKey().then((res)=>{
          if(res.code===ERR_OK){
            this.hotKey=res.data.hotkey.slice(0,10)
          }
        })
      },
      showConfirm(){
        this.$refs.confirm.show()
      },
      ...mapActions([
        'clearSearchHistory'
      ])
    },
    created(){
      this._getHotKey()
    },
    watch:{
      query(newQuery){
        if(!newQuery){
          setTimeout(()=>{
            this.$refs.shortcut.refresh()
          },20)
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>
