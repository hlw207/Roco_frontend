<script setup lang="ts">
import {computed} from "vue";

const props = defineProps<{
  choose: number
}>()

const color = computed(()=>{
  if(props.choose % 3 == 0)
    return 'red'
  else if(props.choose % 3 == 1)
    return 'blue'
  else
    return 'green'
})
</script>

<template>
  <div style="display: flex;align-items: center;justify-items: center;font-size: 12px;padding: 3px 6px" :class="color">
    更新
  </div>
</template>

<style scoped>
.red{
  background: #fff0f0;
  color: #fdb5b6;
}

.blue{
  background: #dee6fa;
  color: #a0b7ff;
}

.green{
  background: #edf9ee;
  color: #8fd58f;
}
</style>