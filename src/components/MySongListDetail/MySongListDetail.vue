<template>
  <transition name="slide">
    <my-music-list :title="title"></my-music-list>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex';
import MyMusicList from '@/components/MyMusicList/MyMusicList';
export default {
  components: {
    MyMusicList
  },
  computed: {
    ...mapGetters(['songlist']),
    title() {
      return this.songlist.dissname;
    }
  },
  methods: {
    _getSongList() {
      // 禁止直接刷新详情页(获取不到歌单 id)
      if (!this.songlist.dissid) {
        this.$router.push('/recommend');
        return; // eslint-disable-line
      }
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
