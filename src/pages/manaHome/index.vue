<script setup lang="ts">

import router from "@/router";
import {onMounted, reactive, ref} from "vue";
import {useUserInfoStore} from "@/stores/user";
import {ElMessage} from "element-plus";
import GameShow from "@/pages/manaHome/components/gameShow.vue";
import {useManaInfoStore} from "@/pages/mana/manaInfo";
import type {game} from "@/util/interface";
import {request} from "@/util/request";
const addShow = ref(false)
const user = useUserInfoStore()
const game = reactive({
  description: '',
  round: 5,
  ban: [2, 2, 2, 2, 2]
})

const gameList = ref([] as game[])

const bpInfo = useManaInfoStore()
const tmp = () =>{
  if(bpInfo.id != -1)
    bpInfo.clear()
  router.push('/mana')
}

const add = () =>{
  if(user.id == ''){
    ElMessage.warning("请先登录")
    setTimeout(()=>{
      router.push('/login')
    }, 1000)
  }else {
    addShow.value = true
  }
}

const changeRound = (round : number) =>{
  if(round > game.round) {
    for (let i = 0;i < round - game.round;i++)
      game.ban.push(2)
  }else {
    for (let i = 0;i < game.round - round;i++)
      game.ban.pop()
  }
  game.round = round
}

const changeBan = (position : number, grade: number) =>{
  game.ban[position - 1] = grade
}

const getInfo = () =>{
  request({
    url: '/game/bp',
    method: 'GET',
    params:{
      userId: user.id
    }
  }).then((res)=>{
    gameList.value = []
    console.log(res.data)
    for (let i = 0; i < res.data.length; i++){
      let g: game = {}
      g.id = res.data[i].id
      g.round = res.data[i].round
      g.description = res.data[i].description
      g.banNums = res.data[i].banNums
      gameList.value.push(g)
    }
  })
}

const start = () =>{
  request({
    url: '/game/start',
    method: 'POST',
    data:{
      description: game.description,
      round: game.round,
      bans: game.ban,
      userId: user.id
    },
  }).then((res)=>{
    getInfo()
    addShow.value = false
  })
}

onMounted(()=>{
  if(user.id != ''){
    getInfo()
  }
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
      <div class="top_box_main" style="padding: 12px 20px;flex-direction: column">
        <div style="margin-bottom: 5px">
          <el-button type="primary" @click="add">新建对局</el-button>
          <el-button type="info" @click="tmp">临时对局</el-button>
        </div>
        <template v-for="game in gameList">
          <GameShow :description="game.description" :round="game.round" :id="game.id" :ban="game.banNums" @get-info="getInfo"/>
        </template>
      </div>
      <div class="top_box_c2"></div>
      <div class="top_box_c1"></div>
    </div>
  </div>

  <el-dialog
      v-model="addShow"
      title="新建对局"
      width="600"
      align-center
  >
    <div style="display: flex;align-items: center">
      <div>对局描述</div>
      <el-input v-model="game.description" clearable placeholder="例：**杯 **轮 **对战**" style="width: 350px;margin-left: 10px"></el-input>
    </div>
    <div style="margin-top: 15px">对局轮次:</div>
    <div style="display: flex;align-items: center;flex-wrap: wrap;margin-top: 10px">
      <template v-for="i in 6">
        <div class="round" :class="{round_active : 2 * i - 1 == game.round}" @click="changeRound(2 * i - 1)">{{2 * i - 1}}</div>
      </template>
    </div>
    <div style="margin-top: 15px">对局搬位:</div>
    <template v-for="i in game.round">
      <div style="display: flex;align-items: center;margin-top: 10px">
        <div style="margin-right: 10px;width: 70px">Round {{i}}</div>
        <template v-for="j in 7">
          <div class="ban" :class="{ban_active : j - 1 == game.ban[i - 1]}" @click="changeBan(i, j - 1)">{{j - 1}}</div>
        </template>
      </div>
    </template>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="addShow = false">取消</el-button>
        <el-button type="primary" @click="start">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.round{
  box-sizing: border-box;
  background: #E2E2E2;
  color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  padding: 0 15px;
  font-size: 13px;
  margin-right: 12px;
  border-radius: 15px;
  cursor: pointer;
  border: 2px solid #E2E2E2;
}

.round:hover{
  border: 2px solid rgba(0, 0, 0, 0.6);
  color: black;
}

.round_active{
  border: 2px solid rgba(0, 0, 0, 0.6);
  color: black;
  pointer-events: none;
}

.ban{
  box-sizing: border-box;
  background: #f0f0f0;
  color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  padding: 0 10px;
  font-size: 13px;
  margin-right: 12px;
  border-radius: 15px;
  cursor: pointer;
  border: 2px solid #f0f0f0;
}

.ban:hover{
  border: 2px solid rgba(0, 0, 0, 0.4);
  color: rgba(0, 0, 0, 0.8);
}

.ban_active{
  border: 2px solid rgba(0, 0, 0, 0.4);
  color: rgba(0, 0, 0, 0.8);
  pointer-events: none;
}
</style>