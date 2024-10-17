<script setup lang="ts">
import {computed, onMounted, ref, watch} from "vue";
import {attributes, genieTotal} from "@/stores/info";
import Choice from "@/pages/bp/component/choice.vue";
import CertainButton from "@/pages/bp/component/certainButton.vue";
import BanButton from "@/pages/bp/component/banButton.vue";
import {useBPInfoStore} from "@/pages/bp/bpInfo";
import PublicBanButton from "@/pages/bp/component/publicBanButton.vue";
import Ban from "@/pages/bp/component/ban.vue";
import Attribute from "@/pages/bp/component/attribute.vue";
import Round from "@/pages/bp/component/Round.vue";
import Genie from "@/pages/bp/component/genie.vue";
import CheckRound from "@/pages/bp/component/checkRound.vue";
import ChangeRound from "@/pages/bp/component/changeRound.vue";

const bpInfo = useBPInfoStore()

const width = window.innerWidth
const height = window.innerHeight

const url = ref('../../public/back3.jpg')
const urlLogo = ref('../../public/logo.png')
const urlB = ref('../../public/teamB.png')
const urlR = ref('../../public/teamR.png')
const urlBP = ref('../../public/Blue.png')
const urlRP = ref('../../public/Red.png')

const attrPic = computed(()=>{
  return '../../public/' + bpInfo.nowAttribute + '.png'
})

const scrollerBox = ref()
const scrollerHeight = ref()
const scrollerWidth = ref()

watch(()=>scrollerBox.value, ()=>{
  scrollerWidth.value = scrollerBox.value.offsetWidth
})

watch(()=>bpInfo.nowAttribute , ()=>{
   bpInfo.getGenieByAttribute()
})

watch(()=>bpInfo.nowRound, ()=>{
  bpInfo.position.color = 'blue'
  bpInfo.position.order = 0
})

onMounted(()=>{
  scrollerHeight.value = height * 0.67
  scrollerWidth.value = scrollerBox.value.offsetWidth
  bpInfo.getGenieByAttribute()
  // 初始化获取判断(之后)
})
</script>

<template>
  <img :src="url" class="picture" />
  <div class="main">
    <div style="height: 100px;display: flex;align-items: center;justify-content: center">
      <div style="display: flex;width: 50%;justify-content: left;margin-left: 30px;align-items: center" v-if="bpInfo.nowRound != 0">
        <template v-for="(ban,index) in bpInfo.playerChoice[bpInfo.nowRound - 1][0]">
          <Ban color="blue" :show="false" :ban-round="bpInfo.nowRound" :genie-name="ban.genieName" :attribute="ban.attribute" :can-delete="true" :order="index"/>
        </template>
      </div>
      <img :src="urlLogo" style="height: 100px" />
      <div style="display: flex;width: 50%;;justify-content: right;margin-right: 30px;align-items: center" v-if="bpInfo.nowRound != 0">
        <template v-for="(ban,index) in bpInfo.playerChoice[bpInfo.nowRound - 1][1]">
          <Ban color="red" :show="false" :ban-round="bpInfo.nowRound" :genie-name="ban.genieName" :attribute="ban.attribute" :can-delete="true" :order="index"/>
        </template>
      </div>
    </div>
    <div style="display: flex;flex: 1;">
      <div style="width: 20%;background: rgba(127,255,0,0.1);display: flex;flex-direction: column;align-items: center;padding-top: 15px">
        <div style="font-weight: bold;font-size: 25px;color: #d9cbcb;margin-bottom: 10px;margin-top: 8px;display: flex;align-items: center">
          <img :src="urlB" style="width: 40px;margin-right: 15px" />
          蓝方阵容
        </div>
        <template v-for="(genie, index) in bpInfo.playerChoice[bpInfo.nowRound - 1][2]" v-if="bpInfo.nowRound > 0">
          <Choice color-box="rgba(87, 138, 187, 0.9)" :url="urlBP" color="blue" :order="index + 5" :attribute="genie.attribute" :genie-name="genie.genieName"/>
        </template>

        <template v-for="index in 6" v-if="bpInfo.nowRound == 0">
          <Choice color-box="rgba(87, 138, 187, 0.9)" :url="urlBP" color="blue" :order="index + 5" attribute="" genie-name=""/>
        </template>
      </div>
      <div style="width: 70%;background: rgba(54,18,51,0.3);padding: 10px 10px;display: flex;flex-direction: column">
        <div style="display: flex">
          <template v-for="attribute in attributes">
            <Attribute :attribute="attribute"></Attribute>
          </template>
        </div>
        <div ref="scrollerBox" style="box-sizing:border-box;display: flex;flex: 1;flex-direction: column;align-items: center;justify-content: center;margin: 20px -2px;">
          <el-scrollbar :height="scrollerWidth * 0.44 + 60" style="width: 100%">
            <div style="height: 100%;display: flex;flex-wrap: wrap;">
              <div style="width: 100%;margin-left: 8px;display: flex;align-items: center;font-size: 22px;font-weight: bold;color: #d9cbcb;margin-bottom: 5px;margin-top: 0px">
                <img :src="attrPic" style="height: 30px;margin-right: 5px" />
                S级：
                <Round />
              </div>
              <template v-for="(genie, index) in bpInfo.genie[0]">
                <Genie :length="scrollerWidth" :genie="genie"/>
              </template>

              <div style="width: 100%;margin-left: 8px;display: flex;align-items: center;font-size: 22px;font-weight: bold;color: #d9cbcb;margin-bottom: 5px;margin-top: 5px">
                <img :src="attrPic" style="height: 30px;margin-right: 5px" />
                A级：
              </div>
              <template v-for="(genie, index) in bpInfo.genie[1]">
                <Genie :length="scrollerWidth" :genie="genie"/>
              </template>

              <div style="width: 100%;margin-left: 8px;display: flex;align-items: center;font-size: 22px;font-weight: bold;color: #d9cbcb;margin-bottom: 5px;margin-top: 5px">
                <img :src="attrPic" style="height: 30px;margin-right: 5px" />
                B级：
              </div>
              <template v-for="(genie, index) in bpInfo.genie[2]">
                <Genie :length="scrollerWidth" :genie="genie"/>
              </template>

              <div style="width: 100%;margin-left: 8px;display: flex;align-items: center;font-size: 22px;font-weight: bold;color: #d9cbcb;margin-bottom: 5px;margin-top: 5px">
                <img :src="attrPic" style="height: 30px;margin-right: 5px" />
                C级：
              </div>
              <template v-for="(genie, index) in  bpInfo.genie[3]">
                <Genie :length="scrollerWidth" :genie="genie"/>
              </template>
            </div>
          </el-scrollbar>
          <div style="display: flex;position: relative;width: 100%;justify-content: center">
            <CertainButton v-if="bpInfo.nowRound != 0"/>
            <BanButton v-if="bpInfo.nowRound != 0"/>
            <PublicBanButton v-if="bpInfo.nowRound == 0"/>
            <CheckRound :height="scrollerWidth * 0.44 + 60" :width="scrollerWidth"/>
            <ChangeRound />
          </div>
        </div>
      </div>
      <div style="width: 20%;background: rgba(188,255,188,0.15);display: flex;flex-direction: column;align-items: center;padding-top: 15px">
        <div style="font-weight: bold;font-size: 25px;color: #d9cbcb;margin-bottom: 10px;margin-top: 8px;display: flex;align-items: center">
          <el-image :src="urlR" style="height: 40px;margin-right: 15px"></el-image>
          红方阵容
        </div>
        <template v-for="(genie, index) in bpInfo.playerChoice[bpInfo.nowRound - 1][3]"  v-if="bpInfo.nowRound > 0">
          <Choice color-box="rgba(183, 118, 123, 0.9)" :url="urlRP" color="red" :order="index + 5" :attribute="genie.attribute" :genie-name="genie.genieName"/>
        </template>

        <template v-for="index in 6"  v-if="bpInfo.nowRound == 0">
          <Choice color-box="rgba(183, 118, 123, 0.9)" :url="urlRP" color="red" :order="index + 5" attribute='' genie-name=''/>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main{
  overflow: hidden;
  color: rgba(87, 138, 187, 0.7);
  position: relative;
  //width: v-bind(width + 'px');
  //height: v-bind(height + 'px');
  z-index: 1;
  display: flex;
  flex-direction: column;
}

.picture{
  position: fixed;
  width: v-bind(width + 'px');
  height: v-bind(height + 'px');
  z-index: 0;
}

</style>