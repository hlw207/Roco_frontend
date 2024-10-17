<script setup lang="ts">
import {useBPInfoStore} from "@/pages/bp/bpInfo";
import {ref} from "vue";

const bpInfo = useBPInfoStore()

const open = ref(false)
const change = () =>{
  if(!open.value){
    open.value = true
    setTimeout(()=>{
      window.addEventListener('click', EventChange)
    }, 100)
  }
}

const EventChange = ()=>{
  if(open.value){
    open.value = false
    window.removeEventListener('click', EventChange)
  }
}

const chooseRound = (i: number) =>{
  bpInfo.nowRound = i
}

</script>

<template>
  <div class="round">
    <div class="round_inner" @click="change">
      <div>
        <span v-if="bpInfo.nowRound != 0">Round {{bpInfo.nowRound}}</span>
        <span v-if="bpInfo.nowRound == 0">公ban阶段</span>
      </div>
      <el-icon class="round_icon" :class="{round_icon_click: open}"><ArrowUpBold /></el-icon>
      <div class="round_extra">
        <template v-for="i in bpInfo.totalRound + 1">
          <div class="round_item" @click="chooseRound(i - 1)" v-if="open">
            <span v-if="i == 1">公共 ban</span>
            <span v-if="i != 1">Round {{i - 1}}</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.round{
  position: relative;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: right;
  flex: 1;
  padding-right: 10px;
}

.round_inner{
  display: flex;
  align-items: center;
  cursor: pointer;
}

.round_inner:hover{
  color: white;
}

.round_inner:hover .round_icon{
  color: white;
}

.round_icon{
  margin-left: 5px;
  transform: rotate(180deg);
  transition: transform 0.5s;
  color: #d9cbcb;
}

.round_icon_click{
  transform: rotate(0deg);
  transition: all 1s;
}

.round_extra{
  position: absolute;
  top: 35px;
  background: #d9cbcb;
  width: 123px;
  margin-right: 10px;
  color: black;
}

.round_item{
  display: flex;
  height: 35px;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  color: rgba(10, 10, 10, 0.7);
  font-weight: normal;
  font-size: 16px;
}

.round_item:hover{
  color: rgba(10, 10, 10, 1);
  background: #e8e1e1;
}
</style>