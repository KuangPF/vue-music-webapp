<template>
  <div class="my-music-list">
    <!-- 返回按钮 -->
    <div @click="back" class="back">
      <i class="icon-back"></i>
    </div>
    <!-- 顶部歌手名字 -->
    <div v-html="title" class="title"></div>
    <div class="bg-image" :style="bgStyle"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    bgImage: {
      type: String,
      default: ''
    }
  },
  methods: {
    back() {
      this.$router.back();
    }
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.bgImage})`;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/common/scss/MyMusicList/MyMusicList.scss";
</style>
