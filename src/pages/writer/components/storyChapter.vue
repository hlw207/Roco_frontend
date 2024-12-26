<script setup lang="ts">

import {onMounted, ref, watch} from "vue";
import router from "@/router";
import {useRoute} from "vue-router";
import {request} from "@/util/request";
import {ElMessage} from "element-plus";
import type {chapter} from "@/util/interface";

const route = useRoute()
const current_page = ref(1)
const chapterList = ref([] as chapter[])
const totalPage = ref(0)

watch(()=>route.params['id'],()=>{
  if(route.query['id'] != null)
    getChapter()
})

const getChapter = () => {
  request({
    url: '/v1/chapter/myNovelChapter',
    method: 'get',
    params:{
      novelId: route.query['id']
    }
  }).then((res)=>{
    if(res.data.code == 0){
      console.log(res.data)
      chapterList.value = res.data.data
      // TODO: 之后修改
      totalPage.value = chapterList.value.length
    }else {
      ElMessage.warning(res.data.msg)
    }
  })
}

const chapterStatus = (status: string) => {
  switch (status){
    case 'TO_BE_PUBLISHED':
      return '未发布'
    case 'UNDER_REVIEW':
      return '审核中'
    case 'PUBLISHED':
      return '已发布'
    case 'REJECTED':
      return '审核不通过'
  }
  return 'lgh'
}

onMounted(()=>{
  if(route.query['id'])
    getChapter()
})
</script>

<template>
  <div style="width: 100%">
    <div style="display: flex;align-items: center">
      <div>章节管理</div>
      <div style="display: flex;flex: 1;justify-content: right">
        <div class="basic_button blue_button" @click="router.push('/writer/public/' + route.query['id'])">创建章节</div>
      </div>
    </div>
    <div style="height: 1px;margin: 20px 0;width: 100%;background: rgba(0,0,0,0.04)"></div>
    <div style="font-size: 14px;color: #a4a4a4">共{{totalPage}}篇</div>
    <div style="margin-top: 15px">
      <div style="background: #fcfcfc;height: 45px;display: flex;align-items: center;padding: 0 20px;font-size: 14px;color: #a4a4a4">
        <div style="width: 600px">名称</div>
        <div>状态</div>
        <div style="display: flex;flex: 1;justify-content: right">操作</div>
      </div>
      <template v-for="chapter in chapterList">
        <div class="item">
          <div style="width: 600px">{{chapter.chapterTitle}}</div>
          <div>{{chapterStatus(chapter.chapterStatus)}}</div>
          <div style="display: flex;flex: 1;justify-content: right">
            <el-icon class="item_icon" style="margin-right: 10px"  @click="router.push('/writer/public/' + route.query['id'])"><Edit /></el-icon>
            <el-icon class="item_icon"><Delete /></el-icon>
          </div>
        </div>
      </template>
    </div>
<!--    <div style="display: flex;margin-top: 30px">-->
<!--      <el-pagination-->
<!--          v-model:current-page="current_page"-->
<!--          :page-size="10"-->
<!--          background-->
<!--          layout="prev, pager, next, jumper"-->
<!--          :total="totalPage"-->
<!--      />-->
<!--    </div>-->
  </div>
</template>

<style scoped>
.basic_button{
  background: rgba(0, 0, 0, 0.04);
  height: 30px;
  padding: 0 15px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
}

.basic_button:hover{
  background: rgba(0, 0, 0, 0.08);
}

.blue_button{
  background: linear-gradient(to right, #40a9ff, #1890ff);
  color: white;
}

.blue_button:hover{
  background: linear-gradient(to right, #69c0ff, #40a9ff);
}

.item{
  display: flex;
  align-items: center;
  font-size: 14px;
  height: 45px;
  padding: 0 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.item_icon{
  font-size: 18px;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.8);
}

.item_icon:hover{
  color: #69c0ff;
}
</style>