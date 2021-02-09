<template>
  <div>
    <AppHeader />
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<script>
import AppHeader from '@/components/Header';
export default {
  components: {
    AppHeader,
  },
};
</script>
