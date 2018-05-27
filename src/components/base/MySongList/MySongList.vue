<template>
  <div class="my-song-list">
    <ul>
      <li v-for="(item,index) in songs" class="item" :key="index" @click="selectItem(item,index)">
        <div class="rank" v-show="rank">
          <div :class="getRankCls(index)">{{getRankText(index)}}</div>
        </div>
        <div class="content">
          <p class="name">{{ item.name }}</p>
          <p class="desc">{{ getDesc(item) }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    songs: {
      type: Array,
      default: () => []
    },
    rank: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getDesc(item) {
      return `${item.singer} - ${item.album}`;
    },
    getRankCls(index) {
      if (index < 3) {
        return `icon icon${index}`;
      } else {
        return `text`;
      }
    },
    getRankText(index) {
      if (index > 2) {
        return index + 1;
      }
    },
    selectItem(item, index) {
      this.$emit('select', item, index);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/common/scss/const.scss";
@import "~@/common/scss/mixin.scss";

.my-song-list {
  .item {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 64px;
    font-size: $font-size-medium;
    .rank {
      flex: 0 0 25px;
      width: 25px;
      margin-right: 30px;
      text-align: center;
      .icon {
        display: inline-block;
        width: 25px;
        height: 24px;
        background-size: 25px 24px;
        &.icon0 {
          @include bg-image("first");
        }
        &.icon1 {
          @include bg-image("second");
        }
        &.icon2 {
          @include bg-image("third");
        }
      }
      .text {
        color: $color-theme;
        font-size: $font-size-large;
      }
    }
    .content {
      flex: 1;
      line-height: 20px;
      overflow: hidden;
      .name {
        @include no-wrap();
        color: $color-text;
      }
      .desc {
        @include no-wrap();
        margin-top: 4px;
        color: $color-text-d;
      }
    }
  }
}
</style>
