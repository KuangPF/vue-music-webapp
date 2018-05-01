<template>
  <transition name="slide">
    <my-music-list :title="title" :bgImage="bgImage"></my-music-list>
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
