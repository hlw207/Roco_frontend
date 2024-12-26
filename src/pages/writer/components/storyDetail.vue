<script setup lang="ts">
import router from "@/router";

const props = defineProps<{
  id: bigint,
  name: string,
  new_update: string,
  words: number
}>()

const changeChapter = (id: number, name: string) =>{
  let query = {chapter: name, id: id}
  router.push({path: '/writer/fiction', query: query})
}
</script>

<template>
  <div class="story_detail">
    <div style="display: flex">
      <div class="story_detail_left"></div>
      <div class="story_detail_right">
        <div style="font-size: 16px">{{props.name}}</div>
        <div style="font-size: 14px;color: rgba(0,0,0,0.4);margin-top: 8px">最近更新： {{props.new_update.substring(0,10)}}</div>
        <div style="display: flex;flex: 1;align-items: flex-end;">
          <div style="display: flex;align-items: center;width: 100%">
            <div style="color: rgba(0,0,0,0.4);font-size: 14px">{{props.words}}字</div>
            <div style="display: flex;flex: 1;align-items: center;justify-content: right">
              <div class="basic_button" @click="changeChapter(props.id, props.name)">章节管理</div>
              <div class="basic_button blue_button" style="margin-left: 15px" @click="router.push('/writer/public/' + props.id.toString())">创建章节</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-top: 20px;background: #f5f5f5;border-radius: 10px;padding: 15px 25px;display: flex;align-items: center">
      <el-icon style="margin-right: 10px;font-size: 18px;color: #40a9ff"><HelpFilled /></el-icon>
      <div style="color: #333;font-size: 14px">作品小贴士：未发布章节的作品，作品信息不会进入审核，点击「创建章节」发布章节内容吧，期待你的好作品</div>
    </div>
  </div>
</template>

<style scoped>
.story_detail{
  margin-bottom: 30px;
  border-radius: 10px;
  padding: 25px;
  background: #fafafa;
}

.story_detail_left{
  height: 110px;
  width: 85px;
  background: #f5f5f5;
  border-radius: 5px;
}

.story_detail_right{
  margin-left: 20px;
  display: flex;
  flex: 1;
  flex-direction: column;
}

.basic_button{
  background: rgba(0, 0, 0, 0.04);
  height: 34px;
  padding: 0 15px;
  border-radius: 17px;
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
</style>