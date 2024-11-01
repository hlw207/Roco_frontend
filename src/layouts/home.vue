<script setup lang="ts">
import {ref} from "vue";
import router from "@/router";
import {useUserInfoStore} from "@/stores/user";

const height = window.innerHeight

const url = ref('../public/home.png')
const logo = ref('../public/teamB.png')
const title = ref('../public/title.png')
const user = useUserInfoStore()

const pages = ref([
  {name: '主页', path: '/'}
  ,{name: '图鉴', path: '/dictionary'}
  ,{name: '规则', path: '/rule'}
  ,{name: '社区', path: '/'}
  ,{name: '选宠', path: '/bp'}
  ,{name: '比赛', path: '/'}
  ,{name: '我的', path: '/home'}
  ,{name: '魔力值', path: '/manaHome'}
])

const login = ()=>{
  if(user.id == '')
    router.push('/login')
  else
    router.push('/home')
}

const router_to = (path: string) =>{
  router.push(path)
}

</script>

<template>
  <div class="back">
    <div class="top">
      <div class="middle_top">
        <div class="middle_pic">
          <img :src="url" style="width: 100%">
        </div>
        <div class="middle_main">
          <div style="height: 190px">
            <div style="height: 20px"></div>
            <img :src="title" style="height: 80px;margin-bottom: 10px">
            <div style="display: flex">
              <div class="jump_box">
                <template v-for="(page, index) in pages">
                  <div class="jump_box_item" @click="router_to(page.path)">{{page.name}}</div>
                  <div style="width: 1px;background: black" v-if="index <= 6"></div>
                </template>
              </div>
              <div style="display: flex;justify-content: right;flex: 1" @click="login">
                <div style="cursor: pointer;padding: 0 15px;height: 48px;background: linear-gradient(to bottom, rgba(48, 48, 48, 1), rgba(69, 67, 80, 1));;border-radius: 10px;margin-right: 20px;display: flex;align-items: center;justify-content: center">
                  <div class="load">
                    <el-icon><User /></el-icon>
                  </div>
                  <div style="color: white;font-size: 13px" v-if="user.id == ''">登录</div>
                  <div style="color: white;font-size: 13px" v-if="user.id != ''">{{user.name != '' ? user.name : '91roco'}}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style="height: 30px;display: flex;align-items: center;background: #e6f7ff">
            <img :src="logo" style="height: 22px;margin-top: 2px;margin-left: 5px">
            <span style="font-size: 12px;font-weight:bold;margin-left: 5px;letter-spacing: 0.8px;">
              欢迎来到91花瓶PK大家族，交流加群772848760
            </span>
          </div>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<style scoped>
.back{
  box-sizing: border-box;
  min-height: v-bind(height + 'px');
  background: #e6f7ff;
  padding-bottom: 35px;
}

.top{
  display: flex;
  justify-content: center;
}

.middle_top{
  position: relative;
  height: 220px;
  width: 80%;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 添加轻微阴影 */
  overflow: hidden;
  border-radius: 0 0 5px 5px;
}

.middle_pic{
  z-index: 1;
  background: rgba(11, 16, 59, 0.1);
  position: absolute;
  width: 100%;
}

.middle_main{
  position: relative;
  z-index: 2;
  height: 100%;
}

.jump_box{
  width: 800px;
  height: 48px;
  display: flex;
  background: linear-gradient(to bottom, rgba(48, 48, 48, 1), rgba(69, 67, 80, 1));
  border-radius: 10px;
}

.jump_box_item{
  color: #d1a741;
  font-size: 13px;
  width: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.jump_box_item:hover{
  color: white;
  background: black;
}

.load{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 13px;
  background: #eeeeee;
  cursor: pointer;
  color: black;
  font-size: 18px;
  margin-right: 10px;
}
</style>