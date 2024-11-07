<script setup lang="ts">
import {computed, onMounted, ref, watch} from "vue";
import type {genie, manaGenie} from "@/util/interface";
import GenieChoice from "@/pages/community/components/genieChoice.vue";
import GenieShow from "@/pages/community/components/genieShow.vue";
import {request} from "@/util/request";
import {useUserInfoStore} from "@/stores/user";
import {ElMessage} from "element-plus";

const props = defineProps<{
  show: boolean
}>()

const emits = defineEmits(['update'])

const user = useUserInfoStore()
const show = ref(props.show)
const choiceList = ref({
  "类型": ['魔力值', '花瓶'],
  "方向": ['阵容推荐', '宠物推荐'],
})

const infoShow = ref(false)

const choice = ref(['魔力值', '阵容推荐'])
const type = computed(()=>{
  if(choice.value[0] == '魔力值')
    return 1
  else
    return 0
})

const manaChoices = ref([] as manaGenie[])
const Choices = ref([] as genie[])
const manaG = ref({attribute: "", extra: "", genieName: "", grade: 0, viceAttribute: ""} as manaGenie)
const G = ref({attribute: "", genieName: "", grade: 0, viceAttribute: ""} as genie)

const info = ref('')

watch(()=>props.show, ()=>{
  show.value = true
})

const chooseGenie = (manaGenie: manaGenie, genie: genie) =>{
  if(choice.value[0] == '魔力值'){
    if(choice.value[1] == '阵容推荐'){
      for (let i = 0;i < 6;i++){
        if(manaChoices.value[i].genieName == '') {
          manaChoices.value[i] = manaGenie
          break
        }
      }
    }else {
      manaG.value = manaGenie
    }
  }else {
    if(choice.value[1] == '阵容推荐'){
      for (let i = 0;i < 6;i++){
        console.log(Choices.value[i].genieName)
        if(Choices.value[i].genieName == '') {
          Choices.value[i] = genie
          break
        }
      }
    }else {
      G.value = genie
    }
  }
}

const submit = () =>{
  if(choice.value[1] == '阵容推荐'){
    request({
      url: '/recommend/add',
      method: 'POST',
      data:{
        userId: user.id,
        type: choice.value[0],
        genieList: choice.value[0] == '魔力值' ? null: Choices.value,
        manaGenieList: choice.value[0] != '魔力值' ? null : manaChoices.value,
        comment: info.value
      }
    }).then((res)=>{
      ElMessage.success("添加成功")
      show.value = false
      manaChoices.value = []
      Choices.value = []
      for (let i = 0;i < 6;i++){
        let tmpM: manaGenie = {attribute: "", extra: "", genieName: "", grade: 0, viceAttribute: ""}
        let tmp: genie = {attribute: "", genieName: "", grade: 0, viceAttribute: ""}
        manaChoices.value.push(tmpM)
        Choices.value.push(tmp)
      }
      emits('update')
    })
  }
}

const cancel = (index: number) =>{
  if(choice.value[0] == '魔力值'){
    manaChoices.value[index] = {attribute: "", extra: "", genieName: "", grade: 0, viceAttribute: ""}
  }else {
    Choices.value[index] = {attribute: "", genieName: "", grade: 0, viceAttribute: ""}
  }
}

onMounted(()=>{
  for (let i = 0;i < 6;i++){
    let tmpM: manaGenie = {attribute: "", extra: "", genieName: "", grade: 0, viceAttribute: ""}
    let tmp: genie = {attribute: "", genieName: "", grade: 0, viceAttribute: ""}
    manaChoices.value.push(tmpM)
    Choices.value.push(tmp)
  }
})
</script>

<template>
  <el-dialog
      v-model="show"
      title="攻略推荐"
      width="700"
      align-center
  >
    <div style="margin-top: -20px;margin-left: -28px">
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
      <div v-if="choice[1] == '阵容推荐'" style="margin-left: 30px;margin-top: 10px">
          <div class="text" style="margin-bottom: 10px">宠物选择:</div>
          <div style="display: flex;align-items: center" v-if="choice[0] == '魔力值'">
            <template v-for="(manaGenie, index) in manaChoices">
              <div class="choice" @click="infoShow = !infoShow" v-if="manaGenie.genieName == ''">
                <el-icon style="font-size: 50px"><Plus /></el-icon>
              </div>
              <div style="position: relative"  v-if="manaGenie.genieName != ''">
                <GenieShow :mana-genie="manaGenie"/>
                <div class="cancel" @click="cancel(index)">
                  <el-icon style="font-size: 12px;color: rgba(0,0,0,0.3)"><Close /></el-icon>
                </div>
              </div>
            </template>
          </div>
          <div style="display: flex;align-items: center" v-if="choice[0] == '花瓶'">
            <template v-for="(genie, index) in Choices">
              <div class="choice" @click="infoShow = !infoShow" v-if="genie.genieName == ''">
                <el-icon style="font-size: 50px"><Plus /></el-icon>
              </div>
              <div style="position: relative"  v-if="genie.genieName != ''">
                <GenieShow :genie="genie" v-if="genie.genieName != ''"/>
                <div class="cancel" @click="cancel(index)">
                  <el-icon style="font-size: 12px;color: rgba(0,0,0,0.3)"><Close /></el-icon>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>

      <div style="display: flex;align-items: center;margin-top: 10px">
        <div class="text">攻略说明:</div>
      </div>
      <div style="display: flex;align-items: center;margin-top: 10px">
        <el-input
            v-model="info"
            style="width: 600px"
            :autosize="{ minRows: 3, maxRows: 8 }"
            type="textarea"
            placeholder="给出你的见解"
        />
      </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="show = false">取消</el-button>
        <el-button type="primary" @click="submit">
          确定
        </el-button>
      </div>
    </template>

  </el-dialog>
  <GenieChoice :show="infoShow" :type="type" @certain="chooseGenie"/>
</template>

<style scoped>
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

.choice{
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid rgba(128, 128, 128, 0.5);
  width: 94px;
  height: 94px;
  margin-right: 15px;
  cursor: pointer;
  color: rgba(128, 128, 128, 0.5);
}

.choice:hover{
  border: 3px solid grey;
  color: grey;
}

.cancel{
  position: absolute;
  z-index: 10;
  top: 5px;
  right: 15px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  width: 16px;
  height: 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  cursor: pointer;
}

.cancel:hover{
  background: rgba(115, 115, 115, 0.2);
}
</style>