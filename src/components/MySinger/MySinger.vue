<template>
  <div class="my-singer">
    <my-phone-list :data="singers"></my-phone-list>
  </div>
</template>

<script>
import { getSingerList } from '@/api/singer.js';
import { createSinger } from '@/common/js/SingerClass.js';
import MyPhoneList from '@/components/base/MyPhoneList/MyPhoneList';

const HOT_TITLE = '热门';
const HOT_NUM = 10;
export default {
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
    _getSingerList() {
      getSingerList().then((res) => {
        console.log(res);
        this.singers = this._formatSinger(res.data.list);
      });
    },
    // 重组 res.data.list 数据
    _formatSinger(list) {
      // 热门歌手
      let map = {
        hot: {
          title: HOT_TITLE,
          items: []
        }
      };

      // 填充歌手数据
      list.forEach((index, item) => {
        // 填充热门歌手数据
        if (index < HOT_NUM) {
          map.hot.items.push(createSinger(item));
        };
      });
    }
  }
};
</script>

<style>

</style>
