<script setup lang="ts">
import {useDictionaryInfoStore} from "@/pages/dictionary/dictionaryInfo";

const props = defineProps<{
  attribute: string
}>()

const dictionary = useDictionaryInfoStore()

const change = () =>{
  dictionary.now_attribute = props.attribute
}
</script>

<template>
  <div class="attributeShow" :class="{attributeShow_active: props.attribute == dictionary.now_attribute}" @click="change">
    <div style="display: flex;align-items: center;justify-content: center;height: 30px;width: 30px">
      <img :src="'../../../../public/' + props.attribute + '.png'" style="height: 32px;width: 32px">
    </div>
    <div style="display: flex;align-items: center;justify-content: center;flex: 1;font-size: 14px;margin-left: -3px">{{props.attribute}}</div>
  </div>
</template>

<style scoped>
.attributeShow{
  margin: 6px 10px;
  display: flex;
  align-items: center;
  height: 30px;
  width: 80px;
  background: #E8EAF6;
  border-radius: 15px;
  cursor: pointer;
}

.attributeShow_active{
  background: #C6C6C6;
  pointer-events: none;
}

.attributeShow:hover{
  background: #C6C6C6;
}
</style>