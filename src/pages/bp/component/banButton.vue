<script setup lang="ts">

import {useBPInfoStore} from "@/pages/bp/bpInfo";

const bpInfo = useBPInfoStore()

const ban = ()=>{
  bpInfo.genieBan()
}
</script>

<template>
  <div class="ban" @click="ban">禁用</div>
</template>

<style scoped>
.ban{
  margin: 0 15px;
  border: 2px solid rgba(44, 179, 215, 0.4);
  background: linear-gradient(to top, #2cb3d7, #3069a4);
  color: white;
  width: 130px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-family: 黑体;
  letter-spacing: 2px;
  cursor: pointer;
}

.ban:hover{
  background: linear-gradient(to top, #2cb3d7, #185d70);
}
</style>