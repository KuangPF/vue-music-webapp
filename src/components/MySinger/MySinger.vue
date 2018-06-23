<template>
  <div class="my-singer" ref="singer">
    <my-phone-list :data="singers" @select="selectSinger" ref="list"></my-phone-list>
    <router-view></router-view>
  </div>
</template>

<script>
import { getSingerList } from '@/api/singer.js';
import { createSinger } from '@/common/js/SingerClass.js';
import MyPhoneList from '@/components/base/MyPhoneList/MyPhoneList';
import { mapMutations } from 'vuex';
import { playlistMixin } from '../../common/js/mixin.js';

const HOT_TITLE = '热门';
const HOT_NUM = 10;
export default {
  mixins: [playlistMixin],
  components: {
    MyPhoneList
  },
  data() {
    return {
      singers: []
    };
  },
  created() {
    this._getSingerList();
  },
  methods: {
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : '';
      this.$refs.singer.style.bottom = bottom;
      this.$refs.list.refresh();
    },
    ...mapMutations({
      'setSinger': 'SET_SINGER'
    }),
    _getSingerList() {
      getSingerList().then(res => {
        this.singers = this._formatSingers(res.data.list);
      });
    },
    // 重组 res.data.list 数据
    _formatSingers(list) {
      // 热门歌手
      let map = {
        hot: {
          title: HOT_TITLE,
          items: []
        }
      };

      // 填充歌手数据
      list.forEach((item, index) => {
        // 填充热门歌手数据
        if (index < HOT_NUM) {
          map.hot.items.push(createSinger(item));
        }

        // 填充 a-z 字母
        let key = item.Findex;
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          };
        }
        // 填充对应字母歌手数据
        map[key].items.push(createSinger(item));
      });

      // 得到有序列表
      let hot = [];
      let others = [];

      for (let key in map) {
        let value = map[key];
        if (value.title.match(/[a-zA-Z]/)) {
          others.push(value);
        } else if (value.title === HOT_TITLE) {
          hot.push(value);
        }
      }

      others.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      return hot.concat(others);
    },
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      });
      this.setSinger(singer);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/common/scss/mySinger/mySinger.scss";
</style>
