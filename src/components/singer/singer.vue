<template>
    <div class="singer" ref="singer">
      <listview @select="selectSinger" :data="singers" ref="list"></listview>
      <router-view></router-view>
    </div>
</template>

<script>
  import {getSingeList} from '../../api/singer'
  import {ERR_OK} from "../../api/config"
  import Singer from '../../common/js/singer'
  import Listview from '../../base/listview/listview'
  import {mapMutations} from 'vuex'
  import {playlistMixin} from "../../common/js/mixin";
  const HOT_NAME="热门"
  const HOT_SINGER_LEN=10
    export default {
    mixins:[playlistMixin],
      data(){
        return{
          singers:[]
        }
      },
       mounted(){
         this._getSingerList()
       },
      methods:{
        handlePlaylist(playlist){
          const _bottom=playlist.length>0?"60px":""
          this.$refs.singer.style.bottom=_bottom
          this.$refs.list.refresh()
        },
        selectSinger(singer){
          console.log(singer)
          this.$router.push({
            path:`/singer/${singer.id}`
          })
          this.setSinger(singer)
        },
        ...mapMutations({
          setSinger:"SET_SINGER"
        }),
         _getSingerList(){
           getSingeList().then((res)=>{
             if(res.code===ERR_OK){
               this.singers=res.data.list
              this.singers=this._normalizeSinger(this.singers)
             }
           })
         },
        _normalizeSinger(list){
          let map={
             hot:{
               title:HOT_NAME,
               item:[]
             }
           }

           list.forEach((item,index)=>{
             if(index<HOT_SINGER_LEN){
               map.hot.item.push(
                 new Singer({
                   id:item.Fsinger_mid,
                   name:item.Fsinger_name,
                 })
               )
             }

             const key=item.Findex
             if(!map[key]){
               map[key]={
                 title:key,
                 item:[]
               }
             }

             map[key].item.push(
               new Singer({
                 id:item.Fsinger_mid,
                 name:item.Fsinger_name,
               })
             )

           })

          // 得到有序列表
          let hot=[]
          let ret=[]
          for(let key in map){

             let val=map[key]
            if(val.title.match(/[a-zA-Z]/)){
               ret.push(val)
            }else if(val.title==="热门"){
               hot.push(val)
            }
          }
          ret.sort((a,b)=>{
            return a.title.charCodeAt(0)-b.title.charCodeAt(0)
          })

          return hot.concat(ret)

        }
      },
      components:{
        Listview
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position:fixed
    top:88px
    bottom:0
    width:100%
    z-index:0
</style>
