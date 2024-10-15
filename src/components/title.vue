<script setup lang="ts">
const props = defineProps<{
  name: string,
}>()
</script>

<template>
  <div style="display: flex;justify-items: center;align-items: center;flex-direction: column;color: #69c0ff">
    <div style="font-size: 17px;margin-top: 2px">{{props.name}}</div>
    <div style="display: flex;align-items: center;justify-items: center;">
      <div style="height: 2px;width: 45px;background: #69c0ff"></div>
      <el-icon style="font-size: 8px;color: #69c0ff"><StarFilled /></el-icon>
      <div style="height: 2px;width: 45px;background: #69c0ff"></div>
    </div>
  </div>
</template>

<style scoped>

</style>