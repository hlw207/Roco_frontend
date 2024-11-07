<script setup lang="ts">
import {ref} from "vue";
import {useChooseInfoStore} from "@/pages/community/components/chooseInfo";

const info = useChooseInfoStore()

const props = defineProps<{
  attribute: string
}>()

const url = ref('../../public/'+ props.attribute + '.png')

const changeAttribute = () =>{
  info.choose = {attribute: "", genieName: "", grade: 0, viceAttribute: ""}
  info.manaChoose = {attribute: "", genieName: "", grade: 0, viceAttribute: "", extra: ""}
  info.attribute = props.attribute
}
</script>

<template>
  <div class="attribute" :class="{attribute_choice: info.attribute == props.attribute}" @click="changeAttribute">
    <div style="display: flex;justify-content: center;align-items: center;height: 38px">
      <img :src="url" style="height: 30px">
    </div>
    <div style="display: flex;justify-content: center;align-items: center;height: 10px;font-size: 13px">
      {{props.attribute}}
    </div>
  </div>
</template>

<style scoped>
.attribute{
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-right: 10px;
}

.attribute:hover{
  background: rgba(115, 115, 115, 0.3);
  cursor: pointer;
}

.attribute_choice{
  background: rgba(115, 115, 115, 0.3);
  pointer-events: none;
}
</style>