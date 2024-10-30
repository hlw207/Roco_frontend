<script setup lang="ts">
import {computed, h, onMounted, ref, watch} from "vue";
import type {genie, manaGenie} from "@/util/interface";
import {useManaInfoStore} from "@/pages/mana/manaInfo";

const props = defineProps<{
  length: number,
  genie: manaGenie
}>()

const l = ref(props.length * 0.1)
const l_margin = ref(props.length * 0.0055)
const bpInfo = useManaInfoStore()

const url = ref('../../public/'+ props.genie.attribute + '/' + props.genie.genieName + '.png')

const beBanned = computed(()=>{
  let isBanned = bpInfo.ban.some((banGenie) => banGenie.genieName == props.genie.genieName);
  if(isBanned)
    return isBanned
  if(bpInfo.position.order <= 4){
    let index = bpInfo.position.color == 'blue' ? 3 : 2
    for (let i = 0;i < bpInfo.nowRound;i++){
      for (let j = 0;j < bpInfo.ban_nums[i];j++){
        if(bpInfo.playerChoice[i][0][j].genieName == props.genie.genieName || bpInfo.playerChoice[i][1][j].genieName == props.genie.genieName){
          isBanned = true
          break
        }
      }
      if(isBanned)
        break
      for (let j = 0;j < 6;j++){
        if(i < bpInfo.nowRound - 1 && bpInfo.playerChoice[i][index][j].genieName == props.genie.genieName){
          isBanned = true
          break
        }
      }
    }
    if(isBanned)
      return isBanned
  }else if(bpInfo.position.order <= 10){
    let index = bpInfo.position.color == 'blue' ? 2 : 3
    for (let i = 0;i < bpInfo.nowRound;i++){
      for (let j = 0;j < bpInfo.ban_nums[i];j++){
        if(bpInfo.playerChoice[i][0][j].genieName == props.genie.genieName || bpInfo.playerChoice[i][1][j].genieName == props.genie.genieName){
          isBanned = true
          break
        }
      }
      if(isBanned)
        break
      for (let j = 0;j < 6;j++){
        if(bpInfo.playerChoice[i][index][j].genieName == props.genie.genieName){
          isBanned = true
          break
        }
      }
    }
    if(isBanned)
      return isBanned
  }
  return isBanned
})

// const beOpBanned = computed(()=>{
//   let isBanned = bpInfo.ban.some((banGenie) => banGenie.genieName == props.genie);
//   if(isBanned)
//     return isBanned
//   if(bpInfo.position.order <= 4){
//     let index = bpInfo.position.color == 'blue' ? 3 : 2
//     for (let i = 0;i < bpInfo.nowRound;i++){
//       for (let j = 0;j < 5;j++){
//         if(bpInfo.playerChoice[i][0][j].genieName == props.genie || bpInfo.playerChoice[i][1][j].genieName == props.genie){
//           isBanned = true
//           break
//         }
//       }
//       if(isBanned)
//         break
//       for (let j = 0;j < 6;j++){
//         if(i < bpInfo.nowRound - 1 && bpInfo.playerChoice[i][index][j].genieName == props.genie){
//           isBanned = true
//           break
//         }
//       }
//     }
//     if(isBanned)
//       return isBanned
//   }else if(bpInfo.position.order <= 10){
//     let index = bpInfo.position.color == 'blue' ? 3 : 2
//     for (let i = 0;i < bpInfo.nowRound;i++){
//       for (let j = 0;j < 5;j++){
//         if(bpInfo.playerChoice[i][0][j].genieName == props.genie || bpInfo.playerChoice[i][1][j].genieName == props.genie){
//           isBanned = true
//           break
//         }
//       }
//       if(isBanned)
//         break
//       for (let j = 0;j < 6;j++){
//         if(bpInfo.playerChoice[i][index][j].genieName == props.genie){
//           isBanned = true
//           break
//         }
//       }
//     }
//     if(isBanned)
//       return isBanned
//   }
//   return isBanned
// })

const myImg = ref()

// const blueBan = computed(()=>{
//   if(bpInfo.position.color == 'blue')
//     return beBanned.value
//   else
//     return beOpBanned.value
// })
//
// const redBan = computed(()=>{
//   if(bpInfo.position.color == 'blue')
//     return beOpBanned.value
//   else
//     return beBanned.value
// })

watch(()=>props.length,()=>{
  l.value = props.length * 0.1
  l_margin.value = props.length * 0.0055
})

watch(()=>props.genie.genieName,()=>{
  url.value = '../../public/'+ props.genie.attribute + '/' + props.genie.genieName + '.png'
})

const backgroundColor = ref()
const backColorMask = ref()
const hover = ref(false)

const choose = ()=>{
  if(!beBanned.value)
    bpInfo.choose = props.genie
}

const hoverEnter = () => {
  if(!beBanned.value)
    hover.value = true
}

const getMainColor=()=> {
  const img = myImg.value; // 通过ref属性获取到图片元素


  const canvas = document.createElement('canvas'); // 创建画布对象
  const context = canvas.getContext('2d'); // 获取上下文

  canvas.width = img.naturalWidth || img.clientWidth; // 设置画布大小为图片原始宽度或者客户区域宽度（如果未定义）
  canvas.height = img.naturalHeight || img.clientHeight; // 设置画布高度为图片原始高度或者客户区域高度（如果未定义）

  context.drawImage(img, 0, 0); // 将图片绘制到画布上
  img.crossOrigin = ''//防止跨域报错不能使用，但依然会报错
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height).data; // 获取图像数据

  let rTotal = 0;
  let gTotal = 0;
  let bTotal = 0;
  let total = 0
  for (let i = 0; i < imageData.length; i += 4) {
    rTotal += imageData[i];
    gTotal += imageData[i + 1];
    bTotal += imageData[i + 2];
    if(rTotal == 0)
      total = total + 1
  }

  const totalPixels = total;
  const avgR = Math.round(rTotal / totalPixels);
  const avgG = Math.round(gTotal / totalPixels);
  const avgB = Math.round(bTotal / totalPixels);

  backgroundColor.value = 'rgb(' + avgR + "," + avgG  + "," + avgB + ',0.9' +')'
  backColorMask.value = 'linear-gradient(to bottom,' + backgroundColor.value + ","
  backColorMask.value += backgroundColor.value+ ',rgb(' + avgR + "," + avgG  + "," + avgB + "," + "0.1)"
  console.log(backColorMask.value)

}

</script>

<template>
  <div :class="[!beBanned ? 'genie': 'genie_choose', hover ? 'genie_hover' : '',bpInfo.choose == genie ? 'genie_focus': '']" @click="choose" @mouseenter="hoverEnter" @mouseleave="hover = false">
    <div class="genie_outer">
      <div class="genie_pic">
        <img class="genie_pic_inner" :src="url" ref="myImg" @load="getMainColor">
        <div class="mask" v-if="beBanned"></div>
      </div>
      <div class="genie_text">
        <!--        <div class="genie_choice" style="margin-right: 2px;color: #191cde;" v-if="blueBan">×</div>-->
        {{props.genie.genieName}}
        <!--        <div class="genie_choice" style="margin-left: 2px;color: #bb0d20" v-if="redBan">×</div>-->
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes shake {
  0%, 100% {
    transform: rotate(-3deg);
  }
  50% {
    transform: rotate(3deg);
  }
}

.genie{
  box-sizing: border-box;
  width: v-bind(l + 'px');
  height: v-bind(l + 15 + 'px');
  background: white;
  margin: v-bind(l_margin + 'px');
  border-radius: 10px;
  border: 5px solid rgba(51, 23, 65, 0.3);
  cursor: pointer;
  transition: all 0.5s;
}

.genie_choose{
  box-sizing: border-box;
  width: v-bind(l + 'px');
  height: v-bind(l + 15 + 'px');
  background: white;
  margin: v-bind(l_margin + 'px');
  border-radius: 10px;
  border: 5px solid rgba(51, 23, 65, 0.3);
  cursor: not-allowed;
}

.genie_hover{
  border: 5px solid yellow;
  .genie_text{
    color: white;
  }
  .genie_pic_inner{
    width: v-bind(l + 35 + 'px');
    height: v-bind(l + 35 + 'px');
    animation: shake 1s infinite alternate;
  }
}

.genie_focus{
  border: 5px solid red;

  .genie_text{
    color: white;
  }

  .genie_pic_inner{
    width: v-bind(l + 35 + 'px');
    height: v-bind(l + 35 + 'px');
    animation: none;
  }
}


.genie_text{
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  font-size: 11px;
  padding-top: 2px;
  height: 20px;
  color: #d9cbcb;
  background: rgba(46,55,89,0.7);
  border-radius: 0 0 5px 5px;
  font-weight: bold;
  align-items: center;
  white-space: nowrap;
}

.genie_outer{
  display: flex;
  flex-direction: column;
  width: v-bind(l - 10 + 'px');
  height: v-bind(l + 5 + 'px');
  background: v-bind(backColorMask);
}

.genie_pic{
  position: relative;
  width: v-bind(l - 10 + 'px');
  height: v-bind(l - 10 + 'px');
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: all 0.5s;
}

.mask{
  position: absolute;
  z-index: 10;
  width: v-bind(l - 10 + 'px');
  height: v-bind(l - 10 + 'px');
  background: rgba(25,30,47,0.7);
}

.genie_pic_inner{
  width: v-bind(l + 25 + 'px');
  height: v-bind(l + 25 + 'px');
  transition: all 1s;
}

.genie_choice{
  height: 18px;
  margin-top: -10.5px;
  font-weight: bold;
  font-size: 20px;
}
</style>