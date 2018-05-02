<template>
  <transition name="slide">
    <my-music-list :title="title" :bgImage="bgImage" :songs="songs" :rank="rank"></my-music-list>
  </transition>
</template>

<script>
import MyMusicList from '@/components/MyMusicList/MyMusicList';
import { getMusicList } from '@/api/rank'; // eslint-disable-line
import { mapGetters } from 'vuex';
import { ERR_OK } from '@/api/config';
import { createSong } from '@/common/js/song';
export default {
  components: {
    MyMusicList
  },
  data() {
    return {
      songs: [],
      rank: true
    };
  },
  created() {
    this._getMusicList();
  },
  computed: {
    title() {
      return this.rankList.topTitle;
    },
    bgImage() {
      return this.rankList.picUrl;
    },
    ...mapGetters(['rankList'])
  },
  methods: {
    _getMusicList() {
      if (!this.rankList.id) {
        this.$router.push('/rank');
        return; // eslint-disable-line
      }
      getMusicList(this.rankList.id).then(res => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.songlist);
        }
      });
    },
    _normalizeSongs(list) {
      let ret = [];
      list.forEach((item) => {
        const musicData = item.data;
        if (musicData.songid && musicData.albumid) {
          ret.push(createSong(musicData));
        }
      });
      return ret;
    }
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
