<script setup lang="ts">
import {ref} from "vue";
import {PICTURE_ADDR} from "@/config";
import {Back} from "@element-plus/icons-vue";
import router from "@/router";
import {useUserStore} from "@/stores/user";
import {request} from "@/util/request";
import {ElMessage} from "element-plus";

const props = defineProps<{
  account : string
}>()

const blank = ref(false)
const wrong = ref(false)

const password = ref('')
const logo = ref(PICTURE_ADDR + '/logo.png')
const emits = defineEmits(['changeType'])

const back = () =>{
  router.push('/login')
}

const change = () =>{
  // if(password.value == ''){
  //   blank.value = true
  //   wrong.value = false
  // }else {
  //   if(props.account == 'Prism123' && password.value == '123'){
  //     localStorage.setItem('userId', '1')
  //     user.id = 1
  //     router.push('/manager')
  //     return;
  //   }else {
  //     localStorage.setItem('userId', '0')
  //     user.id = 0
  //     router.push('/')
  //     return
  //   }
  request({
    url: '/security/login',
    method: 'POST',
    data: {
      name: props.account,
      password: password.value
    }
  }).then((res)=>{
    console.log(res)
    localStorage.setItem('userId', res.data)
    // 解析JWT令牌
    // 从LocalStorage中获取JWT令牌
    // const token = localStorage.getItem('token');
    ElMessage.success("登录成功")
    if(localStorage.getItem('userId') == 70535){
      router.push('/manager')
    }else
      router.push('/')
    // user.id = 0
  }).catch((err)=>{
    ElMessage.warning('账号或密码错误')
  })
}

const changeType = () =>{
  emits('changeType', 2)
}
</script>

<template>
  <div class="loginMain">
    <div class="loginLogo">
      <el-image :src="logo" class="loginPic"></el-image>
      <div class="loginTitle">
        Prism Search
      </div>
    </div>
    <div class="loginBack">
      <div class="loginIconBox" @click="back">
        <el-icon><Back /></el-icon>
      </div>
      {{props.account}}
    </div>
    <div class="loginLogin">输入密码</div>
    <div v-if="blank" style="color: red;font-size: 15px;margin-top: 10px;">请输入Prism账户的密码</div>
    <div v-if="wrong" style="color: red;font-size: 15px;margin-top: 10px;">Prism账户密码错误</div>
    <div class="loginInput">
      <input class="inputInput" type="password" v-model="password" placeholder="密码">
    </div>
    <div class="loginRegister">
      <div style="color: rgb(0, 103, 184);cursor: pointer" @click="changeType">忘记了密码?</div>
    </div>
    <div class="loginBottom">
      <div class="loginNext" @click="change">登录</div>
    </div>
  </div>
</template>

<style scoped>
@keyframes In
{
  0% {
    margin-left: 450px;
  }
  100% {
    margin-left: 0;
  }
}

.loginMain{
  height: 100%;
  width: 100%;
  animation: In 0.5s;
}

.loginLogo{
  display: flex;
  align-items: center;
}

.loginTitle{
  margin-left: 10px;
  color: #737373;
  font-weight: bolder;
  font-size: 18px;
}

.loginPic{
  height: 32px;
  width: 32px;
}

.loginLogin{
  font-size: 24px;
  margin-top: 14px;
  color: black;
  font-weight: bold;
}

.inputInput{
  border: none;
  box-shadow:none;
  outline: none;
  width: 100%;
  font-size: 17px;
}

.inputInput::placeholder{
  color: #737373;
  font-size: 16px;
}

.loginInput{
  margin-top: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid black;
}

.loginInput:focus-within{
  border-bottom: 1px solid rgb(0, 103, 184);
}

.loginRegister{
  display: flex;
  margin-top: 10px;
  font-size: 13px;
}

.loginBottom{
  margin-top: 40px;
  margin-bottom: 14px;
  display: flex;
  justify-content: right;
}

.loginNext{
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1968b6;
  color: white;
  padding: 6px 30px;
  cursor: pointer;
}

.loginBack{
  display: flex;
  align-items: center;
  margin-top: 10px;
  font-size: 14px;
}

.loginIconBox{
  margin-left: -1px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-size: 14px;
  cursor: pointer;
}

.loginIconBox:hover{
  background: #dddddd;
}
</style>