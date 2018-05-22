<template>
  <div class="my-player" v-show="playlist.length > 0">
    <!-- 全屏播放器 -->
    <transition name="normal">

    </transition>
    <div class="normal-player">
      <!-- 背景图 -->
      <div class="background">
        <img :src="currentSong.image" width="100%" height="100%">
      </div>
      <!-- 顶部 -->
      <div class="top">
        <div class="mini-to-player" @click="miniToPlayer">
          <i class="icon-back"></i>
        </div>
        <h1 v-html="currentSong.name" class="title"></h1>
        <h1 v-html="currentSong.singer" class="subtitle"></h1>
      </div>
      <div class="middle">
        <div class="middle-l" ref="middeleL">
          <div class="cd-warpper">
            <div class="cd">
              <img class="image play" :src="currentSong.image">
            </div>
          </div>
        </div>
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
    }),
    miniToPlayer() {
      console.log('播放器最小化');
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/common/scss/myPlayer/myPlayer.scss";
</style>
