<script setup lang="ts">

import {computed, onMounted, ref, watch} from "vue";
import {PieChart,Edit,Odometer,DataAnalysis} from "@element-plus/icons-vue";
import {useRoute} from "vue-router";
import router from "@/router";
const height = window.innerHeight * 0.02

const route = useRoute()
const url = ref('../../public/logo.png')
const modules = ref([{name: '控制台', path: '/manager/dashboard'}
                          ,{name: '章节审查', path: '/manager/censor'}])
const path = ref('/manager/dashboard')
const name = computed(()=>{
  for (let i = 0; i < modules.value.length;i++){
    if(path.value == modules.value[i].path)
      return modules.value[i].name
  }
})

const router_to = (index: number) =>{
  router.push(modules.value[index].path)
}

watch(()=>route.path,()=>{
  path.value = route.path
})

onMounted(()=>{
  path.value = route.path
})
</script>

<template>
  <div class="leftMenu">
    <div class="top">
      <el-image :src="url" class="pic" style="margin-left: -35px"></el-image>
      <div class="title">
        PickPen 演示站
      </div>
    </div>
    <template v-for="(module, index) in modules">
      <div class="module" :class="{module_active : path == module.path}" @click="router_to(index)">
        <el-icon v-if="index == 0" class="icon"><PieChart /></el-icon>
        <el-icon v-if="index == 1" class="icon"><Edit /></el-icon>
        {{module.name}}
      </div>
    </template>
  </div>
  <div class="leftTop">
    {{name}}
  </div>
  <div class="topMask"></div>
</template>

<style scoped>
.leftMenu{
  position: fixed;
  z-index: 999;
  left: 15px;
  top: 2%;
  bottom: 2%;
  height: 96%;
  width: 250px;
  border-radius: 3px;
  background: white;
  box-shadow: 0 0 12px rgba(0, 0, 0, .12);;
}

.top{
  height: 50px;
  background-image: linear-gradient(to right bottom, rgba(238, 238, 238, 0.3), rgba(242, 244, 246, 0.3));
  display: flex;
  align-items: center;
}

.pic{
  margin: 0 8px 0 15px;
  height: 30px;
  width: 30px;
}

.title{
  font-weight: bold;
  font-size: 18px;
}

.icon{
  width: 30px;
  height: 30px;
  font-size: 17px;
}

.module{
  display: flex;
  align-items: center;
  height: 50px;
  padding-left: 15px;
  font-size: 14px;
  cursor: pointer;
  color: #303133;
}

.module_active{
  color: rgba(47, 21, 161, 0.9);
  pointer-events: none;
}

.module:hover{
  background: rgba(47, 21, 161, 0.1);
}

.leftTop{
  position: fixed;
  display: flex;
  z-index: 999;
  align-items: center;
  top: 2%;
  left: 280px;
  padding: 0 18px;
  height: 36px;
  border-radius: 3px;
  background: white;
  color: #737373;
  font-size: 13px;
  box-shadow: 0 0 12px rgba(0, 0, 0, .12);;
}

.topMask{
  position: fixed;
  top: 0;
  z-index: 1;
  height: v-bind(height + 50 + 'px');
  background: #f5f5f5;
  width: 100%;
}
</style>