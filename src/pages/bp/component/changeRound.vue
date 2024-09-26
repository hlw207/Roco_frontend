<script setup lang="ts">
import {useBPInfoStore} from "@/pages/bp/bpInfo";

const bpInfo = useBPInfoStore()

const clear = ()=>{
  bpInfo.removeElem()
}

const add = ()=>{
  bpInfo.addElem()
}
</script>

<template>
  <div class="check">
    <div class="check_text" v-if="bpInfo.totalRound == bpInfo.nowRound && bpInfo.totalRound != 0" @click="clear">清除本轮</div>
    <div class="check_text" @click="add" v-if="bpInfo.totalRound == bpInfo.nowRound">进入下轮</div>
  </div>
</template>

<style scoped>
.check{
  box-sizing: border-box;
  position: absolute;
  right: 75px;
  bottom: 0;
  display: flex;
  justify-content: right;
  height: 22px;
}

.check_text{
  margin-right: 20px;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.check_text:hover{
  border-bottom: 1px solid white;
}
</style>