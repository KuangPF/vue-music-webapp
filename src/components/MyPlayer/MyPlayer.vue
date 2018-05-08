<template>
  <div class="my-player" v-show="playlist.length > 0">
    <!-- 全屏播放器 -->
    <transition name="normal">

    </transition>
    <div class="normal-player">
      普通播放器
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
  computed: {
    ...mapGetters(['playlist'])
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
