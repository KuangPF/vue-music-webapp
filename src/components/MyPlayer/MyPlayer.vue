<template>
  <div class="my-player" v-show="false">
    <!-- 全屏播放器 -->
    <transition name="normal">

    </transition>
    <div class="normal-player">
      普通播放器
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
@import "~@/common/scss/myPlayer/myPlayer.scss";
</style>
