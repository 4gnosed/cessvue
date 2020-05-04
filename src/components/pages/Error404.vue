<template>
  <div class="error-page" @click="toIndex">
  </div>
</template>

<script>
  export default {
    name: 'Error404',
    methods: {
      toIndex() {
        this.$router.replace('/index')
      }
    }

  }
</script>

<style scoped>
  .error-page {
    background: url("../../assets/img/404.jpg") no-repeat;
    margin: 0;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
</style>
