<script setup lang="ts">
import {onMounted, reactive, ref, watch} from "vue";
import {Grid} from "@element-plus/icons-vue";
import Login from "@/pages/login/components/login.vue";
import Password from "@/pages/login/components/password.vue";
import router from "@/router";
import {ElMessage} from "element-plus";
import {useRoute} from "vue-router";
import Register from "@/pages/login/components/register.vue";
import RegisterPassword from "@/pages/login/components/RegisterPassword.vue";
import Back from "@/pages/login/components/back.vue";
import {useLoginInfoStore} from "@/pages/login/loginInfo";
import {l} from "vite/dist/node/types.d-aGj9QkWt";

const route = useRoute()

const login = useLoginInfoStore()

// const changeType = (t : number) =>{
//   type.value = t
//   info.account = ''
//   router.push({path: '/login', query: {'type': type.value, 'order' : order.value}})
// }
//
// const changeOrder = () =>{
//   order.value++
//   router.push({path: '/login', query: {'type': type.value, 'order' : order.value}})
// }
//
// const addAccount = (account: string) =>{
//   info.account = account
// }

// const exam = () =>{
//   if(route.query.type == null && route.query.order == null){
//     type.value = order.value = 0
//     return
//   }
//   if(isNaN(route.query.type) || isNaN(route.query.order)){
//     router.push('/login')
//     type.value = order.value = 0
//     return;
//   }
//   type.value = route.query.type
//   order.value = route.query.order
//   if(order.value > 0 && info.account == ''){
//     router.push('/login')
//     type.value = order.value = 0
//     return;
//   }
// }
//
// watch(()=>route.query, ()=>{
//   exam()
// })
//
// onMounted(()=>{
//   exam()
// })
onMounted(()=>{
  login.type = 0
  login.order = 0
})
</script>

<template>
  <div class="myDiv">
    <div>
      <div class="title">
        <el-icon class="pic"><Grid /></el-icon>
        欢迎加入91花瓶PK
      </div>
      <div class="login">
        <Login v-if="login.type==0 && login.order==0"/>
        <Password v-if="login.type==0 && login.order==1"/>
        <Register v-if="login.type==1 && login.order==0"/>
        <RegisterPassword v-if="login.type==1 && login.order==1"/>
      </div>
    </div>
    <Back />
  </div>
</template>

<style scoped>
.myDiv{
  box-sizing: border-box;
  position: fixed;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(to right bottom, #eeeeee, #dbe7f8);
  padding-bottom: 80px;
}


.title{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  color: #737373;
  font-weight: bold;
  margin-left: 10px;
  font-size: 24px;
}

.pic{
  font-size: 30px;
  margin-right: 10px;
  color: #2bd5e0;
}

.login{
  box-sizing: border-box;
  width: 450px;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 添加轻微阴影 */;
  padding: 40px;
  overflow: hidden;
}
</style>