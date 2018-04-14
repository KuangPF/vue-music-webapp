<template>
  <transition name="slide">
    <div class="my-user">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
    </div>
  </transition>
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
@import "~@/common/scss/myUser/myUser.scss";
</style>
