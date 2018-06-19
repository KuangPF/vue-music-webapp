<template>
  <div class="my-search-box">
    <i class="icon-search"></i>
    <input ref="query" v-model="query" class="box" :placeholder="placeholder" />
    <!--  <i @click="clear" v-show="query" class="icon-dismiss"></i> -->
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '搜索歌曲、歌手'
    }
  },
  data() {
    return {
      query: ''
    };
  }
};
</script>

<style lang='scss'>
@import "~@/common/scss/const.scss";
.search-box {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 6px;
  height: 40px;
  background: $color-highlight-background;
  border-radius: 6px;
}
.icon-search {
  font-size: 24px;
  color: $color-background;
}
.box {
  flex: 1;
  margin: 0 5px;
  line-height: 18px;
  background: $color-highlight-background;
  color: $color-text;
  font-size: $font-size-medium;
  &::placeholder {
    color: $color-text-d;
  }
}
.icon-dismiss {
  font-size: 16px;
  color: $color-background;
}
</style>
