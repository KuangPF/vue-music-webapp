<template>
  <transition name="slide">
    <my-music-list :title="title" :bgImage="bgImage" :songs="songs"></my-music-list>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex';
import MyMusicList from '@/components/MyMusicList/MyMusicList';
import { getSingerDetail } from '@/api/singer';
import { createSong } from '@/common/js/song';
import { ERR_OK } from '@/api/config';
export default {
  data() {
    return {
      songs: []
    };
  },
  components: {
    MyMusicList
  },
  computed: {
    ...mapGetters(['singer']),
    title() {
      return this.singer.name;
    },
    bgImage() {
      return this.singer.avatar;
    }
  },
  mounted() {
    this._getSingerDetail();
  },
  methods: {
    _getSingerDetail() {
      if (!this.singer.id) {
        this.$router.push('/singer');
        return; // eslint-disable-line
      }
      getSingerDetail(this.singer.id).then(res => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.data.list);
        }
      });
    },
    _normalizeSongs(list) {
      let ret = [];
      list.forEach((item) => {
        let { musicData } = item;
        if (musicData.songid && musicData.albummid) {
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
