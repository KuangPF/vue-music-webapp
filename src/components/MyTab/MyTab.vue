<template>
  <div class="my-tab">
    <router-link tag="div" class="tab-item" :to="{ name: 'recommend' }">
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item" :to="{ name: 'singer' }">
      <span class="tab-link">歌手</span>
    </router-link>
    <router-link tag="div" class="tab-item" :to="{ name: 'rank' }">
      <span class="tab-link">排行
      </span>
    </router-link>
    <router-link tag="div" class="tab-item" :to="{ name: 'search' }">
      <span class="tab-link">搜索</span>
    </router-link>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
@import "~@/common/scss/myTab/myTab.scss";
</style>
