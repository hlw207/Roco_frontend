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
const password = ref('')
const passwordCertain = ref('')
const logo = ref('../../../public/teamB.png')

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
      url: '/user/register',
      method: 'GET',
      params: {
        account: login.account,
        password: password.value,
      }
    }).then((res)=>{
      console.log(res)
      if(res.data) {
        ElMessage.success("注册成功")
        user.id = login.account
        request({
          url: '/user/getName',
          method: 'GET',
          params:{
            account: login.account
          }
        }).then((res)=>{
          user.name = res.data
        })
        router.push('/')
      }else {
        ElMessage.warning("注册失败")
      }
    })
  }
}

</script>

<template>
  <div class="loginMain">
    <div class="loginLogo">
      <el-image :src="logo" class="loginPic"></el-image>
      <div class="loginTitle">
        91 Roco
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
    <div class="loginInput">
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