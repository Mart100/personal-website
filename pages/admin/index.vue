<script setup lang="ts">
definePageMeta({
  layout: 'admin',
});
</script>

<template>
  <div class="dashboard">
    <div>Dashboard!</div>
  </div>

</template>

<style lang="scss" scoped>
.dashboard {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;


  >div {
    font-size: 30px;
    text-align: center;
    margin: auto;
    color: white;
  }
}
</style>