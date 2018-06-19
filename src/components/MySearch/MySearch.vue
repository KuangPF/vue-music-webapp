<template>
  <div class="my-search">
    <div class="search-box-wrapper">
      <my-search-box></my-search-box>
    </div>
  </div>
</template>

<script>
import MySearchBox from '@/components/base/MySearchBox/MySearchBox';
export default {
  components: {
    MySearchBox
  }
};
</script>

<style lang='scss' scoped>
@import "~@/common/scss/mySearch/mySearch.scss";
</style>
