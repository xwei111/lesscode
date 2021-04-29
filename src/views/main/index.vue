<template>
  <div class="main">
    <Header @selectHandle="selectHandle" v-show="!store.state.isPreview" />
    <Edit />
    <List :height="wraperHeight" :visible="listVisible" />
    <Attr :height="wraperHeight" />
    <CustomMenu />
    <div
      class="canclePreview"
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

    const state = reactive<{
      listVisible: boolean;
    }>({
      listVisible: false,
    });

    const selectHandle = (listVisible: boolean): void => {
      state.listVisible = listVisible;
    };

    const editHandle = () => {
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
.canclePreview {
  position: fixed;
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  background: rgba(0, 0, 0, 0.5);
  top: 10px;
  right: 10px;
  z-index: 9;
  color: #fff;
  border-radius: 50%;
  font-size: 12px;
  cursor: pointer;
}
</style>
