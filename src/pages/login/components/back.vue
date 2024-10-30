<script setup lang="ts">
import router from "@/router";

const back = ()=>{
  router.back()
}
</script>

<template>
  <div class="Div">
    <div class="back" @click="back">
      <el-icon style="margin-right: 5px"><Back /></el-icon>
      返回
    </div>
  </div>
</template>

<style scoped>
.Div{
  display: flex;
  justify-content: right;
  align-items: center;
  position: absolute;
  bottom: 0;
  height: 30px;
  width: 100%;
  background: #5a5c62;
  color: white;
}

.back{
  display: flex;
  align-items: center;
  margin-right: 12px;
  cursor: pointer
}

.back:hover{
  color: #2bd5e0;
}
</style>