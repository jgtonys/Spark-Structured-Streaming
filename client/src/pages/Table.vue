<template>
  <div class="wrapper">
    <div class="main-panel">
      <top-navbar></top-navbar>

      <h1>Table</h1>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
export default {
  components: {
    TopNavbar,
    ContentFooter,
  },
  methods: {
    
  }
};
</script>
