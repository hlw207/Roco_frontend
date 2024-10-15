<script setup lang="ts">
import {ref} from "vue";
import router from "@/router";

const height = window.innerHeight

const group = ref('../public/group.png')
const page = ref('../public/page.png')

const update = ref([
  {info: '主页更新', date: '10-14'},
  {info: 'bp构建', date: '09-23'},
])

const anchers = ref([
  {pic: '../public/ancher1.jpg', name: '元让家的里奥', url: 'https://space.bilibili.com/365973682'},
  {pic: '../public/ancher2.jpg', name: '洛克王国理想', url: 'https://space.bilibili.com/178826226'},
  {pic: '../public/ancher3.jpg', name: '洛克王国陈宥乐', url: 'https://space.bilibili.com/103824767'},
  {pic: '../public/ancher4.jpg', name: '江玄（洛克王国）', url: 'https://www.douyin.com/user/MS4wLjABAAAA7eI_AapbbqFN0W1iwsN-2kl1-oMjP40sTiHsNHGvAyc?from_tab_name=main'},
  {pic: '../public/teamB.png', name: '91花瓶专用号', url: 'https://www.douyin.com/user/MS4wLjABAAAACH2Z7huWPLbJGRrejW6abBBrtg3mggc_h4Gv1F_boNtwbtUpNF0OKPmkIUoBJr3L?from_tab_name=main'},

])

const routerOut = (path: string) =>{
  window.open(path, '_blank');}

</script>

<route lang="yaml">
  meta:
    layout: home
</route>

<template>
  <div class="top">
    <div class="top_box">
      <div class="top_box_c1"></div>
      <div class="top_box_c2"></div>
      <div class="top_box_main">
        <div style="width: 24%;display: flex;flex-direction: column;align-items: center">
          <div style="width: 80%;background: white;margin-top: 30px;border-radius: 15px;display: flex;flex-direction: column;align-items: center;padding-bottom: 10px">
            <Title name="最近更新"/>
            <el-scrollbar style="margin-top: 2px;max-height: 132px;width: 100%;">
              <div style="display: flex;flex-direction: column;align-items: center;">
                <template v-for="(up, index) in update">
                  <div style="display: flex;width: 85%;align-items: center;margin: 8px;">
                    <UpdateTag :choose="index"></UpdateTag>
                    <div style="font-size: 12px;margin-left: 10px">{{up.info}}</div>
                    <div style="display: flex;justify-content: right;flex: 1;font-size: 12px;color: grey;">
                      {{up.date}}
                    </div>
                  </div>
                </template>
              </div>
            </el-scrollbar>
          </div>

          <div style="width: 80%;background: white;margin-top: 30px;;border-radius: 15px;display: flex;flex-direction: column;align-items: center;padding-bottom: 15px">
            <Title name="关于网站"/>
            <div style="font-size: 13px;width: 90%;margin-top: 5px">
              欢迎来到洛克王国花瓶PK大家族！
              <br />
              <br />
              平时野战PK常驻<span style="color: #69c0ff">91区</span>，也会举办各种新人、进阶比赛。
              花瓶PK花样不断，<span style="color: #69c0ff">关闭透视</span>增加体验。详细规则见规则详情页。
              <br />
              <br />
              网站由混饭人、江玄、泪水、哆啦等群友共同制作，创造良好PK环境，交流加群<span style="color: #69c0ff">772848760</span>
            </div>
          </div>
        </div>
        <div style="width: 54%;display: flex;flex-direction: column;align-items: center">
          <div style="width: 90%;margin-top: 30px">
            <img :src="page" style="width: 100%">
          </div>
        </div>

        <div style="width: 22%;display: flex;flex-direction: column;align-items: center">
          <div style="width: 80%;background: white;margin-top: 30px;;border-radius: 15px;display: flex;flex-direction: column;align-items: center;padding-bottom: 10px">
            <Title name="主播推荐"/>
            <template v-for="ancher in anchers">
              <div style="display: flex;align-items: center;width: 90%;margin-left: 25%">
                <div style="display: flex;align-items: center;justify-content: center;height: 24px;width: 24px;overflow: hidden;border-radius: 12px">
                  <img :src="ancher.pic" style="height: 24px;">
                </div>
                <div class="ancher" @click="routerOut(ancher.url)">{{ancher.name}}</div>
              </div>
            </template>
          </div>
          <div style="width: 80%;background: white;margin-top: 30px;;border-radius: 15px;display: flex;flex-direction: column;align-items: center">
            <Title name="交流加群"/>
            <img :src="group" style="width: 90%;margin-bottom: 10px">
          </div>
        </div>
      </div>
      <div class="top_box_c2"></div>
      <div class="top_box_c1"></div>
    </div>
  </div>
</template>

<style scoped>
.ancher{
  margin: 8px 0 8px 10px;
  font-size: 13px;
  cursor: pointer;
}

.ancher:hover{
  color: #69c0ff;
}
</style>