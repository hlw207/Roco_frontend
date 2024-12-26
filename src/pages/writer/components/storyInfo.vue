<script setup lang="ts">

import {reactive, ref, watch} from "vue";
import router from "@/router";
import {ElMessage} from "element-plus";
import {request} from "@/util/request";

const emits = defineEmits(['getBook'])

const info = reactive({
  name: '',
  tag: '',
  describe: ''
})

const novelCategories = [
    "历史",
    "玄幻",
    "都市",
    "恋爱",
    "神秘",
    "轻小说"
];

watch(()=>info.name, ()=>{
  if(info.name.length > 15)
    info.name = info.name.substring(0, 15)
})

const add = () => {
  if(info.name == ''||info.tag == '' || info.describe.length < 50){
    ElMessage.warning('请输入正确信息')
  }else {
    request({
      url: '/v1/novel/postNovel',
      method: 'post',
      data:{
        title: info.name,
        isShort: false,
        category: info.tag,
        introduction: info.describe
      }
    }).then((res)=>{
      console.log(res)
      if(res.data.code == 0){
        ElMessage.success("创建成功")
        emits('getBook', 0)
        router.back()
      }else {
        ElMessage.warning(res.data.msg)
      }
    })
  }
}
</script>

<template>
  <div style="display: flex;margin-top: 20px;width: 100%">
    <div style="display: flex;flex-direction: column;align-items: center">
      <div style="border-radius: 10px;height: 160px;width: 125px;background: rgba(0,0,0,0.04)"></div>
      <div style="margin-top: 15px" class="basic_button">选择封面</div>
    </div>
    <div style="margin-left: 30px;display: flex;flex: 1;flex-direction: column">
      <div style="display: flex;align-items: center">
        <div class="info_text">书本名称</div>
        <div class="info_outer">
          <input class="info_input" v-model="info.name" placeholder="请输入作品名称">
          <div class="info_extra">
            {{info.name.length}}/15
          </div>
        </div>
      </div>

      <div style="display: flex;margin-top: 15px">
        <div class="info_text" style="margin-top: 5px">作品标签</div>
        <div style="display: flex;flex-wrap: wrap;width: 100%">
          <el-radio-group v-model="info.tag">
            <template v-for="category in novelCategories">
              <el-radio :label="category" :value="category" />
            </template>
          </el-radio-group>
        </div>
      </div>

      <div style="display: flex;margin-top: 15px">
        <div class="info_text">作者简介</div>
        <div class="info_outer" style="height: 120px">
          <textarea class="info_input" v-model="info.describe" style="height: 100px;width: 100%;margin: 10px" placeholder="请输入50-500字以内的作品简介，不可出现低俗、暴力、血腥等不符合法律法规的内容"/>
          <div class="info_extra" style="right: 25px;bottom: 5px">
            {{info.describe.length}}/500
          </div>
        </div>

      </div>

      <div style="display: flex;align-items: center;justify-content: right;width: 100%;margin-top: 30px">
        <div class="basic_button" style="margin-right: 20px;width: 50px;justify-content: center" @click="router.back()">取消</div>
        <div class="basic_button blue_button" @click="add">立即创建</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.basic_button{
  background: rgba(0, 0, 0, 0.04);
  height: 34px;
  width: fit-content;
  padding: 0 17px;
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

.info_text{
  width: 100px;
  font-size: 15px;
}

.info_input{
  margin-left: 10px;
  border: none;
  box-shadow:none;
  outline: none;
  height: 35px;
  width: 80%;
  background: rgba(255, 255, 255, 0);
  font-size: 14px;
  font-family: Arial, sans-serif;
}

.info_outer{
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.04);
  width: 100%;
  height: 40px;

}

.info_outer:focus-within{
  background: white;
  border: 1px solid #69c0ff;
}

.info_extra{
  font-size: 13px;
  color: #a4a4a4;
  position: absolute;
  right: 10px;
  bottom: 10px;
}
</style>