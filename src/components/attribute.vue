<script setup lang="ts">
import {ref} from "vue";
import {useBPInfoStore} from "@/pages/bp/bpInfo";
const props = defineProps<{
  attribute: string
}>()

const bpInfo = useBPInfoStore()
const url = ref('../../public/'+ props.attribute + '.png')

const changeAttribute = () =>{
  bpInfo.choose = ''
  bpInfo.nowAttribute = props.attribute
}
</script>

<template>
  <div class="attribute" :class="{attribute_choice: bpInfo.nowAttribute == props.attribute}" @click="changeAttribute">
    <div style="display: flex;justify-content: center;align-items: center;height: 50px">
      <el-image :src="url" style="height: 38px"></el-image>
    </div>
    <div style="display: flex;justify-content: center;align-items: center;height: 16px;font-size: 13px">
      {{props.attribute}}
    </div>
  </div>
</template>

<style scoped>
.attribute{
  width: 50px;
  height: 72px;
  background: #9ed5de;
  margin: 0 5px;
  border-radius: 13px 13px 3px 3px;
  cursor: pointer;
}

.attribute_choice{
  background: #e0eff1;
}

.attribute:hover{
  background: #e0eff1;
}
</style>