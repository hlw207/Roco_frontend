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

const cancel = () =>{
  resize.value = false
  name.value = ''
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


<template>

</template>

<style scoped>

</style>