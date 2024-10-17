<script setup lang="ts">

import {useBPInfoStore} from "@/pages/bp/bpInfo";
import {useManaInfoStore} from "@/pages/mana/manaInfo";

const bpInfo = useManaInfoStore()

const choose = ()=>{
  bpInfo.genieChoose()
}
</script>

<template>
  <div class="certain" @click="choose">选择</div>
</template>

<style scoped>
.certain{
  margin: 0 15px;
  border: 2px solid rgba(241, 231, 175, 0.4);
  background: linear-gradient(to top, #f5e8a3, #ab8454);
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

.certain:hover{
  background: linear-gradient(to top, #f5e8a3, #837c58);;
}
</style>