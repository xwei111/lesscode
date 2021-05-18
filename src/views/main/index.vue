<template>
  <div class="main">
    <Header @selectHandle="selectHandle" v-show="!store.state.isPreview" />
    <Edit />
    <List :height="wraperHeight" :visible="listVisible" />
    <Attr :height="wraperHeight" />
    <CustomMenu />
    <div
      class="pre-btn canclePreview"
      v-show="store.state.isPreview"
      @click="editHandle"
    >
      编辑
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import Header from "../header/index.vue";
import Edit from "../edit/index.vue";
import List from "../list/index.vue";
import Attr from "../attr/index.vue";
import CustomMenu from "@/components/customMenu/index.vue";
import useSize from "@/hooks/useSize";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import templates from "@/consts/templates";

export default defineComponent({
  name: "Main",
  components: {
    Header,
    Edit,
    List,
    CustomMenu,
    Attr,
  },
  setup() {
    const { wraperHeight } = useSize();
    const store = useStore();
    const {
      currentRoute: {
        value: {
          params: { id },
        },
      },
    } = useRouter();

    const getCurrentCanvas = (id: string): any => {
      const currentCanvas = templates?.find((item: any) => item?.id === id);
      return currentCanvas;
    };

    const setCurrentCanvas = (currentCanvas: any) => {
      const { state } = store;
      state.width = currentCanvas?.width ?? 375;
      state.height = currentCanvas?.height ?? 667;
      state.components = currentCanvas?.components ?? [];
      state.canvasBg = currentCanvas?.canvasBg ?? "#fff";
    };

    id && setCurrentCanvas(getCurrentCanvas(id as string));

    const state = reactive<{
      listVisible: boolean;
    }>({
      listVisible: true,
    });

    const selectHandle = (listVisible: boolean): void => {
      state.listVisible = listVisible;
    };

    const editHandle = (): void => {
      store.commit("set_isPreview", false);
    };

    return {
      store,
      editHandle,
      ...toRefs(state),
      selectHandle,
      wraperHeight,
    };
  },
});
</script>
<style lang="scss" scoped>
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.pre-btn {
  position: fixed;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  background: rgba(64, 158, 255, 0.9);
  z-index: 9;
  color: #fff;
  border-radius: 50%;
  font-size: 12px;
  cursor: pointer;
  right: 10px;
  font-size: 12px;
}
.canclePreview {
  top: 10px;
}
.createImg {
  top: 80px;
}
</style>
