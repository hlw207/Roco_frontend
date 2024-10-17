<script setup lang="ts">
import {useManaInfoStore} from "@/pages/mana/manaInfo";
import {computed} from "vue";

const bpInfo = useManaInfoStore()

const blueGrade = computed(()=>{
  let grade = 0
  for (const genie of bpInfo.playerChoice[bpInfo.nowRound - 1][2]){
    console.log(genie)
    if(genie.grade != null)
      grade += genie.grade
  }
  return grade
})

const redGrade = computed(()=>{
  let grade = 0
  for (const genie of bpInfo.playerChoice[bpInfo.nowRound - 1][3]){
    console.log(genie)
    if(genie.grade != null)
      grade += genie.grade
  }
  return grade
})
</script>

<template>
  <div class="grade">
    <div style="">蓝方：{{blueGrade}}分</div>
    <div style="margin-left: 15px">红方：{{redGrade}}分</div>
  </div>
</template>

<style scoped>
.grade{
  font-weight: bolder;
  font-size: 18px;
  color: #d9cbcb;
  position: absolute;
  bottom: 0;
  left: 10px;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: right;
  flex: 1;
  padding-right: 10px;

}

</style>