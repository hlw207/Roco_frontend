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

</script>

<template>
  <div class="genieCollect">
    <div style="height: 80px;display: flex;align-items: center;justify-content: center;overflow: hidden">
      <img :src="url" style="height: 100px;width: 100px">
    </div>
    <div class="genieText">
      {{props.genie != null ? props.genie.genieName : props.manaGenie.genieName}}
      <div v-if="props.manaGenie != null && props.manaGenie.extra != ''">
        ({{props.manaGenie.extra}})
      </div>
    </div>
    <div style="height: 30px;display: flex;align-items: center">
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
  box-sizing: border-box;
  width: 100px;
  height: 130px;
  border: 1px solid rgba(115, 115, 115, 0.3);
  margin-right: 10px;
  margin-bottom: 15px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
}

.genieText{
  height: 20px;
  border-radius: 15px;
  width: 90px;
  margin: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #40a9ff;
  color: white;
  font-size: 11px;
  flex-wrap: nowrap;
}

.pic{
  width: 20px;
  height: 20px;
  margin: 0 6px;
}

.gradeShow{
  margin-right: 5px;
  background: #ffa940;
  color: white;
  height: 15px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 6px;
  font-size: 13px;
}
</style>