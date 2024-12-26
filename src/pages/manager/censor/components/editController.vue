<script setup lang="ts">

import {ref} from "vue";

const props = defineProps<{
  total : number
}>()

const emits = defineEmits(['changePage', 'changeSize'])

const pageSizes = ref(["5条/页", "10条/页", "20条/页", "50条/页", "100条/页"])
const size = ref("5条/页")

const page_current = ref(1)
const page_input = ref(1)

const current_change = () =>{
  page_input.value = page_current.value
  emits('changePage', page_input.value)
}

const page_change = () => {
  page_input.value = page_input.value.replace(/\D/g, "");
}

const size_change = () =>{
  let now_size = parseInt(size.value.replace('条/页', ''))
  page_current.value = 1
  emits('changeSize', now_size)
}

const key_enter = () =>{
  let max_page = Math.ceil(props.total / parseInt(size.value.replace('条/页', '')))
  if(page_input.value == '')
    page_current.value = page_input.value = 1
  page_input.value = page_input.value <= max_page ? page_input.value : max_page
  page_current.value = parseInt(page_input.value.toString())
  emits('changePage', page_input.value)
}
</script>

<template>
  <div class="editController">
    <div>
      <el-select
          v-model="size"
          class="myEditSelect"
          popper-class="myEditSelectPopper"
          @change="size_change"
      >
        <el-option
            v-for="item in pageSizes"
            :key="item"
            :label="item"
            :value="item"
        />
      </el-select>
    </div>
    <div style="margin-left: 10px;font-size: 13px;color: #606266">共{{props.total}}条</div>
    <div style="display: flex;flex: 1;align-items: center;justify-content: right;">
      <div class="EditPagination">
        <el-pagination @current-change="current_change" v-model:current-page="page_current" background layout="prev, pager, next" :total="total" :page-size="parseInt(size.replace('条/页', ''))" />
      </div>
      <div style="display:flex;margin-left: 15px;font-size: 13px;color: #606266;align-items: center">
        <div>前往</div>
        <div class="page_input">
          <input v-model="page_input" class="input_input" @input="page_change" @keyup.enter="key_enter">
        </div>
        <div>页</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.editController{
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 15px;
}

.page_input{
  margin: 0 10px;
  width: 45px;
  height: 25px;
  border-radius: 4px;
  border: 1.5px solid #dcdfe6;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.page_input:hover{
  border: 1.5px solid #c0c4cc;
}

.page_input:focus-within{
  border: 1.5px solid #2f15a1;
}

.input_input::placeholder{
  color: #a8abb2;
  font-size: 13px;
}

.input_input{
  width: 35px;
  height: 20px;
  border: none;        /* 重置input */
  box-shadow:none;
  outline: none;
  font-size: 13px;
  text-align: center;
}
</style>

<style lang="css">
.myEditSelect{
  margin-left: 0;
  width: 120px;
}

.myEditSelect .el-select__wrapper{
  height: 26px !important;
  min-height: 26px;
  font-size: 13px;
}

.myEditSelect .el-select__wrapper.is-focused{
  box-shadow: 0 0 0 1px #2f15a1 inset !important;
}

.myEditSelectPopper .el-select-dropdown__item{
  font-size: 12px;
}

.myEditSelectPopper .el-select-dropdown__item.is-hovering{
  background: rgba(47, 21, 161, 0.1);
}

.myEditSelectPopper .el-select-dropdown__item.is-selected{
  color: #2f15a1;
}

.EditPagination .el-pagination{
  --el-pagination-hover-color: #2f15a1;
}

.EditPagination .el-pager li.is-active{
  background-color: #2f15a1 !important;
}

.EditPagination .el-pager li{
  height: 28px;
  width: 28px;
  min-width: 28px;
}

.EditPagination button{
  height: 28px;
  width: 28px;
  min-width: 28px;
}
</style>