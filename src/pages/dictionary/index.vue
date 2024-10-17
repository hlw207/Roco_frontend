<script setup lang="ts">

import AttributeShow from "@/pages/dictionary/component/attributeShow.vue";
import {attributes, genieTotal} from "@/stores/info";
import GenieShow from "@/pages/dictionary/component/genieShow.vue";
import {onMounted, ref, watch} from "vue";
import {useDictionaryInfoStore} from "@/pages/dictionary/dictionaryInfo";

const dictionary = useDictionaryInfoStore()
const margin_top = ref(160)
const margin_left = ref(0)

const pictures = ref([])
const position = ref(0)

watch(()=>dictionary.now_attribute,()=>{
  dictionary.getGenieList()
})

watch(()=>dictionary.choose.genieName,()=>{
  position.value = 0
  if(dictionary.choose.attribute == null) {
    pictures.value = []
    return
  }
  const attribute = dictionary.choose.attribute + '系'
  pictures.value = []
  for (const name : string of genieTotal[attribute]){
    if(name.includes(dictionary.choose.genieName)){
      pictures.value.push('../../../public/推荐/' + dictionary.now_attribute + '系/' + name)
    }
  }
  if(dictionary.choose.genieName == '麋鹿'){
    pictures.value.splice(0, 1);
  }
})

const move = (direction: number) =>{
  position.value += direction
  margin_left.value = position.value * -450
}

const onScroll = () => {
  const distance = document.documentElement.scrollTop - 320
  if(distance < 0)
    margin_top.value = 160
  else
    margin_top.value = distance + 160
}

onMounted(()=>{
  dictionary.getGenieList()
  window.addEventListener('scroll', onScroll)
})
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
        <div style="width: 62%;margin-top: 15px;">
          <div style="display: flex;flex-wrap: wrap;width: 600px">
            <template v-for="attribute in attributes">
              <AttributeShow :attribute="attribute"/>
            </template>
          </div>
          <div style="display: flex;flex-wrap: wrap;margin-top: 20px">
            <template v-for="genie in dictionary.genieList">
              <GenieShow :grade="genie.grade" :name="genie.genieName"/>
            </template>
          </div>
        </div>
        <div class="right_info">
          <div class="right_info_outer">
            <div class="right_info_inner">
              <template v-for="pic in pictures">
                <div>
                  <el-image :preview-src-list="pictures" :src="pic" style="width: 450px;max-height: 650px"/>
                  <div style="width: 450px;height: 50px;display: flex;align-items: center" v-if="pictures.length > 1">
                    <div class="inner_text" @click="move(-1)" v-if="position != 0">上一个</div>
                    <div style="display: flex;flex: 1;justify-content: right;">
                      <div class="inner_text" @click="move(1)" style="margin-right: 10px" v-if="position != pictures.length - 1">下一个</div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="top_box_c2"></div>
      <div class="top_box_c1"></div>
    </div>
  </div>

</template>

<style scoped>
.right_info{
  margin-top: v-bind(margin_top + 'px');
  width: 38%;
  display: flex;
}

.right_info_outer{
  width: 450px;
  overflow: hidden;
}

.right_info_inner{
  margin-left: v-bind(margin_left + 'px');
  display: flex;
  align-items: flex-start;
  transition: all 0.5s;
}

.inner_text{
  margin-top: -15px;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.7);
  cursor: pointer;
}

.inner_text:hover{
  color: black;
}
</style>