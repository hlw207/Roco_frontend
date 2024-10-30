<script setup lang="ts">

import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {useUserInfoStore} from "@/stores/user";
import router from "@/router";
import {request} from "@/util/request";
import {ElMessage} from "element-plus";

const route = useRoute()
const pages = ref([
  {name: '个人信息', path: '/home'}
  ,{name: '我的宠物', path: '/home/genie'}
])
const user = useUserInfoStore()

const url = ref('../../public/ancher.png')
const resize = ref(false)
const name = ref(user.name)

const exit = () => {
  user.id = ''
  user.name = ''
  router.push('/')
}

const change = () =>{
  resize.value = true
}

const submit = () =>{
  request({
    url: '/user/change',
    method: 'post',
    params:{
      name: name.value,
      account: user.id
    }
  }).then((res)=>{
    ElMessage.success("修改信息成功")
    resize.value = false
    user.name = name.value
  })
}

onMounted(()=>{
  if(user.id == '')
    router.push('/login')
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
        <div style="width: 100%;display: flex;padding: 10px 20px">
          <template v-for="page in pages">
            <div class="choose" :class="{choose_active: page.path == route.path}">
              {{page.name}}
            </div>
          </template>
        </div>
        <div style="display: flex;align-items: center;margin-left: 30px;margin-top: 10px">
          <div style="width: 70px;height: 70px;border-radius: 30px;display: flex;align-items: center;justify-content: center">
            <img :src="url" style="width: 70px; height: 70px;" />
          </div>
          <div style="font-size: 20px;font-weight: bolder;margin-left: 20px" v-if="!resize">
            {{user.name}}
          </div>
          <el-input v-if="resize" v-model="name" style="font-size: 16px;width: 150px;margin-left: 20px">
          </el-input>
          <div style="width: 80px;height: 24px;border-radius: 3px;display: flex;align-items: center;justify-content: center;font-size: 13px;border: 1px solid rgba(0,0,0,0.2);cursor: pointer;margin-left: 20px" v-if="!resize" @click="change">修改资料</div>
          <div style="width: 80px;height: 24px;border-radius: 3px;display: flex;align-items: center;justify-content: center;font-size: 13px;border: 1px solid rgba(0,0,0,0.2);cursor: pointer;margin-left: 20px" v-if="resize" @click="submit">确定修改</div>
          <div style="width: 80px;height: 24px;border-radius: 3px;display: flex;align-items: center;justify-content: center;font-size: 13px;border: 1px solid rgba(255,88,89,0.2);margin-left: 10px;cursor: pointer;color: #ff5859" @click="exit">退出登录</div>
        </div>
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
  background: rgba(115, 115, 115, 0.2);
}

.choose_active{
  background: #91d5ff;
  pointer-events: none;
}
</style>