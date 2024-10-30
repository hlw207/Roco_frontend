<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useManaInfoStore} from "@/pages/mana/manaInfo";
import ManaBan from "@/pages/mana/component/manaBan.vue";
import {attributes} from "@/stores/info";
import Genie from "@/pages/bp/component/genie.vue";
import {computed} from "vue";
import ManaChoice from "@/pages/mana/component/manaChoice.vue";
import ManaAttribute from "@/pages/mana/component/manaAttribute.vue";
import ManaRound from "@/pages/mana/component/manaRound.vue";
import ManaGenie from "@/pages/mana/component/manaGenie.vue";
import {watch} from "vue";
import ManaCertainButton from "@/pages/mana/component/manaCertainButton.vue";
import ManaBanButton from "@/pages/mana/component/manaBanButton.vue";
import ManaPublicBanButton from "@/pages/mana/component/manaPublicBanButton.vue";
import ManaChangeRound from "@/pages/mana/component/manaChangeRound.vue";
import ManaCheckRound from "@/pages/mana/component/manaCheckRound.vue";
import ManaGrade from "@/pages/mana/component/manaGrade.vue";

const width = window.innerWidth
const height = window.innerHeight

const url = ref('../../public/back3.jpg')
const urlLogo = ref('../../public/urlLogo3.png')
const urlB = ref('../../public/teamB.png')
const urlR = ref('../../public/teamR.png')
const urlBP = ref('../../public/manaBanB.jpg')
const urlRP = ref('../../public/manaBanR.jpg')
const urlPic = ref('../../public/teamB.png')

const grades = ref([5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5])

const attrPic = computed(()=>{
  return '../../public/' + bpInfo.nowAttribute + '.png'
})

const scrollerManaBox = ref()
const scrollerHeight = ref()
const scrollerWidth = ref()

const bpInfo = useManaInfoStore()

const changeAttribute = () =>{
  bpInfo.choose = {attribute: "", genieName: "", grade: 0, viceAttribute: "", extra: ""}
  bpInfo.nowAttribute = "魔力值"
}

const change = (grade: number) => {
  bpInfo.grade = grade
}

watch(()=>scrollerManaBox.value, ()=>{
  scrollerWidth.value = scrollerManaBox.value.offsetWidth
})

watch(()=>bpInfo.nowAttribute , ()=>{
  if(bpInfo.nowAttribute != '魔力值')
    bpInfo.getGenieByAttribute()
  else
    bpInfo.getGenieByGrade()
})

watch(()=>bpInfo.grade, ()=>{
  bpInfo.getGenieByGrade()
})

watch(()=>bpInfo.nowRound, ()=>{
  bpInfo.position.color = 'blue'
  bpInfo.position.order = 0
})

onMounted(()=>{
  if(bpInfo.nowAttribute != '魔力值')
    bpInfo.getGenieByAttribute()
  else
    bpInfo.getGenieByGrade()
})
</script>

<template>
  <img :src="url" class="picture" />
  <div class="main">
    <div style="height: 100px;display: flex;align-items: center;justify-content: center">
      <div style="display: flex;width: 50%;justify-content: left;margin-left: 30px;align-items: center" v-if="bpInfo.nowRound != 0">
        <template v-for="(ban,index) in bpInfo.playerChoice[bpInfo.nowRound - 1][0]">
          <ManaBan color="blue" :show="false" :ban-round="bpInfo.nowRound" :genie-name="ban.genieName" :attribute="ban.attribute" :can-delete="true" :order="index"/>
        </template>
      </div>
      <img :src="urlLogo" style="height: 75px;" />
      <div style="display: flex;width: 50%;;justify-content: right;margin-right: 30px;align-items: center" v-if="bpInfo.nowRound != 0">
        <template v-for="(ban,index) in bpInfo.playerChoice[bpInfo.nowRound - 1][1]">
          <ManaBan color="red" :show="false" :ban-round="bpInfo.nowRound" :genie-name="ban.genieName" :attribute="ban.attribute" :can-delete="true" :order="index"/>
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
          <ManaChoice color-box="rgba(87, 138, 187, 0.9)" :url="urlBP" color="blue" :order="index + 5" :genie="genie"/>
        </template>

        <template v-for="index in 6" v-if="bpInfo.nowRound == 0">
          <ManaChoice color-box="rgba(87, 138, 187, 0.9)" :url="urlBP" color="blue" :order="index + 5" :genie='{grade: 0, viceAttribute: "", attribute : "",genieName: "", extra: ""}'/>
        </template>
      </div>
      <div style="width: 70%;background: rgba(54,18,51,0.3);padding: 10px 10px;display: flex;flex-direction: column">
        <div style="display: flex">
          <div class="attribute" :class="{attribute_choice: bpInfo.nowAttribute == '魔力值'}" @click="changeAttribute">
            <div style="display: flex;justify-content: center;align-items: center;height: 50px">
              <img :src="urlPic" style="height: 38px">
            </div>
            <div style="display: flex;justify-content: center;align-items: center;height: 16px;font-size: 13px">
              魔力值
            </div>
          </div>
          <template v-for="attribute in attributes">
            <ManaAttribute :attribute="attribute"></ManaAttribute>
          </template>
        </div>
        <div ref="scrollerManaBox" style="box-sizing:border-box;display: flex;flex: 1;flex-direction: column;align-items: center;justify-content: center;margin: 20px -2px;">
          <el-scrollbar :height="scrollerWidth * 0.44 + 60" style="position: relative;width: 100%" v-if="bpInfo.nowAttribute != '魔力值'">
            <ManaRound />
            <div style="height: 100%;display: flex;flex-wrap: wrap;margin-top: -5px">
              <template v-for="(genies, index) in bpInfo.genie">
                <div style="width: 100%;margin-left: 8px;display: flex;align-items: center;font-size: 22px;font-weight: bold;color: #d9cbcb;margin-bottom: 5px;margin-top: 5px" v-if="genies.length != 0">
                  <img :src="attrPic" style="height: 30px;margin-right: 5px" />
                  {{((10 - index) / 2)}}分：
                </div>
                <template v-for="(genie, index) in genies">
                  <ManaGenie :length="scrollerWidth" :genie="genie"/>
                </template>
              </template>
            </div>
          </el-scrollbar>

          <el-scrollbar :height="scrollerWidth * 0.44 + 60" style="position: relative;width: 100%" v-if="bpInfo.nowAttribute == '魔力值'">
            <ManaRound />
            <div style="height: 100%;display: flex;flex-wrap: wrap;margin-top: -5px">
              <div style="width: 100%;display: flex;align-items: center">
                <template v-for="grade in grades">
                  <div class="attributeShow" :class="{attributeShow_active: bpInfo.grade == grade}" @click="change(grade)">
                    <div style="display: flex;align-items: center;justify-content: center;flex: 1;font-size: 14px;">{{grade}}分</div>
                  </div>
                </template>
              </div>

              <div style="width: 100%;display: flex;flex-wrap: wrap;margin-top: 8px">
                <template v-for="(genie, index) in bpInfo.genie[0]">
                  <ManaGenie :length="scrollerWidth" :genie="genie"/>
                </template>
              </div>
            </div>
          </el-scrollbar>

          <div style="display: flex;position: relative;width: 100%;justify-content: center;margin-top: 30px">
            <ManaCertainButton v-if="bpInfo.nowRound != 0"/>
            <ManaBanButton v-if="bpInfo.nowRound != 0"/>
            <ManaPublicBanButton v-if="bpInfo.nowRound == 0"/>
            <ManaCheckRound :height="scrollerWidth * 0.44 + 60" :width="scrollerWidth"/>
            <ManaGrade v-if="bpInfo.nowRound != 0"/>
            <ManaChangeRound />
          </div>
        </div>
      </div>
      <div style="width: 20%;background: rgba(188,255,188,0.15);display: flex;flex-direction: column;align-items: center;padding-top: 15px">
        <div style="font-weight: bold;font-size: 25px;color: #d9cbcb;margin-bottom: 10px;margin-top: 8px;display: flex;align-items: center">
          <el-image :src="urlR" style="height: 40px;margin-right: 15px"></el-image>
          红方阵容
        </div>
        <template v-for="(genie, index) in bpInfo.playerChoice[bpInfo.nowRound - 1][3]"  v-if="bpInfo.nowRound > 0">
          <ManaChoice color-box="rgba(183, 118, 123, 0.9)" :url="urlRP" color="red" :order="index + 5" :genie="genie"/>
        </template>

        <template v-for="index in 6"  v-if="bpInfo.nowRound == 0">
          <ManaChoice color-box="rgba(183, 118, 123, 0.9)" :url="urlRP" color="red" :order="index + 5" :genie="{grade: 0, viceAttribute: '', attribute : '',genieName: ''}"/>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.picture{
  position: fixed;
  width: v-bind(width + 'px');
  height: v-bind(height + 'px');
  z-index: 0;
}

.main{
  overflow: hidden;
  color: rgba(87, 138, 187, 0.7);
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
}

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

.attributeShow{
  margin: 6px 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 70px;
  background: #C5CAE9;
  border-radius: 15px;
  cursor: pointer;
  color: #4C6080;
  border: 1px solid grey;
}

.attributeShow_active{
  background: #9AC5FF;
  color: black;
  pointer-events: none;
}

.attributeShow:hover{
  background: #9AC5FF;
  color: black;
}
</style>