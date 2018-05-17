<template>
  <div class="my-player" v-show="playlist.length > 0">
    <!-- 全屏播放器 -->
    <transition name="normal">

    </transition>
    <div class="normal-player">
      <!-- 背景图 -->
      <div class="background">
        <img :src="currentSong.img" width="1000%" height="100%">
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
  computed: {
    ...mapGetters(['playlist', 'currentSong'])
  },
  methods: {
    ...mapMutations({
      setPlayList: 'SET_PLAYLIST'
    })
  }
};
</script>

<style lang="scss" scoped>
@import "~@/common/scss/myPlayer/myPlayer.scss";
</style>
