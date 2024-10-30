<script setup lang="ts">
import {useDictionaryInfoStore} from "@/pages/dictionary/dictionaryInfo";
import type {genie} from "@/util/interface";

const props = defineProps<{
  genie: genie
}>()

const dictionary = useDictionaryInfoStore()
const changeGenie = () =>{
  dictionary.choose.genieName = props.genie.genieName
  dictionary.choose.attribute = props.genie.attribute
  dictionary.choose.viceAttribute = props.genie.viceAttribute
  dictionary.choose.grade = props.genie.grade
}
</script>

<template>
  <div class="genieShow" @click="changeGenie" :class="{genieShow_click: props.genie.genieName == dictionary.choose.genieName}">
    <div style="height: 35px;display: flex;flex-direction: column;align-items: center;padding-top: 8px">
      <div v-if="props.genie.grade >= 90" style="font-size: 11px;">S</div>
      <div v-if="props.genie.grade >= 80 && props.genie.grade < 90" style="font-size: 11px;">A</div>
      <div v-if="props.genie.grade >= 70 && props.genie.grade < 80" style="font-size: 11px;">B</div>
      <div v-if="props.genie.grade < 70" style="font-size: 11px;">C</div>
      <div style="font-weight: bold;font-size: 16px;letter-spacing: 4px">{{props.genie.genieName}}</div>
    </div>
    <div style="height: 150px;width: 150px;display: flex;align-items: center;justify-content: center;overflow: hidden">
      <img :src="'../../../public/' + props.genie.attribute + '/' + props.genie.genieName + '.png'" style="width: 180px;height: 180px">
    </div>
    <div style="display: flex;align-items: center">
      <img :src="'../../../public/' + props.genie.attribute + '.png'" style="height: 22px">
      <img :src="'../../../public/' + props.genie.viceAttribute + '.png'" style="height: 22px;margin-left: 10px" v-if="props.genie.viceAttribute != ''">
    </div>
  </div>
</template>
<style scoped>
.genieShow{
  margin-right: 20px;
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