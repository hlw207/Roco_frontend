<script setup lang="ts">
import {ref} from "vue";
import {PICTURE_ADDR} from "@/config";
import {Back} from "@element-plus/icons-vue";
import router from "@/router";
import {ElMessage} from "element-plus";
import {request} from "@/util/request";
import {useUserInfoStore} from "@/stores/user";
import {useLoginInfoStore} from "@/pages/login/loginInfo";

const blank = ref(false)
const wrong = ref(false)

const login = useLoginInfoStore()
const user = useUserInfoStore()
const verificationCode = ref('')
const username = ref('')
const password = ref('')
const passwordCertain = ref('')
const logo = ref('../../../public/logo.png')

const ifVerification = ref(true)
const second = ref(20)
const timer = ref()
const back = () =>{
  login.order = 0
}

const change = () =>{
  if(password.value == ''){
    blank.value = true
    wrong.value = false
  }else if(password.value != passwordCertain.value){
    blank.value = false
    wrong.value = true
    password.value = ''
  }else {
    request({
      url: '/v1/user/register',
      method: 'post',
      data: {
        username: username.value,
        password: password.value,
        phoneNumber: login.account,
        verificationCode: verificationCode.value
      }
    }).then((res)=>{
      console.log(res)
      if(res.data.code == 0) {
        ElMessage.success("注册成功")
        ElMessage.success("请前去登录")
      }else {
        ElMessage.warning(res.data.msg)
      }
    })
  }
}

const getVerification = () =>{
  ifVerification.value = false
  request({
    url: '/v1/user/send',
    method: 'get',
    params: {
      phone: login.account
    }
  }).then((res)=>{
    ElMessage.success('已发送到' + login.account + ',请注意查收')
  })
  timer.value = setInterval(()=>{
    second.value--
    if(second.value == 0) {
      clearInterval(timer.value)
      ifVerification.value = true
      second.value = 20
    }
  },1000)
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
    <div v-if="blank" style="color: red;font-size: 15px;margin-top: 10px;">密码不能为空</div>
    <div v-if="wrong" style="color: red;font-size: 15px;margin-top: 10px;">两次输入密码应一致</div>
    <div class="loginInput" style="display: flex;align-items: center">
      <input class="inputInput" type="password" v-model="verificationCode" placeholder="验证码" style="width: 80%">
      <div style="display: flex;flex: 1;justify-content: right">
        <div style="font-size: 13px;color: #40a9ff;cursor: pointer" @click="getVerification" v-if="ifVerification">获取验证码</div>
        <div style="font-size: 13px;color: #a4a4a4;cursor: pointer" v-if="!ifVerification">{{second}}s后获取</div>

      </div>
    </div>
    <div class="loginInput" style="margin-top: 20px">
      <input class="inputInput" type="password" v-model="username" placeholder="用户名">
    </div>
    <div class="loginInput" style="margin-top: 20px">
      <input class="inputInput" type="password" v-model="password" placeholder="密码">
    </div>
    <div class="loginInput" style="margin-top: 20px">
      <input class="inputInput" type="password" v-model="passwordCertain" placeholder="密码确认">
    </div>
    <div class="loginBottom">
      <div class="loginNext" @click="change">注册</div>
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