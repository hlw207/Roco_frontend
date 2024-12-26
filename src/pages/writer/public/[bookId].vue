<script setup lang="ts">
import {computed, nextTick, onMounted, reactive, ref, watch} from "vue";
import {ElMessage} from "element-plus";
import {useRoute} from "vue-router";
import router from "@/router";
import {request} from "@/util/request";
import type {chapter, outline, role, writerHelper, writerHelperDetail} from "@/util/interface";

const book = ref('')
const fontSize = ref(25)
const title = ref('')
const content = ref('')

const scroll = ref()
const textarea = ref()

const isPopupVisible = ref(false)
const popupStyleTop = ref(0)
const popupStyleLeft = ref(0)
const isFocused = ref(false)
const selectText = ref('')
const selection = ref(0)

const updateTime = ref(new Date())
const leftShow = ref(true)
const width = ref(250)

const chapterIndex = ref(0)
const chapterInfo = ref([] as chapter[])
const chapterTotal = ref(0)

const rightShow = ref([false, false, false, false, false, false])
const rightItem = ref(['纠错', '取名', '润色', '续写', '大纲', '角色'])
const polishComment = ref('')
const polishStatus = ref(0) //0为初始，1为生成中，2为生成完毕
const polishText = ref('')

const writeComment = ref('')
const writeStatus = ref(0) //0为初始，1为生成中，2为生成完毕
const writeText = ref('')
const writeRole = ref([] as string[])
const writeRoleReal = ref([] as role[])
const writeRoleShow = ref(false)
const writeChapter = ref(-1)
const writeChapterReal = ref({title: '', content: ''})
const writeChapterShow = ref(false)


const summaryIndex = ref(0)
const summaryInfo = ref([] as outline[])
const summaryInput = ref()
const summaryTitle = ref()

const roleIndex = ref(-1)
const roleInput = reactive({
  name: '',
  description: ''
})

const pickComment = ref('')
const pickCountry = ref('中国')
const pickGender = ref('不限')
const pickStatus = ref(0)
const aiNames = ref([] as string[])

const wrongStatus = ref(0)
const wrongText = ref('')

const country = ref(['中国', '东方' ,'西方'])
const gender = ref(['不限', '男性', '女性', '中性'])

const publicShow = ref(false)
const openPublic = () =>{
  // 判断是否发布
  publicShow.value = true
}

const writerHelperOpenShow = ref(true)
const writerHelperAddShow = ref(false)
const writerHelper = ref([] as writerHelper[])
const writerHelperId = ref(-1n)
const writerHelperDetail = ref({} as writerHelperDetail)

const wt_description = ref("")
const backgroundDescription =  ref("")
const outlineDescription = ref("")

const beforeBook = ref({chapterId: -1n, chapterStatus: "", chapterTitle: ""} as chapter)
const behindBook = ref({chapterId: -1n, chapterStatus: "", chapterTitle: ""} as chapter)

const beforeShow = ref(true)
const behindShow = ref(true)

const beforeNone = () => {
  beforeBook.value = {chapterId: -1n, chapterStatus: "", chapterTitle: ""}
  beforeShow.value = false
}

const behindNone = () => {
  behindBook.value = {chapterId: -1n, chapterStatus: "", chapterTitle: ""}
  behindShow.value = false
}

const writerBeforeText = computed(()=>{
  if(!rightShow.value[3])
    return null
  return content.value.substring(0, selection.value)
})

const writerBehindText = computed(()=>{
  if(!rightShow.value[3])
    return null
  return content.value.substring(selection.value)
})

const rightShowIf = computed(()=>{
  for (let i = 0;i < 6;i++){
    if(rightShow.value[i])
      return rightShow.value[i]
  }
  return false
})

const route = useRoute()

const time = computed(() => {
  const date = updateTime.value;

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
});

const autoResize = ()=> {
  // 设置高度为内容高度加上滚动高度
  nextTick(()=>{
    const scrollbarInstance = scroll.value;
    const scrollbarWrap = scrollbarInstance.$el.querySelector('.el-scrollbar__wrap');
    const beforePosition = scrollbarWrap.scrollTop

    const beforeHeight = parseInt(textarea.value.style.height, 10)
    textarea.value.style.height = 'auto'
    textarea.value.style.height = `${textarea.value.scrollHeight}px`;
    const nowHeight = parseInt(textarea.value.style.height, 10)

    if (scrollbarInstance && nowHeight && beforeHeight) {
      // 获取滚动容器的DOM元素
      if (scrollbarWrap) {
        // 滚动到最底部
        scrollbarWrap.scrollTop = beforePosition + nowHeight - beforeHeight
      }
    }
  })
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    // 阻止默认的回车行为
    event.preventDefault();
    // 插入两个换行符
    const selection = textarea.value.selectionStart;
    const textValue = content.value;
    const beforeText = textValue.substring(0, selection);
    const afterText = textValue.substring(selection, textValue.length);
    const newLine = '\n\n    ';
    content.value = beforeText + newLine + afterText;

    // 更新光标位置
    nextTick(() => {
      textarea.value.selectionStart = textarea.value.selectionEnd = selection + newLine.length;
    });
  }
  if (event.key === 'Backspace' || event.key === 'Delete') {
    const selection = textarea.value.selectionStart;    // 检查是否在首行前四格内
    if(selection > 6) {
      // console.log(content.value.substring(selection - 6, selection))
      if(content.value.substring(selection - 6, selection) == '\n\n    '){
        event.preventDefault();
        content.value = content.value.substring(0, selection - 6) + content.value.substring(selection)

        // 更新光标位置
        nextTick(() => {
          textarea.value.selectionStart = textarea.value.selectionEnd = selection - 6;
        });
      }
    }
  }
}

const showPopup = (event: MouseEvent) =>{
  if(isFocused.value || selectText.value != '') {
    // 防止默认的右键菜单出现
    event.preventDefault()
    // 显示弹窗，并设置位
    isPopupVisible.value = true
    popupStyleTop.value = event.clientY
    popupStyleLeft.value = event.clientX
    console.log(event.clientY + ' ' + event.clientX)
    nextTick(()=>{
      window.addEventListener('click',clickEvent)
    })
  }
}

const clickEvent = (event: MouseEvent)=>{
  if(event.target.className != 'context-menu') {
    isPopupVisible.value = false
    window.removeEventListener('click', clickEvent)
  }
}

const hidePopup = () =>{
  isPopupVisible.value = false
  selectText.value = ''
}

const copyText = (name: string) => {
  navigator.clipboard.writeText(name);
  ElMessage.success('已粘贴到剪切板')
};

const updateSelection = (event: MouseEvent)=> {
  const s = window.getSelection()
  if(s) {
    selectText.value = s.toString().trim();
    console.log(selectText.value)
    selection.value = textarea.value.selectionStart
    console.log(textarea.value.selectionStart + ' ' + textarea.value.selectionEnd)
  }
}

const changeChapter = (index: number) => {
  refresh()
  chapterIndex.value = index
  content.value = title.value = '' //获取
  getChapterDetailInfo()
  setTimeout(()=>{
    const scrollbarInstance = scroll.value;
    let scrollbarWrap = scrollbarInstance.$el.querySelector('.el-scrollbar__wrap');
    scrollbarWrap.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, 50)
}

const addChapter = () =>{
  chapterInfo.value.splice(0, 0,   {chapterTitle: '', chapterStatus: 'TO_BE_PUBLISHED', chapterId: -1})
  chapterIndex.value = 0
  title.value = content.value = ''
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

const chooseRight = (index : number) =>{
  for (let i = 0;i < 6;i++){
    rightShow.value[i] = false
  }
  rightShow.value[index] = true
  // 写作
  if(index == 3){
    if(selection.value == 0)
      selection.value = content.value.length
  }
}

const rightClose = () =>{
  for (let i = 0;i < 6;i++){
    rightShow.value[i] = false
  }
}

const polishLaunch = () => {
  polishStatus.value = 1
  request({
    url: '/v1/model/polish',
    method: 'post',
    data:{
      content: selectText.value,
      requirement: polishComment.value
    }
  }).then((res)=>{
    if(res.data.code == 0){
      console.log(res.data)
      polishText.value = res.data.data
      polishStatus.value = 2
    }
  })
}

const polishReplace = () =>{
  const start = selection.value
  const end = start + selectText.value.length
  content.value = content.value.substring(0, start) + polishText.value + content.value.substring(end)
  polishStatus.value = 0
}

const polishCancel = () =>{
  polishStatus.value = 0
}

const writeLaunch = () => {
  writeStatus.value = 1
  let roles = {}
  for (const r of writeRoleReal.value){
    roles[r.name] = r.description
  }
  request({
    url: '/v1/model/continueWrite',
    method: 'post',
    data:{
      front: writerBeforeText.value,
      back: writerBehindText.value,
      chapterContent: writeChapterReal.value.content,
      bookContent: writerHelperDetail.value.outlineDescription,
      writeRequirement: writeComment.value,
      roles: roles
    }
  }).then((res)=>{
    if(res.data.code == 0){
      console.log(res.data)
      writeText.value = res.data.data
      writeStatus.value = 2
    }
  })
}

const writeInsert = () =>{
  content.value = content.value.substring(0, selection.value) + writeText.value + content.value.substring(selection.value)
  writeStatus.value = 0
}

const writeCancel = ()=>{
  writeStatus.value = 0
}

const writeRoleAdd = ()=>{
  writeRoleShow.value = true
}

const writeRoleAddCertain = ()=>{
  writeRoleReal.value = writerHelperDetail.value.characterList.filter(item => writeRole.value.includes(item.name))
  console.log(writeRoleReal.value)
  writeRoleShow.value = false
  ElMessage.success("添加成功")
}

const writeRoleDelete = (index: number) => {
  writeRoleReal.value.splice(index, 1)
  writeRole.value.splice(index, 1)
}

const writeChapterAdd = ()=>{
  writeChapterShow.value = true
}

const writeChapterAddCertain = ()=>{
  request({
    url: '/v1/writing/outlineDetail',
    method: 'get',
    params: {
      outlineId: writeChapter.value
    }
  }).then((res)=>{
    if(res.data.code == 0){
      ElMessage.success('选择成功')
      for (const summary of summaryInfo.value){
        if(summary.outlineId == writeChapter.value)
          writeChapterReal.value.title = summary.title
      }
      writeChapterReal.value.content = res.data.data
      writeChapterShow.value = false
    }else {
      ElMessage.warning(res.data.msg)
    }
  })
}

const writeChapterDelete = ()=>{
  writeChapter.value = -1
  writeChapterReal.value = {title: '', content: ''}
}

const pickName = () => {
  pickStatus.value = 1
  request({
    url: '/v1/model/name',
    method: 'post',
    data:{
      gender: pickGender.value,
      description: "位于" + pickCountry.value + "," + pickComment.value
    }
  }).then((res)=>{
    pickStatus.value = 0
    if(res.data.code == 0){
      console.log(res.data)
      aiNames.value = res.data.data
    }else {
      ElMessage.warning(res.data.msg)
    }
  })
}

const wrongExam = () => {
  wrongStatus.value = 1
  request({
    url: '/v1/model/correct',
    method: 'post',
    data:{
      content: content.value
    }
  }).then((res)=>{
    wrongStatus.value = 0
    if(res.data.code == 0){
      console.log(res.data)
      wrongText.value = res.data.data
    }else {
      ElMessage.warning(res.data.msg)
    }
  })
}

const changeSummary = (index: number) => {
  summaryIndex.value = index
  if(index == 0)
    summaryInput.value = writerHelperDetail.value.outlineDescription
  else {
    if(summaryInfo.value[index - 1].outlineId != -1) {
      request({
        url: '/v1/writing/outlineDetail',
        method: 'get',
        params: {
          outlineId: summaryInfo.value[index - 1].outlineId
        }
      }).then((res) => {
        if (res.data.code == 0) {
          console.log(res.data)
          summaryInput.value = res.data.data
          summaryTitle.value = summaryInfo.value[index - 1].title
        } else {
          ElMessage.warning(res.data.msg)
        }
      })
    }else {
      summaryInput.value = ''
    }
  }
}

const changeRole = (index: number) => {
  roleIndex.value = index
  roleInput.name = writerHelperDetail.value.characterList[index].name
  roleInput.description = writerHelperDetail.value.characterList[index].description
}

const postChapter = (index: number, title: string, content: string) =>{
  if(title != '' && content != '') {
    request({
      url: '/v1/chapter/postChapter',
      method: 'post',
      data: {
        novelId: route.params['bookId'],
        title: title,
        content: content,
        parentId: -1
      }
    }).then((res) => {
      if (res.data.code == 0) {
        console.log(res.data)
        chapterInfo.value[index].chapterTitle = title
        chapterInfo.value[index].chapterId = res.data.data
      } else {
        ElMessage.warning(res.data.msg)
      }
    })
  }
}

const publishChapter = () =>{
  if(chapterInfo.value[chapterIndex.value].chapterId != -1n){
    request({
      url: '/v1/chapter/publishChapter',
      method: 'post',
      data: {
        chapterId: chapterInfo.value[chapterIndex.value].chapterId.toString(),
        parentId: beforeBook.value.chapterId.toString(),
        childId: behindBook.value.chapterId.toString()
      }
    }).then((res) => {
      if (res.data.code == 0) {
        ElMessage.success("成功发布")
        chapterInfo.value[chapterIndex.value].chapterStatus = 'UNDER_REVIEW'
        console.log(res.data)
        publicShow.value = false
      } else {
        ElMessage.warning(res.data.msg)
      }
    })
  }
}

const updateChapter = (id: bigint, index: number, title: string, content: string) => {
  if(title != '' && content != '') {
    request({
      url: '/v1/chapter/updateChapter',
      method: 'post',
      data: {
        id: id,
        title: title,
        content: content,
      }
    }).then((res) => {
      if (res.data.code == 0) {
        console.log(res.data)
        chapterInfo.value[index].chapterTitle = title
      } else {
        ElMessage.warning(res.data.msg)
      }
    })
  }
}

const refresh = () => {
  if(chapterInfo.value[chapterIndex.value].chapterId == BigInt(-1))
    postChapter(chapterIndex.value, title.value, content.value)
  else
    updateChapter(chapterInfo.value[chapterIndex.value].chapterId, chapterIndex.value, title.value, content.value)
}

const summaryAdd = () => {
  summaryInfo.value.splice(0, 0, {outlineId: -1, title: ''})
  summaryTitle.value = ''
  summaryInput.value = ''
  summaryIndex.value = 1
}

const roleAdd = ()=>{
  writerHelperDetail.value.characterList.splice(0, 0, {name: '', description: '', updateTime: ''})
  roleInput.description = ''
  roleInput.name = ''
  roleIndex.value = 0
}

const roleRefresh = (index: number) => {
  if(roleInput.name != '') {
    if (writerHelperDetail.value.characterList[index].name == '') {
      request({
        url: '/v1/writing/createCharacter',
        method: 'post',
        data: {
          wtHelperId: writerHelperId.value,
          name: roleInput.name,
          description: roleInput.description
        }
      }).then((res)=>{
        if(res.data.code == 0){
          ElMessage.success("添加成功")
          console.log(res.data)
          writerHelperDetail.value.characterList[index].name = roleInput.name
          writerHelperDetail.value.characterList[index].description = roleInput.description
        }else {
          ElMessage.warning(res.data.msg)
        }
      })
    } else {
      request({
        url: '/v1/writing/updateCharacter',
        method: 'post',
        data: {
          wtHelperId: writerHelperId.value,
          name: roleInput.name,
          description: roleInput.description
        }
      }).then((res)=>{
        if(res.data.code == 0){
          ElMessage.success("修改成功")
          console.log(res.data)
          writerHelperDetail.value.characterList[index].name = roleInput.name
          writerHelperDetail.value.characterList[index].description = roleInput.description
        }else {
          ElMessage.warning(res.data.msg)
        }
      })
    }
  }
}

const summaryRefresh = (index: number) =>{
  if(index == 0){
    let wt_description = ''
    for (const helper of writerHelper.value){
      if(helper.id == writerHelperId.value){
        wt_description = helper.description
      }
    }
    request({
      url: '/v1/writing/updateHelper',
      method: 'post',
      data:{
        wtHelperId: writerHelperId.value,
        wt_description: wt_description,
        backgroundDescription: writerHelperDetail.value.backgroundDescription,
        outlineDescription: summaryInput.value
      }
    }).then((res)=>{
      if(res.data.code == 0){
        ElMessage.success("修改成功")
        console.log(res.data)
        writerHelperDetail.value.outlineDescription = summaryInput.value
      }else {
        ElMessage.warning(res.data.msg)
      }
    })
  }else {
    if(summaryTitle.value != ''){
      if(summaryInfo.value[index - 1].outlineId == -1){
        request({
          url: '/v1/writing/createOutline',
          method: 'post',
          data:{
            wtHelperId: writerHelperId.value,
            title: summaryTitle.value,
            content: summaryInput.value
          }
        }).then((res)=>{
          if(res.data.code == 0){
            ElMessage.success("添加成功")
            console.log(res.data)
            summaryInfo.value[index - 1].title = summaryTitle.value
            summaryInfo.value[index - 1].outlineId = res.data.data
          }else {
            ElMessage.warning(res.data.msg)
          }
        })
      }else {
        request({
          url: '/v1/writing/updateOutline',
          method: 'post',
          data:{
            outlineId: summaryInfo.value[index - 1].outlineId,
            title: summaryTitle.value,
            content: summaryInput.value
          }
        }).then((res)=>{
          if(res.data.code == 0){
            ElMessage.success("修改成功")
            summaryInfo.value[index - 1].title = summaryTitle.value
            console.log(res.data)
          }else {
            ElMessage.warning(res.data.msg)
          }
        })
      }
    }
  }
}

const getFictionInfo = () => {
  console.log(route.params['bookId'])
  request({
    url: '/v1/novel/getInfo',
    method: 'get',
    params: {
      novelId: route.params['bookId']
    }
  }).then((res)=>{
    if(res.data.code == 0) {
      console.log(res.data)
      book.value = res.data.data.title
    }else {
      console.log(res.data.msg)
    }
  })
}

const getChapterInfo = async () =>{
  await request({
    url: '/v1/chapter/myNovelChapter',
    method: 'get',
    params:{
      novelId: route.params['bookId']
    }
  }).then((res)=>{
    if(res.data.code == 0){
      console.log(res.data)
      chapterInfo.value = res.data.data
      chapterTotal.value = chapterInfo.value.length
    }else {
      ElMessage.warning(res.data.msg)
    }
  })
  getChapterDetailInfo()
}

const getChapterDetailInfo = () =>{
  if(chapterInfo.value[chapterIndex.value].chapterId != BigInt(-1)){
    request({
      url: '/v1/chapter/getChapterById',
      method: 'get',
      params:{
        chapterUid: chapterInfo.value[chapterIndex.value].chapterId
      }
    }).then((res)=>{
      if(res.data.code == 0) {
        console.log(res.data)
        content.value = res.data.data.content
        title.value = res.data.data.title
      }else {
        ElMessage.warning(res.data.msg)
      }
    })
  }
}

const getWriterHelper = () => {
  request({
    url: '/v1/writing/getMyHelpers',
    method: 'get',
    params:{
      novelId: route.params['bookId']
    }
  }).then((res)=>{
    if(res.data.code == 0){
      console.log(res.data)
      writerHelper.value = res.data.data
    }else {
      ElMessage.warning(res.data.msg)
    }
  })
}

const addWriterHelper = () => {
  request({
    url: '/v1/writing/createHelper',
    method: 'post',
    data:{
      novelId: route.params['bookId'],
      wt_description: wt_description.value,
      backgroundDescription: backgroundDescription.value,
      outlineDescription: outlineDescription.value
    }
  }).then((res)=>{
    if(res.data.code == 0) {
      getWriterHelper()
      writerHelperAddShow.value = false
    }else {
      ElMessage.warning(res.data.msg)
    }
  })
}

const chooseWriterHelper = (id: bigint) => {
  writerHelperId.value = id
  writerHelperOpenShow.value = false
}

const getDetailWriterHelper = () =>{
  request({
    url: '/v1/writing/getHelperDetail',
    method: 'get',
    params:{
      helperId: writerHelperId.value
    }
  }).then((res)=>{
    if(res.data.code == 0){
      console.log(res.data)
      writerHelperDetail.value = res.data.data
      summaryInput.value = writerHelperDetail.value.outlineDescription
      if(writerHelperDetail.value.characterList.length != 0){
        roleIndex.value = 0
        roleInput.name = writerHelperDetail.value.characterList[0].name
        roleInput.description = writerHelperDetail.value.characterList[0].description
      }
    }else {
      ElMessage.warning(res.data.msg)
    }
  })
}

const getOutlineList = () => {
  request({
    url: '/v1/writing/getOutlineList',
    method: 'get',
    params:{
      writingId: writerHelperId.value
    }
  }).then((res)=>{
    if(res.data.code == 0){
      console.log(res.data)
      summaryInfo.value = res.data.data
    }else {
      ElMessage.warning(res.data.msg)
    }
  })
}

watch(()=>writerHelperId.value,()=>{
  if(writerHelperId.value != -1){
    getDetailWriterHelper()
    getOutlineList()
  }
})

watch(()=>content.value, ()=>{
  autoResize()
})

watch(()=>title.value, ()=>{
  if(title.value.length > 20){
    title.value = title.value.substring(0, 20)
    ElMessage.warning("标题最多20字")
  }
})

onMounted(()=>{
  textarea.value.focus()
  getFictionInfo()
  getChapterInfo()
  getWriterHelper()
})
</script>

<template>
  <div class="screen">
    <div class="screen_top">
      <div class="top_arrow" @click="router.back()">
        <el-icon><ArrowLeft /></el-icon>
      </div>
      <div class="top_text">
        {{book}}
      </div>
      <div class="top_update">
        {{time}}已同步
      </div>
      <div style="display: flex;flex: 1;justify-content: right;align-items: center">
        <div class="top_func">
          <el-icon style="margin-right: 3px"><Finished /></el-icon>
          排版
        </div>
        <div class="top_func" @click="refresh">
          <el-icon style="margin-right: 3px"><Refresh /></el-icon>
          保存
        </div>
        <div class="top_func">
          <el-icon style="margin-right: 3px"><Delete /></el-icon>
          清空
        </div>
        <div class="top_func">
          <el-icon style="margin-right: 3px"><Download /></el-icon>
          下载
        </div>
        <div class="top_func" @click="writerHelperOpenShow=true">
          <el-icon style="margin-right: 3px"><Open /></el-icon>
          切换写作助手
        </div>
        <div class="top_button" style="margin-left: 15px" @click="openPublic">
          发布作品
        </div>
      </div>
    </div>
    <div class="screen_main">
      <div class="main_left">
        <div v-if="leftShow" class="main_left_main">
          <div style="font-size: 13px;color: #a4a4a4;display: flex">
            <div>目录</div>
            <div style="display: flex;justify-content: right;flex: 1;align-items: center">
              <el-icon class="left_tip"><Delete /></el-icon>
              <el-icon class="left_tip" @click="addChapter"><Plus /></el-icon>
            </div>
          </div>
          <div style="display: flex;margin-top: 10px;align-items: center;">
            <el-icon style="font-size: 18px"><FolderOpened /></el-icon>
            <div style="margin-left: 5px;width: 120px;overflow: hidden;font-size: 13px;white-space: nowrap;text-overflow: ellipsis">{{book}}</div>
            <div style="display: flex;justify-content: right;flex: 1;align-items: center">
              <div style="font-size: 11px;color: #a4a4a4;">
                共{{chapterTotal}}章
              </div>
            </div>
          </div>
          <el-scrollbar style="height: calc(100vh - 150px);margin-top: 5px;">
            <template v-for="(chapter, index) in chapterInfo">
              <div class="left_item" :class="{left_item_active: index == chapterIndex}" @click="changeChapter(index)">
                <div style="width: 80%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
                  {{chapter.chapterTitle != '' ? chapter.chapterTitle : '无标题章节'}}
                </div>
                <div style="display: flex;flex: 1;justify-content: right;font-size: 11px;color: #a4a4a4;font-weight: normal">
                  {{chapterStatus(chapter.chapterStatus)}}
                </div>
              </div>
            </template>
          </el-scrollbar>
        </div>
        <div class="main_left_open" :class="{main_left_close: leftShow}" @click="leftShow = !leftShow;width = leftShow ? 220 : 0">
          <el-icon><ArrowRight /></el-icon>
        </div>
      </div>
      <div class="main_core">
        <el-scrollbar style="height: 100%;width: 100%" ref="scroll">
          <div class="main_container" @contextmenu.prevent="showPopup" @mouseup="updateSelection">
            <div class="main_container_top">
              <input class="input_input" placeholder="请输入章节名。示例：智力罗国徽" v-model="title"/>
            </div>
            <div class="main_container_main">
              <textarea class="no-style-textarea" placeholder="请输入正文" ref="textarea" v-model="content" @keydown="handleKeydown" @focus="isFocused=true" @blur="isFocused=false"></textarea>
            </div>
          </div>
        </el-scrollbar>
        <div class="main_core_none" v-if="polishStatus == 1 || polishStatus == 2 || writeStatus == 1 || writeStatus == 2"></div>
      </div>

      <div class="main_right">


        <div class="right_extra" v-if="rightShowIf">
          <el-icon class="right_cancel" @click="rightClose"><Close /></el-icon>
          <template v-for="(item, index) in rightItem">
            <div class="right_title" v-if="rightShow[index]">{{item}}</div>
          </template>

<!--纠错-->
          <div v-if="rightShow[0]" class="right_main" style="height: calc(100vh - 105px);display: flex;flex-direction: column">
            <div style="margin-top: 10px;background: #fafafa;border-radius: 5px;position: relative;padding: 10px 10px 15px;width: 370px">
              <div style="display: flex;align-items: center">
                <div style="background: red;height: 18px;width: 18px;border-radius: 3px;display: flex;align-items: center;justify-content: center;color: white;font-size: 11px">
                  错
                </div>
                <div style="margin-left: 5px;color: #a4a4a4;font-size: 12px">错别字检测</div>
              </div>
              <el-scrollbar max-height="180" style="margin-top: 10px;border-radius: 5px;position: relative;white-space: pre-wrap;font-size: 14px">
                {{wrongText}}
              </el-scrollbar>
            </div>
            <div style="display: flex;flex: 1;flex-direction: column;align-items: center;justify-content: flex-end">
              <div class="basic_button blue_button" @click="wrongExam" :class="{no_button: wrongStatus == 1}" style="width: 360px;height: 30px;border-radius: 2px;justify-content: center;color: white">开始检测</div>
            </div>
          </div>

<!--取名-->
          <div v-if="rightShow[1]" class="right_main" style="height: calc(100vh - 105px);display: flex;flex-direction: column">

            <div class="right_title_small" style="margin-top: 10px">位置</div>
            <div style="display: flex;margin-top: 10px">
              <template v-for="c in country">
                <div class="pick_item" :class="{pick_item_active: pickCountry == c}" @click="pickCountry = c">{{c}}</div>
              </template>
            </div>
            <div class="right_title_small" style="margin-top: 10px">性别</div>
            <div style="display: flex;margin-top: 10px">
              <template v-for="g in gender">
                <div class="pick_item" :class="{pick_item_active: pickGender == g}" @click="pickGender = g">{{g}}</div>
              </template>
            </div>

            <div class="right_title_small" style="margin-top: 10px">取名要求</div>
            <div style="margin-top: 10px;height: 100px;background: #fafafa;border-radius: 5px;position: relative;padding: 10px 10px 25px;width: 370px">
              <textarea class="no-style-textarea_general" style="width: 100%;height: 100px; font-size: 14px" v-model="pickComment" placeholder="选填，可输入一段具体要求，将为你取名灵感对应分类下的名字"/>
              <div style="position: absolute;right: 5px;bottom: 5px;font-size: 12px;color: #a4a4a4">
                请输入您的要求
              </div>
            </div>

            <div class="right_title_small" style="margin-top: 10px">AI生成</div>
            <div style="display: flex;flex-wrap: wrap;justify-content: space-between;margin-top: 5px">
              <template v-for="name in aiNames">
                <div class="name_item" @click="copyText(name)">{{name}}</div>
              </template>
            </div>
            <div style="display: flex;flex: 1;flex-direction: column;align-items: center;justify-content: flex-end">
              <div class="basic_button blue_button" :class="{no_button: pickStatus == 1}" style="width: 360px;height: 30px;border-radius: 2px;justify-content: center;color: white" @click="pickName">随机取名</div>
            </div>
          </div>

<!--润色-->
          <div v-if="rightShow[2]" class="right_main">
            <div class="right_title_small">选中内容</div>
            <el-scrollbar style="margin-top: 10px;height: 180px;background: #fafafa;border-radius: 5px;position: relative;padding: 10px 10px 25px;width: 370px">
              <div style="width: 100%;white-space: pre-wrap;font-size: 14px">{{selectText}}</div>
              <div style="position: absolute;right: 5px;bottom: 5px;font-size: 12px;color: #a4a4a4">
                请使用鼠标托选文本
              </div>
            </el-scrollbar>

            <div class="right_title_small" style="margin-top: 10px">润色要求</div>
            <div style="margin-top: 10px;height: 100px;background: #fafafa;border-radius: 5px;position: relative;padding: 10px 10px 25px;width: 370px">
              <textarea class="no-style-textarea_general" style="width: 100%;height: 100px; font-size: 14px" v-model="polishComment"/>
              <div style="position: absolute;right: 5px;bottom: 5px;font-size: 12px;color: #a4a4a4">
                请输入您的要求
              </div>
            </div>

            <div class="right_title_small" style="margin-top: 10px">AI生成</div>
            <div class="basic_button blue_button" style="margin-top: 10px" v-if="polishStatus == 0" @click="polishLaunch">开始生成</div>

            <div style="margin-top: 10px" class="right_ai" v-if="polishStatus == 1">
              <el-icon class="right_circle"><Refresh /></el-icon>
              <div style="font-size: 14px">AI正在生成中...</div>
              <div style="display: flex;flex: 1;justify-content: right;align-items: center">
                <div style="font-size: 13px;color: #a4a4a4" @click="writeCancel">停止生成</div>
                <div style="background: #fafafa;width: 18px;height: 18px;border-radius: 9px;display: flex;align-items: center;justify-content: center;cursor: pointer;margin-left: 3px">
                  <el-icon style="font-size: 12px;color: #a4a4a4"><Close /></el-icon>
                </div>
              </div>
            </div>

            <div style="margin-top: 10px;flex-direction: column;" class="right_ai" v-if="polishStatus == 2">
              <el-scrollbar style="width: 100%;height: 140px;font-size: 14px;white-space: pre-wrap">
                <div style="width: 100%;font-size: 14px;white-space: pre-wrap">
                  {{polishText}}
                </div>
              </el-scrollbar>
              <div style="margin-top: 15px;display: flex;align-items: center;width: 100%">
                <div class="basic_button blue_button" @click="polishReplace">替换</div>
                <div class="basic_button" style="margin-left: 10px" @click="polishCancel">取消</div>
              </div>
            </div>
          </div>


<!--写作-->
          <el-scrollbar v-if="rightShow[3]" class="right_main" style="overflow-y: auto;height: calc(100vh - 105px)">
            <div class="right_title_small">前文内容</div>
            <el-scrollbar style="margin-top: 10px;height: 90px;background: #fafafa;border-radius: 5px;position: relative;padding: 10px 10px 25px;width: 370px">
              <div style="width: 100%;white-space: pre-wrap;font-size: 14px">{{writerBeforeText != '' ? writerBeforeText : '无'}}</div>
              <div style="position: absolute;right: 5px;bottom: 5px;font-size: 12px;color: #a4a4a4">
                请使用鼠标选择位置
              </div>
            </el-scrollbar>

            <div class="right_title_small" style="margin-top: 10px">后文内容</div>
            <el-scrollbar style="margin-top: 10px;height: 90px;background: #fafafa;border-radius: 5px;position: relative;padding: 10px 10px;width: 370px">
              <div style="width: 100%;white-space: pre-wrap;font-size: 14px">{{writerBehindText != '' ? writerBehindText : '无'}}</div>
            </el-scrollbar>

            <div class="right_title_small" style="margin-top: 10px">写作要求</div>
            <div style="margin-top: 10px;height: 100px;background: #fafafa;border-radius: 5px;position: relative;padding: 10px 10px 25px;width: 370px">
              <textarea class="no-style-textarea_general" style="width: 100%;height: 90px; font-size: 14px" v-model="writeComment"/>
              <div style="position: absolute;right: 5px;bottom: 5px;font-size: 12px;color: #a4a4a4">
                请输入您的要求
              </div>
            </div>

            <div class="right_title_small"  style="margin-top: 10px;display: flex;align-items: center">
              本章人物
              <div style="display: flex;flex: 1;justify-content: right">
                <div class="basic_button blue_button" style="justify-content: center;" @click="writeRoleAdd">
                  添加
                </div>
              </div>
            </div>
            <div style="display: flex;flex-wrap: wrap;margin-top: 8px">
              <template v-for="(role,index) in writeRoleReal">
                <div class="submit_item">
                  <div>{{role.name}}</div>
                  <el-icon class="submit_icon" @click="writeRoleDelete(index)"><CircleCloseFilled /></el-icon>
                </div>
              </template>
            </div>

            <div class="right_title_small"  style="margin-top: 10px;display: flex;align-items: center">
              本章章纲
              <div style="display: flex;flex: 1;justify-content: right">
                <div class="basic_button blue_button" style="justify-content: center" @click="writeChapterAdd">
                  选择
                </div>
              </div>
            </div>

            <div style="display: flex;flex-wrap: wrap;margin-top: 8px" v-if="writeChapterReal.title != ''">
              <div class="submit_item">
                <div>{{writeChapterReal.title}}</div>
                <el-icon class="submit_icon" @click="writeChapterDelete()"><CircleCloseFilled /></el-icon>
              </div>
            </div>

            <div style="display: flex;flex-wrap: wrap;margin-top: 5px">
            </div>

            <div class="right_title_small" style="margin-top: 10px">AI生成</div>
            <div class="basic_button blue_button" style="margin-top: 10px" v-if="writeStatus == 0" @click="writeLaunch">开始生成</div>

            <div style="margin-top: 10px" class="right_ai" v-if="writeStatus == 1">
              <el-icon class="right_circle"><Refresh /></el-icon>
              <div style="font-size: 14px">AI正在生成中...</div>
              <div style="display: flex;flex: 1;justify-content: right;align-items: center">
                <div style="font-size: 13px;color: #a4a4a4">停止生成</div>
                <div style="background: #fafafa;width: 18px;height: 18px;border-radius: 9px;display: flex;align-items: center;justify-content: center;cursor: pointer;margin-left: 3px">
                  <el-icon style="font-size: 12px;color: #a4a4a4" @click="writeCancel"><Close /></el-icon>
                </div>
              </div>
            </div>

            <div style="margin-top: 10px;flex-direction: column;" class="right_ai" v-if="writeStatus == 2">
              <el-scrollbar style="width: 100%;height: 140px;">
                <div style="width: 100%;font-size: 14px;white-space: pre-wrap">
                  {{writeText}}
                </div>
              </el-scrollbar>
              <div style="margin-top: 15px;display: flex;align-items: center;width: 100%">
                <div class="basic_button blue_button" @click="writeInsert">插入</div>
                <div class="basic_button" style="margin-left: 10px" @click="writeCancel">取消</div>
              </div>
            </div>
          </el-scrollbar>

<!--大纲-->
          <div v-if="rightShow[4]" class="right_main" style="display: flex;padding: 0;margin: 0;height: 100%;position: relative">
            <div style="position: absolute;left: 200px;top: 14px">
              <div class="basic_button blue_button" @click="summaryRefresh(summaryIndex)">保存</div>
            </div>
            <div class="right_main_left">
              <div v-if="summaryIndex != 0">
                <div style="margin-bottom: 10px">
                  <textarea class="no-style-textarea_general" style="width: 239px;font-size: 18px" placeholder="请输入章纲标题" v-model="summaryTitle" />
                </div>
              </div>
              <div v-if="summaryIndex == 0">
                <div style="margin-bottom: 10px;font-size: 18px">
                  {{book}}
                </div>
              </div>
              <textarea class="no-style-textarea_general" v-model="summaryInput" style="width: 239px;height: calc(100vh - 200px);padding: 0 10px;margin-top: 5px;margin-left: -10px;font-size: 14px;letter-spacing: 1px"/>
              <div style="display: flex;justify-content: right;font-size: 13px">
                {{summaryInput.length}}字
              </div>
            </div>
            <div style="width: 1px;background: rgba(164, 164, 164, 0.3);"></div>
            <div class="right_main_right">
              <div style="font-size: 13px;color: rgba(0,0,0,0.7);display: flex">
                <div>目录</div>
                <div style="display: flex;justify-content: right;flex: 1;align-items: center">
                  <el-icon class="left_tip"><Delete /></el-icon>
                </div>
              </div>

              <div style="display: flex;margin-top: 8px;align-items: center;">
                <el-icon style="font-size: 18px"><FolderOpened /></el-icon>
                <div style="margin-left: 5px;width: 120px;overflow: hidden;font-size: 13px;white-space: nowrap;text-overflow: ellipsis">
                  总纲
                </div>
              </div>

              <div class="left_item" :class="{left_item_active: summaryIndex == 0}" @click="changeSummary(0)" style="margin-top: 5px">
                总纲
              </div>

              <div style="display: flex;margin-top: 8px;align-items: center;">
                <el-icon style="font-size: 18px"><FolderOpened /></el-icon>
                <div style="margin-left: 5px;width: 120px;overflow: hidden;font-size: 13px;white-space: nowrap;text-overflow: ellipsis">
                  章纲
                </div>
                <div style="display: flex;justify-content: right;flex: 1;align-items: center" @click="summaryAdd">
                  <el-icon class="left_tip"><Plus /></el-icon>
                </div>
              </div>

              <el-scrollbar style="height: calc(100vh - 220px)">
                <template v-for="(summary, index) in summaryInfo">
                  <div class="left_item" :class="{left_item_active: index + 1 == summaryIndex}" @click="changeSummary(index + 1)" style="margin-top: 5px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis">
                    {{summary.title != '' ? summary.title : '未命名章纲'}}
                  </div>
                </template>
              </el-scrollbar>
            </div>
          </div>

<!--人物-->
          <div v-if="rightShow[5]" class="right_main" style="display: flex;padding: 0;margin: 0;height: 100%">
            <div style="position: absolute;left: 200px;top: 14px">
              <div class="basic_button blue_button" @click="roleRefresh(roleIndex)">保存</div>
            </div>
            <div class="right_main_left">
              <div class="right_title_small">人物名字</div>
              <input class="input_input" v-model="roleInput.name" style="width: 239px;height: 30px;font-size: 14px;letter-spacing: 1px">
              <div class="right_title_small" style="margin-top: 10px">人物描述</div>
              <textarea class="no-style-textarea_general" v-model="roleInput.description" style="width: 239px;height: calc(100vh - 190px);padding: 0 10px;margin-top: 5px;margin-left: -10px;font-size: 14px;letter-spacing: 1px"/>

            </div>
            <div style="width: 1px;background: rgba(164, 164, 164, 0.3);"></div>
            <div class="right_main_right" style="margin-top: 30px">
              <div style="display: flex;margin-top: 8px;align-items: center;">
                <el-icon style="font-size: 18px"><FolderOpened /></el-icon>
                <div style="margin-left: 5px;width: 120px;overflow: hidden;font-size: 13px;white-space: nowrap;text-overflow: ellipsis">
                  角色库
                </div>
                <div style="display: flex;justify-content: right;flex: 1;align-items: center">
                  <el-icon class="left_tip"><Delete /></el-icon>
                  <el-icon class="left_tip" style="margin-left: 0" @click="roleAdd"><Plus /></el-icon>
                </div>
              </div>

              <template v-for="(role, index) in writerHelperDetail.characterList">
                <div class="left_item" :class="{left_item_active: roleIndex == index}" @click="changeRole(index)" style="margin-top: 2px">
                  {{role.name != '' ? role.name : '未命名角色'}}
                </div>
              </template>
            </div>
          </div>

        </div>

        <div  style="padding-top: 10px">
          <div class="right_item" :class="{right_item_active : rightShow[0]}" @click="chooseRight(0)">
            <el-icon style="font-size: 15px;margin-bottom: 4px"><CircleCheck /></el-icon>
            <div>纠错</div>
          </div>
          <div class="right_item" :class="{right_item_active : rightShow[1]}" @click="chooseRight(1)">
            <el-icon style="font-size: 15px;margin-bottom: 4px"><Coordinate /></el-icon>
            <div>取名</div>
          </div>
          <div class="right_item" :class="{right_item_active : rightShow[2]}" @click="chooseRight(2)">
            <el-icon style="font-size: 15px;margin-bottom: 4px"><MagicStick /></el-icon>
            <div>润色</div>
          </div>
          <div class="right_item" :class="{right_item_active : rightShow[3]}" @click="chooseRight(3)">
            <el-icon style="font-size: 15px;margin-bottom: 4px"><EditPen /></el-icon>
            <div>续写</div>
          </div>
          <div style="margin: 0 10px;height: 1px;background: rgba(164,164,164,0.2)"></div>
          <div class="right_item" :class="{right_item_active : rightShow[4]}" style="margin-top: 15px" @click="chooseRight(4)">
            <el-icon style="font-size: 15px;margin-bottom: 4px"><Tickets /></el-icon>
            <div>大纲</div>
          </div>
          <div class="right_item" :class="{right_item_active : rightShow[5]}" @click="chooseRight(5)">
            <el-icon style="font-size: 15px;margin-bottom: 4px"><User /></el-icon>
            <div>角色</div>
          </div>
        </div>
      </div>
    </div>

    <div
        v-if="isPopupVisible"
        class="context-menu"
    >
      <div style="color: #a4a4a4;font-size: 13px;margin-top: 8px;padding-left: 10px;padding-bottom: 5px;border-bottom: 1px solid rgba(0,0,0,0.1)">已选: {{selectText.length}}字</div>
      <div class="context-text" v-if="selectText.length != 0" @click="chooseRight(2)">
        <el-icon style="font-size: 15px;margin-right: 4px"><MagicStick /></el-icon>
        润色
      </div>
      <div class="context-text" v-if="selectText.length == 0" @click="chooseRight(3)">
        <el-icon style="font-size: 15px;margin-right: 4px"><EditPen /></el-icon>
        续写
      </div>
    </div>
  </div>

  <el-dialog v-model="publicShow" title="发布章节" width="900">
    <div style="display: flex;align-items: center;margin-top: -20px">
      <div style="font-size: 16px;color: black;width: 70px;">章节标题</div>
      <div style="margin-left: 10px;font-size: 15px">{{title}}</div>
    </div>
    <div style="display: flex;margin-top: 20px;align-items: center;justify-content: space-between">
      <div style="font-size: 16px;color: black;width: 70px">选择前文</div>
      <div style="display: flex;white-space: pre-wrap;overflow-y: auto;margin-left: 10px;font-size: 15px">
        <el-select
            v-model="beforeBook"
            value-key="chapterTitle"
            filterable
            clearable
            :disabled="!beforeShow"
            placeholder="请选择前置小说"
            style="width: 250px"
        >
          <el-option
              v-for="chapter in chapterInfo"
              :value="chapter"
              :label="chapter.chapterTitle"
              :key="chapter.chapterTitle"
          />
        </el-select>
      </div>
      <div class="basic_button blue_button" style="margin-left: 10px" @click="beforeNone" v-if="beforeShow">
        暂无
      </div>
      <div class="basic_button" style="margin-left: 10px" @click="beforeShow = true" v-if="!beforeShow">
        取消
      </div>
      <div style="font-size: 16px;color: black;width: 70px;margin-left: 40px">选择后文</div>
      <div style="display: flex;white-space: pre-wrap;overflow-y: auto;margin-left: 10px;font-size: 15px">
        <el-select
            v-model="behindBook"
            value-key="chapterTitle"
            filterable
            clearable
            :disabled="!behindShow"
            placeholder="请选择后置章节"
            style="width: 250px"
        >
          <el-option
              v-for="chapter in chapterInfo"
              :value="chapter"
              :label="chapter.chapterTitle"
              :key="chapter.chapterTitle"
          />
        </el-select>
      </div>
      <div class="basic_button blue_button" style="margin-left: 10px" @click="behindNone" v-if="behindShow">
        暂无
      </div>
      <div class="basic_button" style="margin-left: 10px" @click="behindShow = true" v-if="!behindShow">
        取消
      </div>
    </div>

    <div style="display: flex;margin-top: 20px">
      <div style="font-size: 16px;color: black;width: 70px">章节内容</div>
      <div style="display: flex;flex: 1;white-space: pre-wrap;max-height: 300px;overflow-y: auto;margin-left: 10px;font-size: 15px">
        {{content}}
      </div>
    </div>

    <div style="display: flex;justify-content: right;align-items: center;margin-top: 20px">
      <div class="basic_button blue_button" @click="publishChapter">确定</div>
      <div class="basic_button" style="margin-left: 10px;font-size: 12px;" @click="publicShow=false">取消</div>
    </div>
  </el-dialog>

  <el-dialog v-model="writerHelperOpenShow" title="选择写作助手" width="600">
    <div style="display: flex;align-items: center;margin-top: -20px">
      <div style="font-size: 16px;color: black">我的写作助手</div>
      <div style="display: flex;flex: 1;justify-content: right">
        <div class="basic_button blue_button" @click="writerHelperAddShow = true">新增写作助手</div>
      </div>
    </div>
    <div v-if="writerHelper.length == 0">
      <el-empty description="暂无写作助手" />
    </div>
    <div v-if="writerHelper.length != 0" style="margin-top: 10px">
      <el-table :data="writerHelper" style="width: 100%">
        <el-table-column prop="description" label="写作助手描述" width="400" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="chooseWriterHelper(scope.row.id)">
              选择
            </el-button>
            <el-button link type="success" size="small">编辑</el-button>
            <el-button link type="danger" size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>

  <el-dialog v-model="writerHelperAddShow" title="新增写作助手" width="800">
    <div style="display: flex;margin-top: -20px; align-items: center">
      <div style="font-size: 14px;color: black;margin-right: 10px">简单描述:</div>
      <el-input v-model="wt_description" style="width: 687px;height: 30px" placeholder="请输入简单描述" />
    </div>
    <div style="display: flex;margin-top: 15px">
      <div style="font-size: 14px;color: black;margin-right: 10px">背景描述:</div>
      <el-input v-model="backgroundDescription" style="width: 687px" type="textarea" :autosize="{ minRows: 5, maxRows: 8 }" placeholder="请输入背景描述" />
    </div>
    <div style="display: flex;margin-top: 15px">
      <div style="font-size: 14px;color: black;margin-right: 10px">大纲描述:</div>
      <el-input v-model="outlineDescription" style="width: 687px;" type="textarea" :autosize="{ minRows: 5, maxRows: 8 }" placeholder="请输入大纲描述" />
    </div>
    <div style="display: flex;justify-content: right;align-items: center;margin-top: 20px">
      <div class="basic_button blue_button" @click="addWriterHelper">确定</div>
      <div class="basic_button" style="margin-left: 10px;font-size: 12px;" @click="writerHelperAddShow=false">取消</div>
    </div>
  </el-dialog>

  <el-dialog v-model="writeRoleShow" title="添加角色" width="500">
    <div style="display: flex;margin-top: -20px;">
      <div style="font-size: 14px;color: black;margin-right: 10px">点击添加角色</div>
    </div>
    <div style="display: flex;margin-top: 10px;">
      <el-checkbox-group v-model="writeRole">
        <el-checkbox v-for="role in writerHelperDetail.characterList" :label="role.name" :value="role.name" :id="role.name">
          {{role.name}}
        </el-checkbox>
      </el-checkbox-group>
    </div>
    <div style="display: flex;justify-content: right;align-items: center;margin-top: 20px">
      <div class="basic_button blue_button" @click="writeRoleAddCertain">确定</div>
      <div class="basic_button" style="margin-left: 10px;font-size: 12px;" @click="writeRoleShow=false">取消</div>
    </div>
  </el-dialog>

  <el-dialog v-model="writeChapterShow" title="选择章纲" width="800">
    <div style="display: flex;margin-top: -20px;">
      <div style="font-size: 14px;color: black;margin-right: 10px">点击选择章纲</div>
    </div>
    <div style="display: flex;margin-top: 10px;">
      <el-radio-group v-model="writeChapter">
        <el-radio v-for="summary in summaryInfo" :label="summary.outlineId" :value="summary.outlineId" :id="summary.outlineId">
          {{summary.title}}
        </el-radio>
      </el-radio-group>
    </div>
    <div style="display: flex;justify-content: right;align-items: center;margin-top: 20px">
      <div class="basic_button blue_button" @click="writeChapterAddCertain">确定</div>
      <div class="basic_button" style="margin-left: 10px;font-size: 12px;" @click="writeChapterShow=false">取消</div>
    </div>
  </el-dialog>
</template>

<style scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.basic_button{
  background: rgba(0, 0, 0, 0.04);
  height: 25px;
  padding: 0 15px;
  border-radius: 12.5px;
  display: flex;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
}

.basic_button:hover{
  background: rgba(0, 0, 0, 0.08);
}

.blue_button{
  width: fit-content;
  font-size: 12px;
  background: linear-gradient(to right, #40a9ff, #1890ff);
  color: white;
}

.blue_button:hover{
  background: linear-gradient(to right, #69c0ff, #40a9ff);
}

.no_button{
  background: #a4a4a4;
  pointer-events: none;
  cursor: not-allowed;
}

.screen{
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #f0f0f2;
}

.screen_top{
  display: flex;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  height: 50px;
  padding: 0 15px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.screen_main{
  height: calc(100vh - 50px);
  display: flex;
  justify-content: space-between;
}

.main_left{
  position: relative;
  box-sizing: border-box;
  width: v-bind(width + 'px');
  background: white;
  transition: all 0.5s;
}

.main_left_main{
  margin: 15px;
  height: calc(100vh - 80px);
}

.main_left_open{
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 10px;
  height: 30px;
  background: white;
  top: calc(50vh - 40px);
  right: -10px;
  cursor: pointer;
  z-index: 1000;
  border-radius: 0 2px 2px 0;
  font-size: 11px;
  border-left: none;
  color: #a4a4a4;
}

.main_left_close{
  transform: rotate(180deg);
}

.main_core{
  position: relative;
  display: flex;
  flex: 1;
}

.main_core_none{
  position: absolute;
  width: 100%;
  height: 100%;
}

.main_right{
  display: flex;
  background: white;
}

.main_container{
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 200px;
}

.main_container::selection {
  background-color: #c6d6f1; /* 替换为你想要的颜色 */
  color: #c6d6f1;
}

.main_container_top{
  margin-top: 40px;
  width: 750px;
}

.main_container_main{
  width: 750px;
  margin-top: 30px;
}

.input_input{
  border: none;
  box-shadow:none;
  outline: none;
  /* 去除内边距 */
  padding: 0;
  /* 去除外边距 */
  margin: 0;
  width: 750px;
  height: 30px;
  font-size: v-bind(fontSize + 'px');
  background: rgba(0, 0, 0, 0);
  letter-spacing: 2px;
}

.input_input::placeholder{
  color: rgba(164, 164, 164, 0.8);
}

.no-style-textarea {
  width: 746px;
  height: 25px;
  /* 去除边框 */
  border: none;
  /* 去除内边距 */
  padding: 0;
  /* 去除外边距 */
  margin: 0;
  /* 去除背景色 */
  background: none;
  /* 去除文本框阴影 */
  box-shadow: none;
  /* 去除轮廓（当元素获得焦点时） */
  outline: none;
  /* 重置字体样式 */
  font-family: inherit;
  /* 去除滚动条（如果需要） */
  overflow: hidden;
  resize: none; /* 禁止调整大小 */
  line-height: 24px;
  letter-spacing: 1.5px;
  font-size: v-bind(fontSize - 8 + 'px');
  text-indent: 1.5em;
}

.no-style-textarea_general{
  border: none;
  /* 去除内边距 */
  padding: 0;
  /* 去除外边距 */
  margin: 0;
  /* 去除背景色 */
  background: none;
  /* 去除文本框阴影 */
  box-shadow: none;
  /* 去除轮廓（当元素获得焦点时） */
  outline: none;
  /* 重置字体样式 */
  font-family: inherit;
  /* 去除滚动条（如果需要） */
  resize: none; /* 禁止调整大小 */
}

.no-style-textarea::placeholder{
  color: rgba(164, 164, 164, 0.8);
}

.context-menu {
  position: fixed;
  border-radius: 5px;
  padding: 5px;
  width: 110px;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  top: v-bind(popupStyleTop + 'px');
  left: v-bind(popupStyleLeft + 'px');
  background: white;
}

.context-text{
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.8);
  border-radius: 3px;
  font-size: 13px;
  padding: 3px 0 3px 10px;
  margin: 5px 0;
  cursor: pointer;
}

.context-text:hover{
  background: rgba(0, 0, 0, 0.05);
}

/* top系列 */
.top_arrow{
  width: 30px;
  height: 30px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  cursor: pointer;
}

.top_arrow:hover{
  background: #f0f0f0;
}

.top_text{
  margin-left: 8px;
  color: black;
  font-size: 15px;
  cursor: pointer;
  letter-spacing: 1px;
}

.top_button{
  border: 1px solid #ccc;
  color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  font-size: 13px;
  border-radius: 3px;
}

.top_button:hover{
  background: #fafafa;
}

.top_update{
  font-size: 12px;
  margin-left: 10px;
  color: #a4a4a4;
}

.top_func{
  padding: 5px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  margin-left: 5px;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.7);
}

.top_func:hover{
  background: #fafafa;
}

/* left系列 */
.left_tip{
  margin-left: 5px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.8);
  cursor: pointer;
  padding: 3px;
}

.left_tip:hover{
  background: #f2f2f2;
}

.left_item{
  padding: 5px 0 5px 24px;
  display: flex;
  align-items: center;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.7);
  cursor: pointer;
  border-radius: 3px;
}

.left_item:hover{
  background: #fafafa;
}

.left_item_active{
  background: #c6d6f1; /* 替换为你想要的颜色 */
  font-weight: bolder;
}

.left_item_active:hover{
  background: #c6d6f1; /* 替换为你想要的颜色 */
  font-weight: bolder;
}

/* right系列 */
.right_item{
  width: 40px;
  box-sizing: border-box;
  padding: 5px 0;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 11px;
  color: #8c9196;
  cursor: pointer;
}

.right_item_active{
  border-left: 3px solid #096dd9;
  color: #096dd9;
}

.right_item:hover{
  background: #fafafa;
}

.right_extra{
  position: relative;
  width: 420px;
  border-right: 1px solid rgba(164, 164, 164, 0.3);
}

.right_cancel{
  position: absolute;
  right: 15px;
  top: 16px;
  font-size: 18px;
  cursor: pointer;
  z-index: 1000;
}

.right_cancel:hover{
  background: #fafafa;
}

.right_title{
  position: absolute;
  left: 15px;
  top: 15px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.8);
}

.right_title_small{
  font-size: 14px;
  color: #8c9196;
}

.right_main{
  margin-top: 40px;
  padding: 0 15px;
}

.right_ai{
  display: flex;
  align-items: center;
  border-radius: 15px;
  background: linear-gradient(to right, white, #e6f7ff);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px 15px;
}

.right_circle{
  color: #40a9ff;
  margin-right: 5px;
  animation: spin 2s linear infinite;
}

.right_main_left{
  margin-top: 40px;
  box-sizing: border-box;
  width: 269px;
  padding: 5px 15px;
}

.right_main_right{
  box-sizing: border-box;
  padding: 5px 10px;
  margin-top: 40px;
  width: 150px;
}

.submit_item{
  height: 25px;
  background: #f1f1f1;
  color: rgba(0, 0, 0, 0.6);
  padding: 0 15px;
  display: flex;
  align-items: center;
  font-size: 12px;
  margin-right: 10px;
  margin-bottom: 8px;
  border-radius: 12px;
}

.submit_icon{
  margin-left: 3px;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.2);
}

.submit_icon:hover{
  color: rgba(0, 0, 0, 0.4);
}

.pick_item{
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(164, 164, 164, 0.3);
  font-size: 13px;
  padding: 6px 18px;
  margin-right: 10px;
  cursor: pointer;
  border-radius: 3px;
  color: rgba(0, 0, 0, 0.8);
}

.pick_item_active{
  border: 1px solid #40a9ff;
  background: #fafafa;
}

.pick_item:hover{
  background: #fafafa;
  border: 1px solid rgba(164, 164, 164, 0.6);
}

.pick_item_active:hover{
  border: 1px solid #40a9ff;
  background: #fafafa;
}

.name_item{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: 50px;
  border-radius: 5px;
  font-size: 13px;
  cursor: pointer;
}

.name_item:hover{
  background: rgba(0, 0, 0, 0.05);
}

.no-style-textarea_general::-webkit-scrollbar {
  width: 7px; /* 滚动条宽度 */
}

.no-style-textarea_general::-webkit-scrollbar-track {
  background: white; /* 滚动条轨道颜色 */
}

.no-style-textarea_general::-webkit-scrollbar-thumb {
  background: #dddee0; /* 滚动条滑块颜色 */
  border-radius: 5px; /* 滚动条滑块圆角 */
}

.no-style-textarea_general::-webkit-scrollbar-thumb:hover {
  background: #c7c9cc; /* 滚动条滑块悬停颜色 */
}
</style>