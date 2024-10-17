<script setup lang="ts">
import {useDictionaryInfoStore} from "@/pages/dictionary/dictionaryInfo";

const props = defineProps<{
  name: string
  grade: number
}>()

const dictionary = useDictionaryInfoStore()
const changeGenie = () =>{
  dictionary.choose.genieName = props.name
  dictionary.choose.attribute = dictionary.now_attribute
}
</script>

<template>
  <div class="genieShow" @click="changeGenie" :class="{genieShow_click: props.name == dictionary.choose.genieName}">
    <div style="height: 35px;display: flex;flex-direction: column;align-items: center;padding-top: 8px">
      <div v-if="props.grade >= 90" style="font-size: 11px;">S</div>
      <div v-if="props.grade >= 80 && props.grade < 90" style="font-size: 11px;">A</div>
      <div v-if="props.grade >= 70 && props.grade < 80" style="font-size: 11px;">B</div>
      <div v-if="props.grade < 70" style="font-size: 11px;">C</div>
      <div style="font-weight: bold;font-size: 16px;letter-spacing: 4px">{{props.name}}</div>
    </div>
    <div style="height: 150px;width: 150px;display: flex;align-items: center;justify-content: center;overflow: hidden">
      <img :src="'../../../public/' + dictionary.now_attribute + '/' + props.name + '.png'" style="width: 180px;height: 180px">
    </div>
    <img :src="'../../../public/' + dictionary.now_attribute + '.png'" style="height: 22px">
  </div>
</template>
<style scoped>
.genieShow{
  margin-right: 30px;
  margin-bottom: 25px;
  height: 220px;
  width: 150px;
  cursor: pointer;
  background: white;
  box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.genieShow:hover{
  background:  #b5f5ec;
}

.genieShow_click{
  background: #b5f5ec;
}
</style>