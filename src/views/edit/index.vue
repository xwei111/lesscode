<template>
  <div id="edit-wraper" :style="`transform: scale(${store.state.percent})`">
    <div
      class="edit"
      :style="`width: ${store.state.width}px; height: ${store.state.height}px; left: ${left}px; top: ${top}px`"
      @dragover="dragoverHandle"
      @drop="dropHandle"
      @click="clickHandle"
      @mousedown="mousedown"
    >
      <ElWraper />
      <Lines />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import ElWraper from "@/components/elWraper/index.vue";
import Lines from "@/components/lines/index.vue";
import { list } from "@/consts/comsList";
import { useStore } from "vuex";
import { listTypes } from "@/types";
import { v4 as uuidv4 } from "uuid";
import * as _ from "lodash";
import useAction from "@/hooks/useAction";

export default defineComponent({
  components: {
    ElWraper,
    Lines,
  },
  setup() {
    const store = useStore();
    const { addAction } = useAction();
    const dragoverHandle = (e: any): void => {
      e.preventDefault();
    };
    const top = ref(0);
    const left = ref(0);
    // 鼠标放下添加组件信息
    const dropHandle = (e: any): void => {
      e.preventDefault();
      const { dataTransfer } = e;
      const key: string = dataTransfer.getData("key");
      const component: listTypes | undefined = list.find(
        (item: any) => item.key === key
      );
      if (component) {
        let components: Array<listTypes> = _.cloneDeep(store.state.components);
        const cpCom: any = _.cloneDeep(component);
        cpCom.uuid = `${cpCom?.key}--${uuidv4()}`;
        if (!cpCom.style) {
          cpCom.style = {};
        }
        cpCom.style.top = e.offsetY;
        cpCom.style.left = e.offsetX;
        components.push(cpCom);
        store.commit("set_components", components);
        addAction();
      }
    };

    const clickHandle = (): void => {
      store.commit("set_uuid", "");
      store.commit("set_attrVisible", false);
    };

    const mousedown = (e: any) => {
      const startY = Number(e.clientY);
      const startX = Number(e.clientX);
      const t = top.value;
      const l = left.value;
      const move = (ev: any) => {
        const currentY = Number(ev.clientY);
        const currentX = Number(ev.clientX);
        top.value = t + currentY - startY;
        left.value = l + currentX - startX;
      };
      const up = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };
      document.addEventListener("mouseup", up);
      document.addEventListener("mousemove", move);
    };

    return {
      top,
      left,
      mousedown,
      dragoverHandle,
      dropHandle,
      clickHandle,
      store,
    };
  },
});
</script>

<style lang="scss" scoped>
#edit-wraper {
  flex: 1;
  display: flex;
  align-content: center;
  justify-content: center;
  background: #f7f7f7;
  overflow: hidden;
  .edit {
    position: relative;
    background: #fff;
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
