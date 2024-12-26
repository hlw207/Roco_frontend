<script setup lang="ts">

import LeftMenu from "@/components/leftMenu.vue";
import ManagerRightMenu from "@/components/managerRightMenu.vue";
const height = window.innerHeight * 0.02
</script>

<template>
  <div class="myDiv">
  </div>
  <leftMenu />
  <ManagerRightMenu />
  <div class="main">
    <router-view />
  </div>
</template>

<style scoped>
.myDiv{
  position: fixed;
  z-index: -1;
  background: #f5f5f5;
  height: 100%;
  width: 100%;
}

.main{
  padding-left: 280px;
  padding-right: 15px;
  padding-top: v-bind(height + 60 + 'px');
  background: #f5f5f5;
}
</style>