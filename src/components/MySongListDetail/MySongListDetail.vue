<template>
  <transition name="slide">
    <my-music-list :title="title" :bgImage="bgImage" :songs="songs"></my-music-list>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex';
import MyMusicList from '@/components/MyMusicList/MyMusicList';
import { getSongList } from '@/api/recommend.js';
import { createSong } from '../../common/js/song';
import { ERR_OK } from '../../api/config';
export default {
  components: {
    MyMusicList
  },
  data() {
    return {
      songs: []
    };
  },
  computed: {
    ...mapGetters(['songlist']),
    title() {
      return this.songlist.dissname;
    },
    bgImage() {
      return this.songlist.imgurl;
    }
  },
  methods: {
    _getSongList() {
      // 禁止直接刷新详情页(获取不到歌单 id)
      let _this = this;
      if (!this.songlist.dissid) {
        this.$router.push('/recommend');
        return; // eslint-disable-line
      };
      console.log(this.songlist.dissid);
      function jsonCallback(result) { // eslint-disable-line
        if (result.code === ERR_OK) {
          _this.songs = _this._normalizeSongs(result.cdlist[0].songlist);
        };
      }
      getSongList(this.songlist.dissid).then((res) => {
        eval(res); //eslint-disable-line
      });
    },
    _normalizeSongs(list) {
      let ret = [];
      list.forEach((musicData) => {
        if (musicData.songid && musicData.albumid) {
          ret.push(createSong(musicData));
        };
      });
      return ret;
    }
  },
  created() {
    this._getSongList();
  }
};
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
</style>
