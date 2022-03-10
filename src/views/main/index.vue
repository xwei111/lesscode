<template>
  <div class="main">
    <Header @selectHandle="selectHandle" />
    <Edit />
    <List :height="wraperHeight" :visible="listVisible" />
    <Attr :height="wraperHeight" />
    <CustomMenu />
    <div
      class="pre-btn canclePreview"
      v-show="state.isPreview"
      @click="editHandle"
    >
      编辑
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, reactive, toRefs } from "vue";
import Header from "../header/index.vue";
import Edit from "../edit/index.vue";
import List from "../list/index.vue";
import Attr from "../attr/index.vue";
import CustomMenu from "@/components/customMenu/index.vue";
import useSize from "@/hooks/useSize";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import useTemList from "@/hooks/useTemList";
import useAction from "@/hooks/useAction";

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
    const { state, commit } = useStore();
    const { addAction } = useAction();
    const {
      currentRoute: {
        value: {
          params: { type, id },
        },
      },
    } = useRouter();

    provide("type", type);
    provide("id", id);

    const data = reactive<{
      listVisible: boolean;
    }>({
      listVisible: true,
    });

    const { _getTemLists, _getWorkList } = useTemList((dataSource): void => {
      setCurrentCanvas(dataSource?.[0] ?? {});
    });

    const setCurrentCanvas = (currentCanvas: any): void => {
      state.width = currentCanvas?.width ?? 375;
      state.height = currentCanvas?.height ?? 667;
      state.components = currentCanvas?.components ?? [];
      state.canvasBg = currentCanvas?.canvasBg ?? "#fff";
      addAction();
    };

    id &&
      type &&
      type !== "mine" &&
      _getTemLists({ type: type as string, id: id as string });
    id &&
      type &&
      type === "mine" &&
      _getWorkList({ userId: state?.userInfo?.userId, id: id as string });

    const selectHandle = (listVisible: boolean): void => {
      data.listVisible = listVisible;
    };

    const editHandle = (): void => {
      commit("set_isPreview", false);
    };

    return {
      state,
      editHandle,
      selectHandle,
      wraperHeight,
      ...toRefs(data),
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
