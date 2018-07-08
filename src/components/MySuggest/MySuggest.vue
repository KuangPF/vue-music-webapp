<template>
  <my-scroll>
    <ul class="suggest-list">
      <li>
        <div class="icon">
          <i></i>
        </div>
        <div class="name">
          <p class="text"></p>
        </div>
      </li>
    </ul>
    <div class="no-result-wrapper">
    </div>
  </my-scroll>
</template>

<script>
import MyScroll from '@/components/base/MyScroll/MyScroll';
export default {
  components: {
    MyScroll
  }
};
</script>

<style lang="scss" scoped>
@import "~@/common/scss/const.scss";
@import "~@/common/scss/mixin.scss";
.suggest {
  height: 100%;
  overflow: hidden;
  .suggest-list {
    padding: 0 30px;
    .suggest-item {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
    }
    .icon {
      flex: 0 0 30px;
      width: 30px;
      [class^="icon-"] {
        font-size: 14px;
        color: $color-text-d;
      }
    }
    .name {
      flex: 1;
      font-size: $font-size-medium;
      color: $color-text-d;
      overflow: hidden;
      .text {
        @include no-wrap();
      }
    }
  }
  .no-result-wrapper {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
