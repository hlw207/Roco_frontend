<script setup lang="ts">
import {useBPInfoStore} from "@/pages/bp/bpInfo";

const bpInfo = useBPInfoStore()
const publicBan = () =>{
  bpInfo.publicBan()
}
</script>

<template>
  <div class="public_ban" @click="publicBan">公禁</div>
</template>

<style scoped>
.public_ban{
  margin: 0 15px;
  border: 2px solid rgba(44, 179, 215, 0.4);
  background: linear-gradient(to top, #bd353f, #96252c);
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
  background: linear-gradient(to top, #b00e1a, #56060b);
}
</style>