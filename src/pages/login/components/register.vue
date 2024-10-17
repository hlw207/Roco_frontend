<script setup lang="ts">
import {computed, ref} from "vue";
import {PICTURE_ADDR} from "@/config";
const props = defineProps<{
  account: string
}>()

const logo = ref(PICTURE_ADDR + '/logo.png')
const emits = defineEmits(['changeOrder', 'changeType','addAccount'])
const account = ref(props.account)
const click = ref(false)

const ifNext = computed(()=>{
  // 正则表达式匹配手机号
  const phonePattern = /^1[0-9]{10}$/;
  // 正则表达式匹配邮箱号
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // 正则表达式匹配以"prism"开头的账号
  const prismAccountPattern = /^Prism.*/;

  if(phonePattern.test(account.value) || emailPattern.test(account.value) || prismAccountPattern.test(account.value)) {
    click.value = false
    return true
  }

  return false
})

const change = () =>{
  click.value = true
  if(ifNext.value) {
    emits('addAccount', account.value)
    emits('changeOrder')
  }
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
    <div class="loginLogin">注册账号</div>
    <div style="height: 20px">
    </div>
    <div style="color: red;font-size: 15px;margin-bottom: 10px" v-if="!ifNext && click">请输入有效的Prism账号或手机号或电子邮箱</div>
    <div class="loginInput">
      <input v-model="account" class="inputInput" placeholder="Prism账号、手机号或 电子邮箱">
    </div>
    <div class="loginRegister">
      Prism账号以Prism开头，例：Prism1024
    </div>
    <div class="loginBottom">
      <div class="loginNext" @click="change">下一步</div>
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
  margin-top: 18px;
  color: black;
  font-weight: bold;
}

.inputInput{
  border: none;
  box-shadow:none;
  outline: none;
  width: 80%;
  font-size: 17px;
}

.inputInput::placeholder{
  color: #737373;
  font-size: 16px;
}

.loginInput{
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
  color: rgba(0, 0, 0, 0.75);
}

.loginBottom{
  margin-top: 40px;
  margin-bottom: 15px;
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
</style>