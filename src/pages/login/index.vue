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

const route = useRoute()

const info = reactive({
  account : '',
  password: '',
})

const type = ref(0)
const order = ref(0)

const changeType = (t : number) =>{
  type.value = t
  info.account = ''
  router.push({path: '/login', query: {'type': type.value, 'order' : order.value}})
}

const changeOrder = () =>{
  order.value++
  router.push({path: '/login', query: {'type': type.value, 'order' : order.value}})
}

const addAccount = (account: string) =>{
  info.account = account
}

const exam = () =>{
  if(route.query.type == null && route.query.order == null){
    type.value = order.value = 0
    return
  }
  if(isNaN(route.query.type) || isNaN(route.query.order)){
    router.push('/login')
    type.value = order.value = 0
    return;
  }
  type.value = route.query.type
  order.value = route.query.order
  if(order.value > 0 && info.account == ''){
    router.push('/login')
    type.value = order.value = 0
    return;
  }
}

watch(()=>route.query, ()=>{
  exam()
})

onMounted(()=>{
  exam()
})
</script>

<template>
  <div class="myDiv">
    <div>
      <div class="title">
        <el-icon class="pic"><Grid /></el-icon>
        欢迎使用Prism
      </div>
      <div class="login">
        <Login @change-order="changeOrder" @change-type="changeType" @add-account="addAccount" v-if="type==0&&order==0" :account="info.account"/>
        <Password @change-type="changeType" v-if="type==0&&order==1" :account="info.account"/>
        <Register @change-order="changeOrder" @change-type="changeType" @add-account="addAccount" v-if="type==1&&order==0" :account="info.account"/>
        <RegisterPassword @change-type="changeType" v-if="type==1&&order==1" :account="info.account"/>
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