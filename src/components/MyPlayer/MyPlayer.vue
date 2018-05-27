<template>
  <div class="my-player" v-show="playlist.length > 0">
    <!-- 全屏播放器 -->
    <transition name="normal">

    </transition>
    <div class="normal-player" v-show="fullScreen">
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
              <img class="image" :src="currentSong.image" :class="cdCls">
            </div>
          </div>
          <div class="playing-lyric-wrapper">
            <div class="playing-lyric">
              {{playingLyric}}
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="dot-wrapper">
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
        <div class="progress-wrapper">

        </div>
        <div class="operators">
          <div class="icon i-left">
            <i></i>
          </div>
          <div class="icon i-left">
            <i class="icon-prev"></i>
          </div>
          <div class="icon i-center">
            <i></i>
          </div>
          <div class="icon i-right">
            <i class="icon-next "></i>
          </div>
          <div class="icon i-right ">
            <i class="icon "></i>
          </div>
        </div>
      </div>
    </div>
    <div class="mini-player " v-show="!fullScreen " @click="open ">
      <div class="icon ">
        <img :class="cdCls " width="40 " height="40 " :src="currentSong.image ">
      </div>
      <div class="text ">
        <h2 class="name " v-html="currentSong.name "></h2>
        <p class="desc " v-html="currentSong.singer "></p>
      </div>
      <div class="control ">
      </div>
      <div class="control ">
        <i class="icon-playlist "></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import Lyric from 'lyric-parser'; // eslint-disable-line
export default {
  data() {
    return {
      playingLyric: ''
    };
  },
  computed: {
    ...mapGetters(['playlist', 'fullScreen', 'currentSong', 'playing']),
    cdCls() {
      return this.playing ? 'play' : '';
    }
  },
  methods: {
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN'
    }),
    miniToPlayer() {
      this.setFullScreen(false);
    },
    open() {
      this.setFullScreen(true);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/common/scss/myPlayer/myPlayer.scss";
</style>
