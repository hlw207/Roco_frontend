<script setup lang="ts">

import {computed, ref, watch} from "vue";
import {useBPInfoStore} from "@/pages/bp/bpInfo";

const props = defineProps<{
  color: string,
  order: number,
  show: boolean,
  attribute: string,
  genieName: string,
  banRound: number,
  canDelete: boolean
}>()

const bpInfo = useBPInfoStore()


const url = ref('../../public/'+ props.attribute + '/' + props.genieName + '.png')
const urlB = ref('../../public/banB.png')
const urlR = ref('../../public/banR.png')

const choose = () =>{
  if(props.canDelete && props.order != -1) {
    bpInfo.position.color = props.color
    bpInfo.position.order = props.order
  }
}

const beChosen = computed(()=>{
  return bpInfo.position.color == props.color && bpInfo.position.order == props.order && props.canDelete
})

const remove = () =>{
  bpInfo.removeBan(props.attribute, props.genieName, props.banRound)
}

watch(()=>props.genieName, ()=>{
  url.value = '../../public/'+ props.attribute + '/' + props.genieName + '.png'
})
</script>

<template>
  <div class="ban" :class="{ban_blue: color == 'blue', ban_red: color == 'red', ban_gold: color == 'gold', ban_click: canDelete && props.order != -1, ban_click_focus: beChosen}" @click="choose">
    <el-image :src="url" v-if="props.genieName != ''">
    </el-image>
    <el-image :src="urlB" v-if="props.genieName == '' && color == 'blue'" style="width: 40px;margin-top: 2px;margin-left: 2px">
    </el-image>
    <el-image :src="urlR" v-if="props.genieName == '' && color == 'red'" style="width: 50px;margin-top: 7px;margin-left: 2px">
    </el-image>
    <el-icon :class="{ban_blue_lock: color == 'blue', ban_red_lock: color == 'red', ban_gold_lock: color == 'gold'}" style="position: absolute;right: 0;bottom: 0;font-size: 18px;" v-if="!show && props.genieName != ''"><Lock /></el-icon>
    <div class="check_button" v-if="props.attribute != '' && props.canDelete" @click="remove">
      ×
    </div>
  </div>
</template>

<style scoped>
.ban{
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  width: 64px;
  border-radius: 32px;
  margin: 8px 6px;
}

.ban_click{
  cursor: pointer;
}

.ban_click:hover{
  border: 1px solid yellow;
}

.ban_blue{
  border: 1px solid rgba(87, 138, 187, 0.9);
  background: rgba(10, 18, 28, 0.2);
}

.ban_red{
  border: 1px solid rgba(183, 118, 123, 0.9);
  background: rgba(47, 17, 19, 0.2);
}

.ban_gold{
  border: 1px solid rgba(182, 160, 107, 0.9);
  background: rgba(59, 48, 22, 0.2);
}

.ban_click_focus{
  border: 1px solid red;
  pointer-events: none;
}

.ban_click_focus:hover{
  border: 1px solid red;
}

.ban_blue_lock{
  color: rgba(87, 138, 187, 0.9);
}

.ban_red_lock{
  color: rgba(183, 118, 123, 0.9);
}

.ban_gold_lock{
  color: rgba(182, 160, 107, 0.9);
}

.check_button{
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: -3px;
  top: -3px;
  height: 18px;
  width: 18px;
  border-radius: 9px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: rgba(217, 203, 203, 0.5);
  font-size: 18px;
  font-weight: lighter;
  cursor: pointer;
}

.check_button:hover{
  color: white;
  border: 1px solid white;
}
</style>