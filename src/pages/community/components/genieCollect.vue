<script setup lang="ts">
import type {genie, manaGenie} from "@/util/interface";
import {computed, ref, watch} from "vue";
import {useChooseInfoStore} from "@/pages/community/components/chooseInfo";

const info = useChooseInfoStore()

const props = defineProps<{
  genie?: genie,
  manaGenie?: manaGenie
}>()

const url = computed(() => '../../public/'+ (props.genie != null ? props.genie.attribute : props.manaGenie.attribute) + '/' + (props.genie != null ? props.genie.genieName : props.manaGenie.genieName) + '.png')

const urlA = computed(() => '../../public/' + (props.genie != null ? props.genie.attribute : props.manaGenie.attribute) + '.png')
const urlVA = computed(() => '../../public/' + (props.genie != null ? props.genie.viceAttribute : props.manaGenie.viceAttribute) + '.png')

const grade = computed(()=>{
  if(props.manaGenie != null)
    return props.manaGenie.grade
  else {
    if(props.genie.grade >= 90)
      return 'S'
    else if(props.genie.grade >= 80)
      return 'A'
    else if(props.genie.grade >= 70)
      return 'B'
    else
      return 'C'
  }
})

const choose = () =>{
  if(props.genie != null)
    info.choose = props.genie
  else
    info.manaChoose = props.manaGenie
}
</script>

<template>
  <div class="genieCollect" :class="{genieCollect_active : props.genie == info.choose || props.manaGenie == info.manaChoose}" @click="choose">
    <div style="height: 110px">
      <img :src="url" style="height: 110px;width: 110px">
    </div>
    <div class="genieText">
      {{props.genie != null ? props.genie.genieName : props.manaGenie.genieName}}
      <div v-if="props.manaGenie != null && props.manaGenie.extra != ''">
        ({{props.manaGenie.extra}})
      </div>
    </div>
    <div style="height: 35px;display: flex;align-items: center">
      <img :src="urlA" class="pic"/>
      <img :src="urlVA" v-if="(props.genie != null && props.genie.viceAttribute != '') || (props.manaGenie != null && props.manaGenie.viceAttribute != '')" class="pic" style="margin-left: 0"/>
      <div style="display: flex;justify-content: right;flex: 1">
        <div class="gradeShow">{{grade}}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.genieCollect{
  width: 110px;
  height: 170px;
  border: 1px solid rgba(115, 115, 115, 0.3);
  margin-right: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.genieText{
  height: 25px;
  border-radius: 15px;
  width: 100px;
  margin: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #40a9ff;
  color: white;
  font-size: 12px;
  flex-wrap: nowrap;
}

.genieCollect:hover{
  background: rgba(115, 115, 115, 0.3);
}

.genieCollect_active{
  background: rgba(115, 115, 115, 0.3);
  pointer-events: none;
}

.pic{
  width: 22px;
  height: 22px;
  margin: 0 7px;
}

.gradeShow{
  margin-right: 5px;
  background: #ffa940;
  color: white;
  height: 22px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 6px;
  font-size: 13px;
}
</style>