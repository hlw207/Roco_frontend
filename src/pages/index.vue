<template>
  <div id="app">
    <div
        class="text-container"
        @contextmenu.prevent="showPopup"
        @click="hidePopup"
        @mouseup="updateSelection"
    >
      {{ text }}
    </div>
    <div v-if="isPopupVisible" class="popup" :style="popupStyle">
      <p>You selected: {{ selectedText }}</p>
      <button @click="closePopup">Close</button>
    </div>
  </div>
</template>

<script>
import {request} from "@/util/request.ts";

export default {
  data() {
    return {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      isPopupVisible: false,
      selectedText: "",
      popupStyle: {
        top: "0",
        left: "0",
      },
    };
  },
  methods: {
    updateSelection(event) {
      const selectedText = window.getSelection().toString().trim();
      if (selectedText) {
        this.selectedText = selectedText;
      }
    },
    showPopup(event) {
      // 防止默认的右键菜单出现
      event.preventDefault();
      // 显示弹窗，并设置位置
      this.isPopupVisible = true;
      this.popupStyle.top = `${event.clientY}px`;
      this.popupStyle.left = `${event.clientX}px`;
    },
    hidePopup() {
      // 点击文本容器时，如果已经选中文本，不关闭弹窗
      if (window.getSelection().toString().trim() !== "") return;
      this.isPopupVisible = false;
    },
    closePopup() {
      this.isPopupVisible = false;
    },
  },
  mounted() {
    request({
      url: '/genie/attribute',
      method: 'GET',
      params:{
        attribute: '冰'
      }
    }).then((res)=>{
      console.log(res)
    })
  }
};
</script>

<style>
.text-container {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 20px;
  user-select: text;
  cursor: context-menu; /* 提示用户可以右键操作 */
}

.popup {
  position: absolute;
  background: white;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}
</style>