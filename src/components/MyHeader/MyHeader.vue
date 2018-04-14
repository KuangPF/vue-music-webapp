<template>
  <div class="my-header">
    <div class="icon"></div>
    <div class="text">Chicken Music</div>

    <!-- 个人中心 -->
    <router-link to="/user" class="mine" tag="div">
      <i class="icon-mine"></i>
    </router-link>
  </div>
</template>

<script>
export default {

};
</script>

<style lang='scss' scoped>
@import "~@/common/scss/myHeader/myHeader.scss";
</style>
