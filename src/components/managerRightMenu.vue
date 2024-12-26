<script setup lang="ts">

import {User} from "@element-plus/icons-vue";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
const now_path = ref('')
const route = useRoute()



onMounted(()=>{
  now_path.value = route.path
})
</script>

<template>
  <div class="rightMenu">
    <div class="load">
      <el-icon><EditPen /></el-icon>    </div>
    <div style="font-size: 14px;margin-left: 5px;margin-right: 10px">欢迎使用执笔小说</div>
  </div>
</template>

<style scoped>
.rightMenu{
  padding: 0 10px;
  display: flex;
  position: fixed;
  right: 15px;
  top: 2%;
  height: 45px;
  box-shadow: 0 0 12px rgba(0, 0, 0, .12);;
  background: #f5f5f5;
  align-items: center;
  z-index: 1;
}

.infoBox{
  width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #737373;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s;
  height: 100%;
}

.infoBox_active{
  color: black;
  pointer-events: none;
}


.infoBox:hover{
  font-size: 20px;
  background: rgba(115, 115, 115, 0.1);
}

.load{
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 13px;
  cursor: pointer;
  color: black;
  font-size: 16px;
}

.load_title{
  font-size: 14px;
  margin-left: 10px;
  margin-right: 10px;
  color: #363636;
  cursor: pointer;
}
</style>