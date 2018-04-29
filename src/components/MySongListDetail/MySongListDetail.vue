<template>
  <transition name="slide">
    <my-music-list :title="title"></my-music-list>
  </transition>
</template>

<script>
import MyMusicList from '@/components/MyMusicList/MyMusicList';
export default {
  components: {
    MyMusicList
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
