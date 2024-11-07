<script setup lang="ts">

import GenieChoice from "@/pages/community/components/genieChoice.vue";
import {onMounted, ref, watch} from "vue";
import {useUserInfoStore} from "@/stores/user";
import {ElMessage} from "element-plus";
import {request} from "@/util/request";
import type {recommendInfo, userInfo} from "@/util/interface";
import LineUpRecommand from "@/pages/community/components/lineUpRecommand.vue";
import Comment from "@/pages/community/components/comment.vue";

const user = useUserInfoStore()

const show = ref(false)
const pages = ref(['攻略查看', '我的攻略'])
const now = ref('攻略查看')
const choice = ref(['魔力值', '阵容推荐', 5, "时间排序"])
const person = ref({
  id: '',
  people: ''
})
const total = ref(0)
const now_page = ref(1)
const people = ref([] as any[])
const lineUps = ref([] as recommendInfo[])

const choiceList = ref({
  "类型": ['魔力值', '花瓶'],
  "方向": ['阵容推荐', '宠物推荐'],
  "费用": [5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1],
  "排序": ["时间排序", "热度排序"]
})

const add = ()=>{
  if(user.id == ''){
    ElMessage.warning("请先登录再写攻略")
    return
  }else {
    show.value = !show.value
  }
}

const getInfo = () =>{
  request({
    url: '/recommend/lineUp',
    method: "get",
    params: {
      userId: person.value.id,
      type: choice.value[0],
      page: now_page.value - 1
    }
  }).then((res)=>{
    lineUps.value = res.data
    console.log(lineUps.value)
  })
}

const getTotal = () =>{
  request({
    url: '/recommend/lineUpTotal',
    method: 'GET',
    params:{
      type: choice.value[0]
    }
  }).then((res)=>{
    total.value = res.data
  })
}

watch(()=>choice.value[0], ()=>{
  if(choice.value[1] == '阵容推荐'){
    getInfo()
    getTotal()
  }
})

watch(()=>now_page.value, ()=>{
  getInfo()
})

const update = () =>{
  if(choice.value[1] == '阵容推荐'){
    getInfo()
    getTotal()
  }
}

onMounted(()=>{
  request({
    url: '/user/all',
    method: 'GET',
  }).then((res)=>{
    const pList : userInfo[] = res.data
    for (const p of pList){
      if(p.name != '')
        people.value.push({id: p.account, people: p.name})
      else
        people.value.push({id: p.account, people: p.account})
    }
  })
  getInfo()
})
</script>

<route lang="yaml">
  meta:
    layout: home
</route>

<template>
  <div class="top">
    <div class="top_box">
      <div class="top_box_c1"></div>
      <div class="top_box_c2"></div>
      <div class="top_box_main" style="padding: 0 0 20px;flex-direction: column">
        <div style="display: flex;padding: 10px 20px;align-items: center">
          <template v-for="page in pages">
            <div class="choose" :class="{choose_active: now == page}" @click="now=page">
              {{page}}
            </div>
          </template>
          <div style="display: flex;flex: 1;justify-content: right;">
            <el-icon style="font-size: 30px;color:#40a9ff;cursor: pointer" @click="add"><CirclePlusFilled /></el-icon>
          </div>
        </div>
        <div style="display: flex;margin-left: 30px;align-items: center">
          <div class="text">攻略类型:</div>
          <template v-for="type in choiceList['类型']">
            <div class="tag" :class="{tag_active: type == choice[0]}" @click="choice[0] = type;">{{type}}</div>
          </template>
        </div>
        <div style="display: flex;margin-left: 30px;align-items: center;margin-top: 10px">
          <div class="text">攻略方向:</div>
          <template v-for="direction in choiceList['方向']">
            <div class="tag" :class="{tag_active: direction == choice[1]}" @click="choice[1] = direction">{{direction}}</div>
          </template>
        </div>
        <div style="display: flex;margin-left: 30px;align-items: center;margin-top: 10px" v-if="choice[0] == '魔力值'">
          <div class="text">宠物费用:</div>
          <template v-for="fee in choiceList['费用']">
            <div class="tag" :class="{tag_active: fee == choice[2]}" @click="choice[2] = fee">{{fee}}</div>
          </template>
        </div>
        <div style="display: flex;margin-left: 30px;align-items: center;margin-top: 10px">
          <div class="text">只看他的:</div>
          <el-select
              v-model="person"
              value-key="id"
              filterable
              placeholder="只看他的帖子"
              style="width: 180px;margin-left: 8px;font-size: 13px;margin-right: 63px"
              @change="getInfo"
          >
            <el-option
                v-for="p in people"
                :key="p.id"
                :label="p.people"
                :value="p"
            />
          </el-select>

          <template v-for="sort in choiceList['排序']">
            <div class="tag" :class="{tag_active: sort == choice[3]}" @click="choice[3] = sort">{{sort}}</div>
          </template>
        </div>

        <template v-for="lineUp in lineUps">
          <LineUpRecommand :id="lineUp.id" :date="lineUp.date" :comment="lineUp.comment" :type="lineUp.type" :user="lineUp.user" :mana-genie-list="lineUp.manaGenieList" v-if="lineUp.type == '魔力值'"/>
          <LineUpRecommand :id="lineUp.id" :date="lineUp.date" :comment="lineUp.comment" :type="lineUp.type" :user="lineUp.user" :genie-list="lineUp.genieList"  v-if="lineUp.type != '魔力值'"/>
        </template>

        <el-pagination background layout="prev, pager, next" :total="total" :page-size="10" v-model:current-page="now_page" style="margin-top: 10px;margin-left: 30px"/>
        <Comment :show="show" @update="update"/>
      </div>
      <div class="top_box_c2"></div>
      <div class="top_box_c1"></div>
    </div>
  </div>

</template>

<style scoped>
.choose{
  width: 100px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  background: #E2E2E2;
  cursor: pointer;
  letter-spacing: 1px;
  border-radius: 15px;
  margin: 5px 8px;
  font-size: 14px;
}

.choose:hover{
  background: #91d5ff;
}

.choose_active{
  background: #91d5ff;
  pointer-events: none;
}

.text{
  font-size: 16px;
  margin-right: 10px;
  color: #737373;
  font-weight: bolder;
}

.tag{
  color: black;
  background: #E2E2E2;
  cursor: pointer;
  border: 1px solid #919191;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  margin: 0 8px;
  border-radius: 12px;
  font-size: 14px;
}

.tag:hover{
  background: #91d5ff;
}

.tag_active{
  background: #91d5ff;
  pointer-events: none;
}
</style>