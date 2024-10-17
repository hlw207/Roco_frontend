<script setup lang="ts">

import {useBPInfoStore} from "@/pages/bp/bpInfo";
import {computed} from "vue";
import {useManaInfoStore} from "@/pages/mana/manaInfo";

const props = defineProps<{
  colorBox: string
  url: string
  color: string
  order: number
  attribute: string
  genieName: string
}>()

const bpInfo = useManaInfoStore()

const urlP = computed(()=>{
  return '../../public/' + props.attribute + '/' + props.genieName + '.png'
})

const urlAttribute = computed(()=>{
  return '../../public/' + props.attribute + '.png'
})

const cancel = () => {
  bpInfo.genieCancel(props.attribute, props.genieName, props.color)
}

const change = () =>{
  bpInfo.position.color = props.color
  bpInfo.position.order = props.order
}
</script>
<template>
  <div :class="{item: props.color == bpInfo.position.color && props.order == bpInfo.position.order && bpInfo.nowRound != 0}" @click="change">
    <div class="choice" :class="{choice_grey: bpInfo.nowRound == 0}">
      <div style="width: 75px;height: 75px;border-radius: 10px;margin: 10px;display: flex;justify-content: center;align-items: center;background: rgba(205,202,193,0.7);box-sizing: border-box;position: relative;z-index: 1">
        <img :src="props.url" style="width: 66px;height: 66px;background: white" v-if="props.genieName == ''" >
        <div v-if="props.genieName != ''" style="width: 66px;height: 66px;background: white;display: flex;align-items: center;justify-content: center;">
          <img :src="urlP" style="width: 80px;height: 80px;">
        </div>
      </div>
      <div style="position:relative; display: flex;flex-direction: column;justify-content: center;align-items: center;flex: 1;margin-right: 10px" v-if="props.attribute != ''">
        <div class="choice_text" style="font-weight: bold;margin-top: 6px">
          {{props.genieName}}
        </div>
        <div class="choice_text" style="margin-top: 10px;font-size: 14px;">
          <img :src="urlAttribute" style="height: 25px;margin-right: 10px">
          {{props.attribute}}系
        </div>
        <el-icon style="position: absolute;right: -5px;top: -10px;z-index: 1111;font-size: 18px;color: white" @click="cancel"><CircleCloseFilled /></el-icon>

      </div>

      <div style="display: flex;flex-direction: column;justify-content: center;align-items: center;flex: 1;margin-right: 10px" v-if="props.attribute == ''">
        <div class="choice_text" style="font-weight: bold">宠物名称</div>
        <div class="choice_text" style="margin-top: 10px;font-size: 13px;">
          宠物属性
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.choice{
  position: relative;
  margin: 8px;
  width: 200px;
  height: 95px;
  background: v-bind(colorBox);
  border-radius: 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.choice_grey{
  background: #b3a49e;
  cursor: not-allowed;
}

.choice_text{
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: white;
}

@keyframes opacityChange {
  50% {
    opacity:.5;
  }
  100% {
    opacity: 1;
  }
}
@keyframes rotate {
  100% {
    transform: rotate(1turn);
  }
}

.item {
  .choice{
    --borderWidth: 10px;
    --bRadius: 10px;
    position: relative;
    z-index: 10;
    overflow: hidden;
    &::after, &::before {
      box-sizing: border-box;
    }
    &::before {
      content: '';
      position: absolute;
      z-index: -2;
      left: -50%;
      top: -50%;
      width: 200%;
      height: 200%;
      background-color: v-bind(colorBox);
      background-image: conic-gradient(transparent, #f5cf0a, transparent 30%);
      animation: rotate 1.5s linear infinite;
    }

    &::after {
      content: '';
      position: absolute;
      z-index: -1;
      left: calc(var(--borderWidth) / 2);
      top: calc(var(--borderWidth) / 2);
      width: calc(100% - var(--borderWidth));
      height: calc(100% - var(--borderWidth));
      background: v-bind(colorBox);
      border-radius: 5px;
      /* 这句效果打开有助于理解动画 */
      /*      animation: opacityChange 5s infinite linear;*/
    }

  }
}

</style>