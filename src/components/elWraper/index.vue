<template>
  <div @mousedown.stop="mousedown" @contextmenu.prevent="contextmenu">
    <div
      class="el-wraper"
      v-for="(item, index) in state.components"
      :key="item.uuid"
      :style="`${getWraperStl(item.style)}z-index: ${index + 1};`"
    >
      <component
        style="position: static"
        :data="item"
        :id="item.uuid"
        :is="item.template"
        :attr="item.attr"
        :style="`${getStl(item.style)}`"
        :events="item.events"
      ></component>
      <div
        v-show="!state.isPreview"
        class="el-wraper-mark"
        :data-uuid="item.uuid"
        @click.stop="() => clickHandle(item.uuid)"
      ></div>
      <Border v-show="state.uuid === item.uuid" :data-uuid="item.uuid" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { customMenus } from "@/consts";
import { getStl, getWraperStl } from "@/utils/index";
import Border from "./border.vue";
import useAction from "@/hooks/useAction";

export default defineComponent({
  components: {
    Border,
  },
  setup() {
    const { state, commit } = useStore();
    const { addAction } = useAction();
    const isMove = ref<boolean>(false);
    // 鼠标按下记录鼠标位置
    const mousedown = (e: any): void => {
      if (state.isPreview) return;
      const {
        target: {
          dataset: { uuid },
        },
      } = e;
      const currentEl =
        state.components.find((item: any) => item.uuid === uuid) ?? {};
      const { style } = currentEl;
      const { top, left } = style ?? {};
      if (top === undefined || left === undefined) return;
      const startY = Number(e.clientY);
      const startX = Number(e.clientX);
      // 记录uuid
      commit("set_uuid", uuid);
      // 鼠标移动
      const move = (ev: any) => {
        isMove.value = true;
        const currentY = Number(ev.clientY);
        const currentX = Number(ev.clientX);
        // 画布放大缩小时会影响移动，需要计算上放大缩小比例
        const currentTop = top + (currentY - startY) / state.percent;
        const currentLeft = left + (currentX - startX) / state.percent;
        currentEl.style.top = currentTop;
        currentEl.style.left = currentLeft;
        commit("move", { currentTop, currentLeft, uuid });
      };
      // 鼠标抬起
      const up = () => {
        commit("stop");
        // 元素有移动留存快照留存
        isMove.value && addAction();
        isMove.value = false;
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    };
    // 自定义右键菜单
    const contextmenu = (e: any): void => {
      let top: number, left: number;
      const {
        target: {
          dataset: { uuid },
        },
        clientY,
        clientX,
      } = e;
      const { clientHeight, clientWidth }: any = document.getElementById("app");
      top = Number(clientY);
      left = Number(clientX);
      // 左侧不足以展示菜单
      if (clientWidth - clientX < 60) {
        left = clientX - 60;
      }
      // 底部惨淡不足以展示菜单
      if (clientHeight - clientY < customMenus.length * 36) {
        top = clientY - customMenus.length * 36;
      }
      commit("set_uuid", uuid);
      commit("set_mousePos", { top, left });
      commit("set_showCustomMenu", true);
    };
    // 选择组件
    const clickHandle = (uuid: string): void => {
      commit("set_uuid", uuid);
      // 属性面板
      commit("set_attrVisible", true);
      commit("set_showCustomMenu", false);
    };

    return {
      getStl,
      getWraperStl,
      state,
      mousedown,
      contextmenu,
      clickHandle,
    };
  },
});
</script>

<style lang="scss" scoped>
.el-wraper {
  position: absolute;
  width: auto;
  height: auto;
  .el-wraper-mark {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0);
    z-index: 2;
    top: 0;
    left: 0;
    cursor: pointer;
  }
}
</style>
