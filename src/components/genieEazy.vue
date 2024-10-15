<script setup lang="ts">
import {ref} from "vue";

const props = defineProps<{
  attribute: string,
  name: string
}>()

const url = ref('../public/' + props.attribute + '/' + props.name + '.png')
</script>

<template>
  <div class="genie_eazy">
    <img :src="url" style="height: 60px;width: 60px;">
  </div>
</template>

<style scoped>
.genie_eazy{
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}


.genie_box{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  border: 1px solid #91d5ff;
  border-radius: 24px;
}
</style>