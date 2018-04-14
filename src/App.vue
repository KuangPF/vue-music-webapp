<template>
  <div id="app">
    <my-header></my-header>
    <router-view/>
  </div>
</template>

<script>
import MyHeader from '@/components/MyHeader/MyHeader'; // eslint-disable-line
export default {
  name: 'App',
  components: {
    MyHeader
  }
};
</script>

<style>

</style>
