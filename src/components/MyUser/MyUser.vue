<template>
  <transition name="slide">
    <div class="my-user">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>

      <div class="switches-wrapper">
        <my-switches @switch="switchItem" :switches="switches" :currentIndex="currentIndex"></my-switches>
      </div>
    </div>
  </transition>
</template>

<script>
import MySwitches from '@/components/base/MySwitches/MySwitches';
export default {
  data() {
    return {
      switches: [{ name: '我的收藏' }, { name: '最近播放' }],
      currentIndex: 0
    };
  },
  components: {
    MySwitches
  },
  methods: {
    back() {
      this.$router.back();
    },
    switchItem(index) {
      this.currentIndex = index;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~@/common/scss/myUser/myUser.scss';
</style>
