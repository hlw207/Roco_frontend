<script setup lang="ts">
import {useBPInfoStore} from "@/pages/bp/bpInfo";
import {ref} from "vue";

const bpInfo = useBPInfoStore()
const show = ref(false)

const clear = ()=>{
  bpInfo.removeElem()
  show.value = false
}

const add = ()=>{
  bpInfo.addElem()
}
</script>

<template>
  <div class="check">
    <div class="check_text" v-if="bpInfo.totalRound == bpInfo.nowRound && bpInfo.totalRound != 0" @click="show=true">清除本轮</div>
    <div class="check_text" @click="add" v-if="bpInfo.totalRound == bpInfo.nowRound">进入下轮</div>
  </div>

  <el-dialog
      v-model="show"
      title="警告"
      width="400"
  >
    <div style="margin-top: -20px">确定删除？一旦删除不可恢复!!!</div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="show = false">取消</el-button>
        <el-button type="primary" @click="clear">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.check{
  box-sizing: border-box;
  position: absolute;
  right: 75px;
  bottom: 0;
  display: flex;
  justify-content: right;
  height: 22px;
}

.check_text{
  margin-right: 20px;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.check_text:hover{
  border-bottom: 1px solid white;
}
</style>