<script setup lang="ts">
import type {genie, manaGenie} from "@/util/interface";
import {onMounted, ref, watch} from "vue";
import {request} from "@/util/request";
import GenieCollect from "@/pages/community/components/genieCollect.vue";

const props = defineProps<{
  id: number
  type: string,
  user: string,
  date: Date,
  manaGenieList?: manaGenie[]
  genieList?: genie[],
  comment: string
}>()

const name = ref()
const urlR = ref('../../../public/teamR.png')
const urlB = ref('../../../public/teamB.png')

const getName = () =>{
  request({
    url: '/user/getName',
    method: 'GET',
    params:{
      account: props.user
    }
  }).then((res) =>{
    if(res.data != '')
      name.value = res.data
    else
      name.value = props.user
  })
}

watch(()=>props.user,()=>{
  getName()
})

onMounted(()=>{
  getName()
})
</script>

<template>
  <div style="display: flex">
    <div class="comment">
      <div style="display: flex;align-items: center;margin-bottom: 15px">
        <div style="width: 40px;height: 40px;border-radius: 6px;border: 1px solid rgba(115,115,115,0.5);display: flex;align-items: center;justify-content: center">
          <img :src="type == '魔力值' ? urlR: urlB" style="width: 36px;height: 36px"/>
        </div>
        <div style="margin-left: 15px">
          <div style="height: 20px;display: flex;align-items: center;font-size: 14px">
            {{name}}
          </div>
          <div style="height: 20px;display: flex;align-items: center">
            <div style="font-size: 12px;color: #737373">
              {{new Date(props.date).getMonth() + 1}}月{{new Date(props.date).getDate()}}日分享
            </div>
            <div style="height: 6px;width: 6px;border-radius: 3px;background: #737373;margin: 0 8px"></div>
            <div style="color: #0b103b;font-size: 12px">{{props.type}}</div>
          </div>
        </div>
      </div>
      <div v-if="props.type == '魔力值'" style="display: flex">
        <template v-for="mana in props.manaGenieList">
          <GenieCollect :mana-genie="mana" style="pointer-events: none"/>
        </template>
      </div>
      <div v-if="props.type == '花瓶'" style="display: flex">
        <template v-for="genie in props.genieList">
          <GenieCollect :genie="genie" style="pointer-events: none"/>
        </template>
      </div>
      <div style="font-size: 14px;display: flex;flex-wrap: wrap;max-width: 600px;margin-top: 5px">
        {{props.comment}}
      </div>
    </div>
  </div>
</template>

<style scoped>
.comment{
  padding: 15px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.02);
  background: white;
  margin: 10px 28px;
  border-radius: 5px;
}
</style>