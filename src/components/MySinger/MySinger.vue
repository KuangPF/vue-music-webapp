<template>
  <div class="my-singer">
    <my-phone-list></my-phone-list>
  </div>
</template>

<script>
import MyPhoneList from '@/components/base/MyPhoneList/MyPhoneList';
import { getSingerList } from '@/api/singer.js';
export default {
  components: {
    MyPhoneList
  },
  data() {
    return {

    };
  },
  created() {
    this._getSingerList();
  },
  methods: {
    _getSingerList() {
      getSingerList().then((res) => {
        console.log(res);
      });
    }
  }
};
</script>

<style>

</style>
