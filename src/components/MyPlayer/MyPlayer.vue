<template>
  <div class="my-player" v-show="playlist.length > 0">
    <!-- 全屏播放器 -->
    <transition name="normal" @enter="enter" @after-enter="afterEnter" @leave="leave" @after-leave="afterLeave">
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
            <div class="cd-warpper" ref="cdWrapper">
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
              <i class="icon-sequence"></i>
            </div>
            <div class="icon i-left">
              <i class="icon-prev"></i>
            </div>
            <div class="icon i-center">
              <i class="icon-pause"></i>
            </div>
            <div class="icon i-right">
              <i class="icon-next "></i>
            </div>
            <div class="icon i-right ">
              <i class="icon icon-not-favorite"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
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
    </transition>

  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import Lyric from 'lyric-parser'; // eslint-disable-line
import animations from 'create-keyframe-animation';
import { prefixStyle } from '@/common/js/dom';

const transform = prefixStyle('transform');
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
    },
    enter(el, done) {
      const { x, y, scale } = this._getPostAndScale();
      let animation = {
        0: {
          transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
        },
        60: {
          transform: `translate3d(0,0,0) scale(1.2)`
        },
        100: {
          transform: `translate3d(0,0,0) scale(1)`
        }
      };
      animations.registerAnimation({
        name: 'move',
        animation,
        presets: {
          duration: 400,
          easing: 'linear'
        }
      });
      animations.runAnimation(this.$refs.cdWrapper, 'move', done);
    },
    afterEnter() {
      animations.unregisterAnimation('move');
      this.$refs.cdWrapper.style.animation = '';
    },
    leave(el, done) {
      this.$refs.cdWrapper.style.transition = `all 0.4s`;
      const { x, y, scale } = this._getPostAndScale();
      this.$refs.cdWrapper.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`;
      this.$refs.cdWrapper.addEventListener('transitionend', done);
    },
    afterLeave() {
      this.$refs.cdWrapper.style.transition = '';
      this.$refs.cdWrapper.style[transform] = '';
    },
    _getPostAndScale() {
      const targetWidth = 40;
      const paddingLeft = 40;
      const paddingBottom = 30;
      const paddingTop = 80;
      const width = window.innerWidth * 0.8;
      const scale = targetWidth / width;
      const x = -(window.innerWidth / 2 - paddingLeft);
      const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
      return {
        x,
        y,
        scale
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/common/scss/myPlayer/myPlayer.scss";
</style>
