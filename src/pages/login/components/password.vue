<script setup lang="ts">
import {ref} from "vue";
import {Back} from "@element-plus/icons-vue";
import router from "@/router";
import {request} from "@/util/request";
import {ElMessage} from "element-plus";
import {useLoginInfoStore} from "@/pages/login/loginInfo";
import {useUserInfoStore} from "@/stores/user";
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();
const login = useLoginInfoStore()
const user = useUserInfoStore()

const blank = ref(false)
const wrong = ref(false)

const password = ref('')
const logo = ref('../../../public/logo.png')

const back = () =>{
  login.order = 0
}

const change = () =>{
  if(password.value == ''){
    blank.value = true
    wrong.value = false
    return
  }
  request({
    url: '/v1/user/login',
    method: 'POST',
    data: {
      username: login.account,
      password: password.value,
      flag: 0
    }
  }).then((res)=>{
    console.log(res)
    if(res.data.code == 0) {
      ElMessage.success("登录成功")
      user.id = login.account
      user.name = login.account
      user.token = res.data.data.token
      // user.setCookie('satoken', user.token, 7);      // user.name
      cookies.set('satoken', user.token, 100000)
      console.log(user.token)
      router.push('/')
    }
    else {
      ElMessage.warning(res.data.msg)
      blank.value = false
      wrong.value = true
    }
  })
}

const changeType = () =>{
}
</script>

<template>
  <div class="loginMain">
    <div class="loginLogo">
      <el-image :src="logo" class="loginPic"></el-image>
      <div class="loginTitle">
        执笔小说
      </div>
    </div>
    <div class="loginBack">
      <div class="loginIconBox" @click="back">
        <el-icon><Back /></el-icon>
      </div>
      {{login.account}}
    </div>
    <div class="loginLogin">输入密码</div>
    <div v-if="blank" style="color: red;font-size: 15px;margin-top: 10px;">请输入执笔账户的密码</div>
    <div v-if="wrong" style="color: red;font-size: 15px;margin-top: 10px;">执笔账户密码错误</div>
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