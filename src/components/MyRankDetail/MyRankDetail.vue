<template>
  <transition name="slide">
    <my-music-list></my-music-list>
  </transition>
</template>

<script>
import MyMusicList from '@/components/MyMusicList/MyMusicList';
import { getMusicList } from '@/api/rank'; // eslint-disable-line
import { mapGetters } from 'vuex';
export default {
  components: {
    MyMusicList
  },
  created() {
    this._getMusicList();
  },
  computed: {
    ...mapGetters(['rankList'])
  },
  methods: {
    _getMusicList() {
      if (!this.rankList.id) {
        console.log('sss');
        this.$router.push('/rank');
        return; // eslint-disable-line
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
</style>
