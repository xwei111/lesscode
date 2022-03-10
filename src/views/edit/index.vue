<template>
  <div id="edit-wraper">
    <div :class="!state.isPreview ? 'edit-box' : 'edit-preview'">
      <div
        id="edit"
        class="edit"
        :style="`
          width: ${state?.width}px; 
          height: ${state?.height}px;
          transform: scale(${state?.percent});
          background: ${state?.canvasBg};
          ${
            !state.isPreview
              ? `top: ${state.top}px; left: ${state.left}px; position: relative; `
              : 'margin: 0 auto;'
          };
        `"
        @dragover="dragoverHandle"
        @drop="dropHandle"
        @click="clickHandle"
        @mousedown="mousedown"
      >
        <ElWraper />
        <Lines />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import ElWraper from "@/components/elWraper/index.vue";
import Lines from "@/components/lines/index.vue";
import { list } from "@/consts/comsList";
import { useStore } from "vuex";
import { listTypes } from "@/types";
import { v4 as uuidv4 } from "uuid";
import * as _ from "lodash";
import useAction from "@/hooks/useAction";
// import useCheckLogin from "@/hooks/useCheckLogin";

export default defineComponent({
  components: {
    ElWraper,
    Lines,
  },
  setup() {
    const { state, commit } = useStore();
    const { addAction } = useAction();
    // const { checkLogin } = useCheckLogin();
    const dragoverHandle = (e: any): void => {
      e.preventDefault();
    };
    // const top = ref<number>(0);
    // const left = ref<number>(0);
    // 鼠标放下添加组件信息
    const dropHandle = (e: any): void => {
      // if (!checkLogin()) return;
      e.preventDefault();
      const { dataTransfer } = e;
      const key: string = dataTransfer.getData("key");
      const component: listTypes | undefined = list.find(
        (item: any) => item.key === key
      );
      if (component) {
        let components: Array<listTypes> = state.components;
        const cpCom: any = _.cloneDeep(component);
        cpCom.uuid = `${cpCom?.key}--${uuidv4()}`;
        if (!cpCom.style) {
          cpCom.style = {};
        }
        cpCom.style.top = e.offsetY;
        cpCom.style.left = e.offsetX;
        // 收集拖拽组件信息
        components.push(cpCom);
        // 记录快照
        addAction();
      }
    };

    const clickHandle = (): void => {
      commit("set_uuid", "");
      commit("set_attrVisible", false);
    };

    const mousedown = (e: any): void => {
      if (state.isPreview) return;
      const startY = Number(e.clientY);
      const startX = Number(e.clientX);
      const t: number = state.top;
      const l: number = state.left;
      const move = (ev: any): void => {
        const currentY = Number(ev.clientY);
        const currentX = Number(ev.clientX);
        state.top = t + currentY - startY;
        state.left = l + currentX - startX;
      };
      const up = (): void => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };
      document.addEventListener("mouseup", up);
      document.addEventListener("mousemove", move);
    };

    return {
      mousedown,
      dragoverHandle,
      dropHandle,
      clickHandle,
      state,
    };
  },
});
</script>

<style lang="scss" scoped>
#edit-wraper {
  width: 100%;
  height: 100%;
  background: #f7f7f7;
  overflow-y: auto;
  overflow-x: hidden;
  .edit-box {
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translate(-50%, 0);
  }
  .edit-preview {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .edit {
    .edit-el-mark {
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
}
</style>
