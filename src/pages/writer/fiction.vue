<script setup lang="ts">

import {onMounted, ref, watch} from "vue";
import router from "@/router";
import {useRoute} from "vue-router";
import StoryDetail from "@/pages/writer/components/storyDetail.vue";
import StoryInfo from "@/pages/writer/components/storyInfo.vue";
import StoryChapter from "@/pages/writer/components/storyChapter.vue";
import {useUserInfoStore} from "@/stores/user";
import {request} from "@/util/request";
import type {fiction} from "@/util/interface";
const route = useRoute()

const user = useUserInfoStore()
const fictionList = ref([] as fiction[])

const changeType = (type: string) =>{
  let query = { ...route.query }
  query['type'] = type
  router.push({path: '/writer/fiction', query: query})
}

const changeCreate = () =>{
  let query = {create: ''}
  router.push({path: '/writer/fiction', query: query})
}

watch(()=>route.query,()=>{
  if(Object.keys(route.query).length == 0)
    router.push({path: '/writer/fiction', query: {type: 'mine'}})
})

const getFiction = (type: number) =>{
  if(type == 0) {
    request({
      url: '/v1/novel/getMyNovels',
      method: 'get'
    }).then((res)=>{
      console.log(res.data)
      fictionList.value = res.data.data.novels
      console.log(fictionList.value)
    })
  }
}

onMounted(()=>{
  // const cookies = document.cookie.split(';');
  // for (let cookie of cookies) {
  //   const eqPos = cookie.indexOf(';');
  //   const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
  //   document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
  // }
  console.log(document.cookie)
  // user.id = user.name = user.token = '' //调试用
  if(Object.keys(route.query).length == 0)
    router.push({path: '/writer/fiction', query: {type: 'mine'}})
  getFiction(0)
})
</script>

<route lang="yaml">
  meta:
    layout: writer
</route>

<template>
  <div class="story_main" v-if="route.query['type'] != null">
    <div class="story_top">
      <div class="story_title" :class="{story_title_active: route.query['type'] == 'mine'}" @click="changeType('mine')">我的小说</div>
      <div style="margin: 2px 12px 0;height: 18px;width: 1.5px;background: rgba(0,0,0,0.1)"></div>
      <div class="story_title" :class="{story_title_active: route.query['type'] == 'together'}" @click="changeType('together')">我共创的小说</div>
      <div style="display: flex;align-items: center;justify-content: right;flex: 1">
        <div class="story_new" v-if="route.query['type'] == 'mine'" @click="changeCreate">
          创建新书
          <el-icon class="story_icon"><CirclePlus /></el-icon>
        </div>
        <div class="story_new" v-if="route.query['type'] == 'together'">
          添加共创
          <el-icon class="story_icon"><CirclePlus /></el-icon>
        </div>
      </div>
    </div>
    <div class="story_core">
      <template v-for="fiction in fictionList">
        <StoryDetail :id="fiction.id" :new_update="fiction.updateTime" :name="fiction.title" :words="parseInt(fiction.wordCount)" />
      </template>
    </div>
  </div>

  <div class="story_main" v-if="route.query['create'] != null">
    <div class="story_top">
      <div class="story_title story_title_active" style="display: flex;align-items: center" @click="router.back()">
        <el-icon style="margin-right: 5px;margin-top: 1px"><Back /></el-icon>
        创建新书
      </div>
    </div>
    <div class="story_core" style="display: flex">
      <StoryInfo @get-book="getFiction"/>
    </div>
  </div>

  <div class="story_main" v-if="route.query['chapter'] != null">
    <div class="story_top">
      <div class="story_title story_title_active" style="display: flex;align-items: center" @click="router.back()">
        <el-icon style="margin-right: 5px;margin-top: 1px"><Back /></el-icon>
        {{route.query['chapter']}}
      </div>
    </div>
    <div class="story_core" style="display: flex">
      <StoryChapter />
    </div>
  </div>
</template>

<style scoped>
.story_main{
  background: white;
  padding: 30px;
  border-radius: 10px;
}

.story_top{
  display: flex;
  align-items: center;
}

.story_title{
  font-size: 19px;
  color: grey;
  cursor: pointer;
}

.story_title:hover{
  color: black;
}

.story_title_active{
  color: black;
}

.story_new{
  color: #a4a4a4;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
}

.story_new:hover{
  color: #40a9ff;
}

.story_icon{
  margin-left: 2px;
  margin-top: 1px;
  font-size: 13px;
}

.story_core{
  margin-top: 30px;
}

</style>