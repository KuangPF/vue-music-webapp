<template>
  <div class="my-music-list">
    <!-- 返回按钮 -->
    <div @click="back" class="back">
      <i class="icon-back"></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  methods: {
    back() {
      this.$router.back();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/common/scss/MyMusicList/MyMusicList.scss";
</style>
