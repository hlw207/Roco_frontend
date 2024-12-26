<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";

const height = ref(window.innerHeight - window.innerHeight * 0.04 - 60)
const width = ref(0)

const choice = reactive({
  category: '小说',
  status: '未审核'
})

const categories = ref(['小说', '短故事'])
const status = ref(['小说', '短故事'])

const tableData = ref()
const tableBox = ref()

onMounted(()=>{
  width.value = tableBox.value.getBoundingClientRect().right - tableBox.value.getBoundingClientRect().left
})
</script>

<template>
  <div class="edit">
    <div class="opDiv">

      <div class="simpleSearch">
        <div style="display: flex;align-items: center">
          <div class="text" style="margin-right: 10px">选择类型</div>
          <div>
            <el-select
                clearable
                v-model="choice.category"
                placeholder="选择类别"
                size="large"
                class="mySelect"
                popper-class="mySelectPopper"
            >
              <el-option
                  v-for="item in categories"
                  :key="item"
                  :label="item"
                  :value="item"
              />
            </el-select>
          </div>
        </div>
      </div>
    </div>
    <div class="table_box" ref="tableBox">
      <div class="table">
        <el-scrollbar :max-height="height - 115">
          <el-table :data="tableData" stripe border fit style="width: 100%"  class="gain">
            <el-table-column fixed prop="id" label="ID" :width="width * 0.15" />
            <el-table-column prop="title" label="章节标题" :width="width * 0.3" />
            <el-table-column prop="category" label="文章类型" :width="width * 0.1" />
            <el-table-column prop="url" label="状态" :width="width * 0.1" >
              <template #default="{ row }">
                <a :href="row.url" target="_blank">{{ row.url }}</a>
              </template>
            </el-table-column>
            <el-table-column prop="content" label="章节内容" :width="width * 0.25" />
            <el-table-column label="操作">
              <template #default="scope">
                <div class="operation">
                  <el-button class="operation_icon" type="success" >
                    <el-icon class="operation_iconStyle"><ZoomIn /></el-icon>
                  </el-button>
                  <!--                  <el-button class="operation_icon" type="primary" @click="editDetail(scope.row.id)">-->
                  <!--                    <el-icon class="operation_iconStyle"><Edit/></el-icon>-->
                  <!--                  </el-button>-->
                  <el-button class="operation_icon" type="danger" >
                    <el-icon class="operation_iconStyle"><Delete /></el-icon>
                  </el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
  meta:
    layout: manager
</route>

<style scoped>
.edit{
  max-height: v-bind(height + 'px');
  width: 100%;
  background: white;
  transition: all 0.5s;
}
.opDiv{
  display: flex;
  align-items: center;
  padding: 15px;
}

.simpleSearch{
  flex: 1;
  display: flex;
}

.search{
  position: relative;
  display: flex;
  align-items: center;
  border: 1.5px solid #dcdfe6;
  height: 32px;
  width: 250px;
  border-radius: 3px;
  transition: all 0.3s;
}

.search:hover{
  border: 1.5px solid #c0c4cc;
}

.search:focus-within{
  border: 1.5px solid #2f15a1;
}

.search_button{
  display: flex;
  margin-left: 15px;
  height: 32px;
  width: 97px;
  border: 1px solid rgba(115, 115, 115, 0.3);
  border-radius: 3px;
}

.search_button_div{
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.search_button_div:hover{
  background: rgba(115, 115, 115, 0.2);
}

.input_input{
  width: 200px;
  margin-left: 6px;
  height: 28px;
  border: none;        /* 重置input */
  box-shadow:none;
  outline: none;
  font-size: 14px;
}

.input_input::placeholder{
  font-size: 14px;
  color: #737373;
}

.icon{
  font-size: 14px;
  margin-right: 5px;
}


.add{
  background: rgba(47, 21, 161, 0.8);
}

.add:hover{
  background: rgba(47, 21, 161, 0.5);
}

.cancel{
  position: absolute;
  right: 10px;
  width: 14px;
  height: 14px;
  border-radius: 7px;
  box-sizing: border-box;
  border: 1px solid #c0c4cc;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.iconStyle{
  color: #c0c4cc;
  font-size: 10px;
}

.text{
  margin: 0 5px;
  font-size: 14px;
}

.table_box{
  margin-left: -0.06%;
  width: 100.12%;
  max-height: v-bind(height - 115 + 'px');
  transition: all 0.5s;
}

.table{
  width: 100%;
  max-height: v-bind(height - 115 + 'px');
  transition: all 0.5s;
}

.table_box_bottom{
  height: 50px;
  background: white;
}

.operation{
  display: flex;
  align-items: center;
  justify-content: center;
}

.operation_icon{
  padding: 0;
  height: 24px;
  width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.operation_iconStyle{
  width: 18px;
  height: 18px;
  font-size: 12px;
}

@keyframes In
{
  0% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
  }
}

.gain{
  animation: In 0.8s;
}
</style>

<style lang="css">
.table .el-table__header-wrapper .cell{
  font-weight: bold;
  color: black;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  word-break: break-all;
}

.table .el-table{
  --el-table-row-hover-bg-color: rgba(47, 21, 161, 0.05);
}

.table .el-table__body-wrapper .cell{
  color: #565555;
  font-size: 13px;
  word-break: break-all;
  vertical-align: center;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.table .el-checkbox{
  --el-checkbox-checked-text-color: rgba(47, 21, 161, 0.8);
  --el-checkbox-checked-input-border-color: rgba(47, 21, 161, 0.8);
  --el-checkbox-checked-bg-color: rgba(47, 21, 161, 0.8);
  --el-checkbox-input-border-color-hover: rgba(47, 21, 161, 0.8);
}

.mySelect{
  margin-left: 12px;
  width: 150px;
}

.mySelect .el-select__wrapper{
  height: 32px !important;
  min-height: 32px;
  font-size: 13px;
}

.mySelect .el-select__wrapper.is-focused{
  box-shadow: 0 0 0 1px #2f15a1 inset !important;
}

.mySelectPopper .el-select-dropdown__item.is-hovering{
  background: rgba(47, 21, 161, 0.1);
}

.mySelectPopper .el-select-dropdown__item.is-selected{
  color: #2f15a1;
}
</style>