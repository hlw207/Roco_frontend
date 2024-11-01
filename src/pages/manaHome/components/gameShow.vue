<script setup lang="ts">
import {ref} from "vue";
import {request} from "@/util/request";
import {useManaInfoStore} from "@/pages/mana/manaInfo";
import router from "@/router";
import type {genieChoose, manaGenie} from "@/util/interface";
const props = defineProps<{
  id: number
  description: string
  ban: number[]
  round: number
}>()

const emits = defineEmits(['getInfo'])

const url = ref('../../../../public/urlLogo3.png')
const show = ref(false)
const bpInfo = useManaInfoStore()

const deleteGame = () =>{
  request({
    url: '/game/delete',
    method: 'POST',
    params:{
      id: props.id
    }
  }).then((res)=>{
    emits('getInfo')
    show.value = false
  })
}

const getBans = () =>{
  request({
    url: '/game/getBans',
    method: 'GET',
    params:{
      id: props.id
    }
  }).then((res)=>{
    for (let i = 0;i < res.data.length;i++){
      let ban : genieChoose = {attribute: "", genieName: ""}
      ban.attribute = res.data[i].attribute
      ban.genieName = res.data[i].genieName
      bpInfo.ban.push(ban)
    }
    console.log(bpInfo.ban)
  })
}

const getChoice = () =>{
  request({
    url: '/game/getChoice',
    method: 'GET',
    params:{
      id: props.id
    }
  }).then((res)=>{
    console.log(res.data)
    for (let i = 0;i < res.data.length;i++){
      let choice : manaGenie = {attribute: "", extra: "", genieName: "", grade: 0, viceAttribute: ""}
      let round: number = res.data[i].round
      while (bpInfo.playerChoice[round - 1] == null){
        bpInfo.addElem()
      }
      let position : number = res.data[i].position
      choice.attribute = res.data[i].attribute
      choice.genieName = res.data[i].genieName
      choice.extra = res.data[i].extra
      choice.grade = res.data[i].grade
      choice.viceAttribute = res.data[i].viceAttribute
      for (let j = 0;j < bpInfo.playerChoice[round - 1][position].length;j++){
        if(bpInfo.playerChoice[round - 1][position][j].genieName == ''){
          bpInfo.playerChoice[round - 1][position][j] = choice
          break
        }
      }
    }
    console.log(bpInfo.playerChoice)
  })
}

const click = async (event: MouseEvent) =>{
  // if(bpInfo.id == props.id){
  //   router.push('/mana')
  //   return
  // }
  if(event.target.className == 'el-button el-button--danger' || event.target.className == 'delete')
    return
  bpInfo.clear()
  bpInfo.id = props.id
  bpInfo.ban_nums = props.ban
  bpInfo.maxRound = props.round
  await getBans()
  await getChoice()
  await router.push('/mana')
}
</script>

<template>
  <div class="gameShow" @click="click">
    <div style="margin: 5px">
      <img :src="url" style="height: 40px">
    </div>
    <div style="margin: 6px 12px;display: flex;align-items: center">
      <div style="font-size: 16px;color: #4C6080;font-weight: bolder">对局轮次：</div>
      <div style="font-size: 16px;color: #4C6080;">Bo{{props.round}}</div>
    </div>
    <div style="margin: 10px 12px 5px;display: flex;align-items: center">
      <div style="font-size: 16px;color: #4C6080;font-weight: bolder">对局描述：</div>
      <div style="font-size: 16px;color: #4C6080;;letter-spacing: 1px">{{props.description}}</div>
    </div>
    <div style="margin: 10px 12px;display: flex;align-items: center">
      <div style="font-size: 16px;color: #4C6080;font-weight: bolder">对局搬位：</div>
      <template v-for="b in props.ban">
        <div class="ban">{{b}}</div>
      </template>
    </div>
    <div style="margin: 20px 20px 10px 10px;display: flex;align-items: center;justify-content: right" class="delete">
      <el-button type="danger" @click="show=true"><div class="delete">删除</div></el-button>
    </div>
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
        <el-button type="primary" @click="deleteGame">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.gameShow{
  background: rgba(251, 248, 255, 0.6);
  margin:  15px 0;
  width: 550px;
  box-shadow: 0 2px 2px #e4eaff;
  border-radius: 20px;
  border: 1px solid #e4eaff;
  cursor: pointer;
}

.gameShow:hover{
  background: white;
  transition: all 0.5s;
  transform: scale(1.02);
}

.ban{
  box-sizing: border-box;
  background: #E2E2E2;
  color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  padding: 0 11px;
  font-size: 13px;
  margin-right: 12px;
  border-radius: 15px;
  border: 1px solid rgba(0, 0, 0, 0.6);
}

.delete{
}
</style>