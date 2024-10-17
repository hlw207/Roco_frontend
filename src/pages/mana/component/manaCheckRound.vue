<script setup lang="ts">
import {ref, watch} from "vue";
import {useBPInfoStore} from "@/pages/bp/bpInfo";
import Ban from "@/pages/bp/component/ban.vue";
import {useManaInfoStore} from "@/pages/mana/manaInfo";
import ManaBan from "@/pages/mana/component/manaBan.vue";

const props = defineProps<{
  height: number,
  width: number,
}>()

const bpInfo = useManaInfoStore()

const height = ref(props.height)
const width = ref(props.width)

const show = ref(false)

watch(props,()=>{
  height.value = props.height
  width.value = props.width
})
</script>

<template>
  <div class="check">
    <div class="check_text" @click="show = true">查看禁宠</div>
    <div class="check_info" v-if="show">
      <el-scrollbar>
        <div class="check_title">
          公共禁宠
          <div class="check_button" @click="show = false">
            <span style="margin-top: -2px">×</span>
          </div>
        </div>
        <div class="check_box" style="flex-wrap: wrap">
          <template v-for="genie in bpInfo.ban">
            <ManaBan color="gold" :show="false" :attribute="genie.attribute" :genie-name="genie.genieName" :ban-round="0" :can-delete="true" :order="-1"/>
          </template>
        </div>
        <template v-for="i in bpInfo.totalRound">
          <div class="check_title">Round {{i}}</div>
          <div class="check_box">
            <div style="display: flex;width: 50%;justify-content: right;flex-direction: column">
              <div class="check_box_inner" style="justify-content: right">
                <template v-for="(genie,index) in bpInfo.playerChoice[i - 1][0]">
                  <ManaBan color="blue" :show="false" :attribute="genie.attribute" :genie-name="genie.genieName" :ban-round="i" :can-delete="false" :order="index"/>
                </template>
              </div>
              <div class="check_box_inner" style="justify-content: right">
                <template v-for="(genie,index) in bpInfo.playerChoice[i - 1][2]">
                  <ManaBan color="blue" :show="true" :attribute="genie.attribute" :genie-name="genie.genieName" :ban-round="i" :can-delete="false" :order="index + 5"/>
                </template>
              </div>
            </div>
            <div style="display: flex;width: 8%;align-items: center;justify-content: center;flex-direction: column;color: #d9cbcb;font-size: 18px;font-weight: bold">
              <div style="margin-bottom: 48px">Ban</div>
              <div>Pick</div>
            </div>
            <div style="display: flex;width: 50%;justify-content: left;flex-direction: column">
              <div class="check_box_inner">
                <template v-for="(genie,index) in bpInfo.playerChoice[i - 1][1]">
                  <ManaBan color="red" :show="false" :attribute="genie.attribute" :genie-name="genie.genieName" :ban-round="i" :can-delete="false" :order="index"/>
                </template>
              </div>
              <div class="check_box_inner">
                <template v-for="(genie,index) in bpInfo.playerChoice[i - 1][3]">
                  <ManaBan color="red" :show="true" :attribute="genie.attribute" :genie-name="genie.genieName" :ban-round="i" :can-delete="false" :order="index + 5"/>
                </template>
              </div>
            </div>
          </div>
        </template>
      </el-scrollbar>
    </div>
  </div>
</template>

<style scoped>
@keyframes slideInFromBottom {
  0% {
    transform: translateY(-100%) scale(0.5);
    opacity: 0;
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

.check{
  box-sizing: border-box;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 100;
  display: flex;
  justify-content: right;
  height: 22px;
}

.check_text{
  margin-right: 10px;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.check_text:hover{
  border-bottom: 1px solid white;
}

.check_info{
  box-sizing: border-box;
  position: absolute;
  z-index: 10;
  bottom: -20px;
  right: 5px;
  width: v-bind(width - 10 + 'px');
  height: v-bind(height + 93 + 'px');
  background: linear-gradient(to right,#0b103b, #2e030c);
  border: 3px solid rgba(245, 245, 245, 0.2);
  border-radius: 20px;
  padding: 15px;
  animation: slideInFromBottom 1s;
}

.check_title{
  position: relative;
  display: flex;
  justify-content: center;
  color: white;
  font-size: 20px;
  font-weight: bold;
  margin: 8px 0;
}

.check_box{
  margin: 20px 0;
  display: flex;
  justify-content: center;
}

.check_box_inner{
  display: flex;
  flex-wrap: wrap;
  margin: 0 8px;
}

.check_button{
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 15px;
  top: 0;
  height: 28px;
  width: 28px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: rgba(217, 203, 203, 0.3);
  font-size: 22px;
  font-weight: lighter;
  cursor: pointer;
}

.check_button:hover{
  color: white;
  border: 1px solid white;
}
</style>