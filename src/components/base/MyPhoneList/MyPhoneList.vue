<template>
  <my-scroll class="my-phone-list" :data="data" ref="scrollRef" @scroll="scroll" :probeType="probeType" :listen-scroll="listenScroll">
    <ul>
      <li ref="leftRef" v-for="(group,index) in data" class="list-group" :key="index">
        <h2 class="list-group-title">{{ group.title }}</h2>
        <ul>
          <li v-for="(item,index) in group.items" class="list-group-item" :key="index" @click="selectItem(item)">
            <img v-lazy="item.avatar" class="avatar">
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <!-- 滚动固定标题实现 -->
    <div ref="fixedTitleRef" v-show="fixedTitle" class="list-fixed">
      <h1 class="fixed-title">{{ fixedTitle }}</h1>
    </div>

    <!-- 右侧字母列表 -->
    <div class="list-shortcut" @touchmove.stop.prevent="onShortcutTouchmove" @touchstart="onShortcutTouchstart">
      <ul>
        <li v-for="(item, index) in shortcut" :data-index="index" class="item" :class="{'current':index === currentIndex}" :key="index">{{ item }}</li>
      </ul>
    </div>
  </my-scroll>
</template>

<script>
import MyScroll from '@/components/base/MyScroll/MyScroll';
import { myDOM } from '@/common/js/myutils.js';
const TITLE_HEIGHT = 29;
const RIGHT_ONEWORD_HEIGHT = 18;
export default {
  data() {
    return {
      scrollY: -1,
      currentIndex: 0,
      diff: -1
    };
  },
  components: {
    MyScroll
  },
  created() {
    this.touch = {};
    this.leftListHeight = [];
    this.listenScroll = true;
    this.probeType = 3;
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this._caclHeight();
      }, 20);
    },
    // 监听 scrollY 落在 leftListHeight 的哪个区间，实现高亮联动
    scrollY(newY) {
      const leftListHeight = this.leftListHeight;
      if (newY > 0) { // 滚动到顶部
        this.currentIndex = 0;
        return;
      }
      // 滚动到中间部分
      for (let i = 0; i < leftListHeight.length; i++) {
        let height1 = leftListHeight[i];
        let height2 = leftListHeight[i + 1];
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i;
          this.diff = height2 + newY;
          return;
        }
      }
      // 当滚动到底部，且-newY大于最后一个元素的上限
      this.currentIndex = leftListHeight.length - 2;
    },
    diff(newVal) {
      let fixedTop = (newVal > 0 && newVal - TITLE_HEIGHT < 0) ? newVal - TITLE_HEIGHT : 0;
      if (this.fixedTop === fixedTop) {
        return;
      }
      this.fixedTop = fixedTop;
      this.$refs.fixedTitleRef.style.transform = `translate3d(0, ${fixedTop}px, 0)`;
    }
  },
  computed: {
    // 快速入口排列数组
    shortcut() {
      return this.data.map((group) => {
        return group.title.substr(0, 1);
      });
    },
    fixedTitle() {
      if (this.scrollY > 0) {
        return '';
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : '';
    }
  },
  methods: {
    refresh() {
      this.$refs.scrollRef.refresh();
    },
    scroll(pos) {
      this.scrollY = pos.y;
    },
    // 计算 leftListHeight
    _caclHeight() {
      // 初始化 height
      let height = 0;
      this.leftListHeight = [];
      this.leftListHeight.push(height);
      let list = this.$refs.leftRef;
      for (let i = 0; i < list.length; i++) {
        height += list[i].clientHeight;
        this.leftListHeight.push(height);
      };
      // console.log(this.leftListHeight); // [0, 760, 1030, 1370, 1780, 1910, 2110, 2450, 2720, 3060, 3190, 3950, 4430, 4700, 4900, 5100, 5370, 5570, 5980, 6460, 7010, 7560, 7900, 9010]
    },
    onShortcutTouchstart(e) {
      let nowTouch = e.touches[0];
      this.touch.y1 = nowTouch.pageY;
      let nowIndex = myDOM.customAttribute(e.target, 'index');
      this.touch.nowIndex = nowIndex;
      this._scrollTo(nowIndex);
    },
    onShortcutTouchmove(e) {
      let nowTouch = e.touches[0];
      this.touch.y2 = nowTouch.pageY;

      // 两次 touch y轴偏移
      let offset = Math.floor((this.touch.y2 - this.touch.y1) / RIGHT_ONEWORD_HEIGHT);
      let nowIndex = Number(this.touch.nowIndex) + offset;
      this._scrollTo(nowIndex);
    },
    _scrollTo(index) {
      if (!index) {
        return; // eslint-disable-line
      } else if (index > this.leftListHeight.length - 2) {
        index = this.leftListHeight.length - 2;
      }
      this.currentIndex = Number(index);
      this.$refs.scrollRef.scrollToElement(this.$refs.leftRef[index], 0);
    },
    // 向上派发事件
    selectItem(item) {
      this.$emit('select', item);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/common/scss/const.scss";
@import "~@/common/scss/mixin.scss";

.my-phone-list {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;
  .list-group {
    padding-bottom: 30px;
    .list-group-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
    .list-group-item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .name {
        margin-left: 20px;
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
  }
  .list-shortcut {
    position: absolute;
    z-index: 30;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: $color-background-d;
    font-family: Helvetica;
    .item {
      padding: 3px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;
      &.current {
        color: $color-theme;
      }
    }
  }
  .list-fixed {
    position: absolute;
    top: -1px;
    left: 0;
    width: 100%;
    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
  }
  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
