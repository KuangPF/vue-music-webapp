<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="disclist">
      <div>
        <div class="slider-wrapper"  v-if="recommends.length">
          <slider>
            <div v-for="item in recommends">
              <a :href="item.linkUrl">
                <img class="needsclick" @load="loadImg" :src="item.picUrl" alt="">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="item in disclist" class="item" @click="selecteItem(item)">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl" alt="">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!disclist.length">
          <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from '../../base/scroll/scroll'
  import Slider from "../../base/slider/slider"
  import {getRecommend,getDiscList} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  import Loading from '../../base/loading/loading'
  import {playlistMixin} from "../../common/js/mixin";
  import {mapMutations} from 'vuex'
  export default {
    mixins:[playlistMixin],
      created() {
        this._getRecommend()

          this._getDiscList()


      },
    data() {
      return{
        recommends: [],
        disclist:[]
      }
    },
      methods: {
        selecteItem(item){
          this.$router.push({path:`/recommend/${item.dissid}`})
          this.setDisc(item)
        },
        handlePlaylist(playlist){
          const _bottom=playlist.length>0?"60px":""
          this.$refs.scroll.$el.style.bottom=_bottom
          this.$refs.scroll.refresh()
        },
        _getRecommend() {
          getRecommend().then((res) => {
            if(res.code===ERR_OK) {
              this.recommends=res.data.slider
            }
          });
        },
        _getDiscList(){
          getDiscList().then((res)=>{
            if(res.code===ERR_OK){
              this.disclist=res.data.list
            }
          })
        },
        loadImg(){
          if(!this.imgIsLoad){
            this.$refs.scroll.refresh()
            this.imgIsLoad=true
          }
        },
        ...mapMutations({
          setDisc:"SET_DISC"
        }),
      },
    components:{
        Slider,
      Scroll,
      Loading
    }
  }


</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
