<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from '../../components/music-list/music-list'
  import {getSongList} from '../../api/recommend'
  import {ERR_OK} from '../../api/config'
  import {mapGetters} from 'vuex'
  import {createSong} from '../../common/js/song'
  export default {
    computed: {
      title(){
          return this.disc.dissname
      },
      bgImage(){
          return this.disc.imgurl
      },
      ...mapGetters([
        "disc"
      ])
    },
    data() {
      return {
        songs: []
      }
    },
    created() {
      console.log(this.disc)
      this._getSongList()
    },
    methods: {
      _getSongList(){
        if(!this.disc.dissid){
          this.$router.push("/recommend")
        }
        const _this=this
        function jsonCallback(result){
          if(result.code===ERR_OK){
            _this.songs=_this._normalizeSongs(result.cdlist[0].songlist)
          }
        }
        getSongList(this.disc.dissid).then((res)=>{
          eval(res)
        })
      },
      _normalizeSongs(list){
        let ret=[]
        list.forEach((musicData)=>{
          if(musicData.songid&&musicData.albumid){
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    },
    components: {
      MusicList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
