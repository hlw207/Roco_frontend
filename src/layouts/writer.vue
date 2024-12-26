<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import router from "@/router";
import {useRoute} from "vue-router";
import {useUserInfoStore} from "@/stores/user";

const route = useRoute()
const user = useUserInfoStore()

const url = ref('../../../public/logo1.png')
const pages = ref([
  {name: '执笔小说网', route: '/writer/home'},
  {name: '消息通知', route: '/writer/message'},
  {name: '个人主页', route: '/writer/user'}
])

const margin_top = ref(0)

const left = ref([
  {name: '工作台', route: '/writer/main'},
  {name: '小说', route: '/writer/fiction'},
  {name: '短故事', route: '/writer/story'},
  {name: '小说数据', route: '/writer/fictionData'},
  {name: '短故事数据', route: '/writer/storyData'},
  {name: '评论管理', route: '/writer/comment'},
  {name: '有话说管理', route: '/writer/mark'},
  {name: '个人主页', route: '/writer/user'},
  {name: '消息通知', route: '/writer/message'},
])

const show = ref([true, true, true])
const now_page = computed(()=>{
  return route.path
})

const showUp = (index: number) =>{
  show.value[index] = !show.value[index]
}

const router_to = (path: string) =>{
  router.push(path)
}

onMounted(()=>{
  window.addEventListener('scroll', ()=>{
    margin_top.value = document.documentElement.scrollTop
  })
})
</script>

<template>
  <div class="top">
    <div class="top_main">
      <div class="top_main_left">
        <img :src="url" style="height: 25px;margin-right: 10px">
        <div>执笔小说网</div>
        <div style="background: rgba(0,0,0,0.1);height: 13px;width: 1.5px;margin: 0 10px"></div>
        <div style="font-size: 14px">作家专区</div>
      </div>
      <div class="top_main_right">
        <template v-for="page in pages">
          <div class="text" @click="router.push(page.route)">
            {{page.name}}
          </div>
        </template>
        <div style="background: rgba(0,0,0,0.1);height: 13px;width: 1.5px;margin: 0 30px"></div>
        <div style="cursor: pointer;display: flex;align-items: center" v-if="user.id != ''">
          <div class="avatar">
            <el-icon><Avatar /></el-icon>
          </div>
          <div style="font-size: 14px">{{user.name}}</div>
          <el-icon style="font-size: 10px;margin-left: 6px"><CaretBottom /></el-icon>
        </div>
        <div style="cursor: pointer;display: flex;align-items: center" v-if="user.id == ''" @click="router.push('/login')">
          <div class="avatar">
            <el-icon><Avatar /></el-icon>
          </div>
          <div style="font-size: 14px">登录</div>
        </div>
      </div>
    </div>
  </div>
  <div class="main">
    <div class="core">
      <div class="core_left">
        <div class="item" :class="{item_active: now_page == left[0].route}" @click="router_to(left[0].route)">
          <el-icon class="item_icon"><Monitor /></el-icon>
          <div class="item_text">工作台</div>
        </div>
        <div class="item" @click="showUp(0)">
          <el-icon class="item_icon"><Document /></el-icon>
          <div class="item_text">作品管理</div>
          <el-icon class="item_arrow" :class="{item_arrow_active: show[0]}"><ArrowDown /></el-icon>
        </div>
        <transition name="fade">
          <div v-if="show[0]" style="overflow: hidden">
            <div class="item" :class="{item_active: now_page == left[1].route}" @click="router_to(left[1].route)">
              <div class="item_text" style="margin-left: 28px">{{left[1].name}}</div>
            </div>
            <div class="item" :class="{item_active: now_page == left[2].route}" @click="router_to(left[2].route)">
              <div class="item_text" style="margin-left: 28px">{{left[2].name}}</div>
            </div>
          </div>
        </transition>
        <div class="item" @click="showUp(1)">
          <el-icon class="item_icon"><DataLine /></el-icon>
          <div class="item_text">数据中心</div>
          <el-icon class="item_arrow" :class="{item_arrow_active: show[1]}"><ArrowDown /></el-icon>
        </div>
        <transition name="fade">
          <div v-if="show[1]" style="overflow: hidden">
            <div class="item" :class="{item_active: now_page == left[3].route}" @click="router_to(left[3].route)">
              <div class="item_text" style="margin-left: 28px">{{left[3].name}}</div>
            </div>
            <div class="item" :class="{item_active: now_page == left[4].route}" @click="router_to(left[4].route)">
              <div class="item_text" style="margin-left: 28px">{{left[4].name}}</div>
            </div>
          </div>
        </transition>
        <div class="item" @click="showUp(2)">
          <el-icon class="item_icon"><Message /></el-icon>
          <div class="item_text">互动管理</div>
          <el-icon class="item_arrow" :class="{item_arrow_active: show[2]}"><ArrowDown /></el-icon>
        </div>
        <transition name="fade">
          <div v-if="show[2]" style="overflow: hidden">
            <div class="item" :class="{item_active: now_page == left[5].route}" @click="router_to(left[5].route)">
              <div class="item_text" style="margin-left: 28px">{{left[5].name}}</div>
            </div>
            <div class="item" :class="{item_active: now_page == left[6].route}" @click="router_to(left[6].route)">
              <div class="item_text" style="margin-left: 28px">{{left[6].name}}</div>
            </div>
          </div>
        </transition>
        <div class="item" :class="{item_active: now_page == left[7].route}" @click="router_to(left[7].route)">
          <el-icon class="item_icon"><User /></el-icon>
          <div class="item_text">{{left[7].name}}</div>
        </div>
        <div class="item" :class="{item_active: now_page == left[8].route}" @click="router_to(left[8].route)">
          <el-icon class="item_icon"><Bell /></el-icon>
          <div class="item_text">{{left[8].name}}</div>
        </div>
      </div>
      <div class="core_main">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped>
.main{
  display: flex;
  justify-content: center;
  background: #f9f9f9;
  margin-top: 70px;
  min-height: calc(100vh - 70px);
}

.top{
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100vw;
  height: 70px;
  background: white;
  align-items: center;
  white-space: nowrap;
}

.top_main{
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  width: 1240px;
}

.top_main_left{
  height: 70px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.top_main_right{
  height: 70px;
  display: flex;
  justify-content: right;
  align-items: center;
}

.avatar{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  overflow: hidden;
  border-radius: 14px;
  margin-right: 6px;
  font-size: 20px;
}

.text{
  font-size: 14px;
  margin-left: 30px;
  cursor: pointer;
}

.text:hover{
  color: #096dd9;
}

.core{
  display: flex;
  position: relative;
  margin-top: 20px;
  width: 1240px;
}

.core_left{
  margin-top: v-bind(margin_top + 'px');
  width: 240px;
  background: white;
  border-radius: 10px;
  max-height: min(calc(100vh - 110px), 1240px);
  height: fit-content;
  padding: 12px;
  box-sizing: border-box;
}

.core_main{
  margin-left: 20px;
  margin-bottom: 30px;
  width: 980px;
}

.item{
  width: 216px;
  height: 45px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  box-sizing: border-box;
  padding-left: 25px;
}

.item:hover{
  background: #f9f9f9;
}

.item_active{
  color: #1890ff;
  background: rgba(230, 247, 255, 0.3);
}

.item_icon{
  font-size: 18px;
}

.item_text{
  margin-left: 10px;
  font-size: 14px;
}

.item_arrow{
  margin-top: 3px;
  margin-left: 55px;
  font-size: 12px;
  transition: all 1s;
}

.item_arrow_active{
  transform: rotate(180deg);
  transition: all 1s;
}

/* 定义进入和离开的开始状态 */
.fade-enter-from, .fade-leave-to {
  height: 0;
}

/* 定义进入和离开的结束状态 */
.fade-enter-to, .fade-leave-from {
  height: 90px;
}

/* 定义过渡的持续时间和效果 */
.fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease;
}
</style>