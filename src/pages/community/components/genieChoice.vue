<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {attributes} from "@/stores/info";
import GenieAttribute from "@/pages/community/components/genieAttribute.vue";
import {useChooseInfoStore} from "@/pages/community/components/chooseInfo";
import GenieCollect from "@/pages/community/components/genieCollect.vue";

const props = defineProps<{
  type: number,
  show: boolean
}>()

const emits = defineEmits(['certain'])

const info = useChooseInfoStore()

const show = ref(props.show)

const certain = ()=>{
  if(props.type == 0) {
    console.log(info.choose)
    emits('certain',null,  info.choose)
  }
  else
    emits('certain', info.manaChoose, null)
  show.value = false
}

watch(()=>info.attribute, ()=>{
  info.changeGenie(props.type)
})

watch(()=>props.show, ()=>{
  show.value = true
  info.changeGenie(props.type)
})

onMounted(()=>{
  info.changeGenie(props.type)
})
</script>

<template>
  <el-dialog
      v-model="show"
      title="选择宠物"
      width="800"
      align-center
  >
    <div style="margin-top: -20px;width: 100%">
      <div style="display: flex;width: 100%;align-items: center;flex-wrap: nowrap">
        <template v-for="attribute in attributes">
          <GenieAttribute :attribute="attribute"></GenieAttribute>
        </template>
      </div>
      <el-scrollbar style="margin-top: 20px" height="373">
        <div style="display: flex;align-items: center;flex-wrap: wrap" v-if="props.type == 0">
          <template v-for="genie in info.genies">
            <GenieCollect :genie="genie"/>
          </template>
        </div>
        <div style="display: flex;align-items: center;flex-wrap: wrap" v-if="props.type == 1">
          <template v-for="manaGenie in info.manaGenies">
            <GenieCollect :mana-genie="manaGenie"/>
          </template>
        </div>
      </el-scrollbar>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="show = false">取消</el-button>
        <el-button type="primary" @click="certain">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>