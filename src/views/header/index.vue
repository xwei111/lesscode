<template>
  <div class="header">
    <div class="header-config">
      <el-button size="medium" @click="selectHandle">{{ text }}</el-button>
      <Upload />
      <el-button size="medium" type="primary" @click="createHandle"
        >生成海报</el-button
      >
      <el-button size="medium" @click="backHandle">后退</el-button>
      <el-button size="medium" @click="forwardHandle">前进</el-button>
      <el-tooltip effect="dark" content="清空会移除所有数据和快照">
        <el-button size="medium" @click="clearHandle">清空</el-button>
      </el-tooltip>
      <el-button size="medium" @click="previewHandle">预览</el-button>
      <el-button size="medium" class="header-com-select" @click="keepHandle"
        >保存</el-button
      >
      <div class="header-canvas-item">
        <span class="header-title header-title-size">尺寸:</span>
        <el-input
          size="medium"
          v-model="width"
          placeholder="宽"
          style="width: 70px"
        ></el-input>
        <span style="margin: 0 10px">*</span>
        <el-input
          size="medium"
          v-model="height"
          placeholder="高"
          style="width: 70px; margin-right: 10px"
        ></el-input>
      </div>
      <div class="header-canvas-item">
        <span class="header-title header-title-size-middle">背景色:</span>
        <el-color-picker
          size="medium"
          style="margin-right: 10px"
          v-model="canvasBg"
          @change="onChange"
        ></el-color-picker>
      </div>
      <div class="header-canvas-item">
        <span class="header-title header-title-size">比例:</span>
        <el-slider
          class="header-slider"
          v-model="percent"
          :min="0.1"
          :max="2"
          :step="0.1"
          @input="inputHandle"
        ></el-slider>
      </div>
    </div>
    <div></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from "vue";
import { useStore } from "vuex";
import useAction from "@/hooks/useAction";
import Upload from "./upload.vue";
import createImgHandle from "@/utils/createImg";

export default defineComponent({
  components: {
    Upload,
  },
  setup(props: any, { emit }) {
    const store = useStore();
    const { backHandle, forwardHandle, clearHandle } = useAction();

    const state = reactive<{
      text: string;
      percent: number;
      width: number;
      height: number;
      canvasBg: string;
    }>({
      text: "隐藏组件",
      percent: 1,
      width: store.state.width,
      height: store.state.height,
      canvasBg: store.state.canvasBg,
    });

    watch(
      () => state.width,
      (val: number): void => {
        store.state.width = val;
      }
    );

    watch(
      () => state.height,
      (val: number): void => {
        store.state.height = val;
      }
    );

    const selectHandle = (): void => {
      state.text = state.text === "选择组件" ? "隐藏组件" : "选择组件";
      emit("selectHandle", state.text === "选择组件" ? false : true);
    };

    const inputHandle = (val: number): void => {
      store.commit("set_percent", val);
    };

    const previewHandle = (): void => {
      console.log("画布数据:", store.state.components);
      store.commit("set_isPreview", true);
      store.commit("set_attrVisible", false);
      store.commit("set_showCustomMenu", false);
      store.commit("set_uuid", "");
      state.text = "选择组件";
      emit("selectHandle", false);
    };

    const keepHandle = (): void => {
      alert("待接口完善");
    };

    const onChange = (val: string): void => {
      store.state.canvasBg = val;
    };

    const createHandle = () => {
      store.state.left = 0;
      store.state.top = 0;
      setTimeout(
        () => createImgHandle(store.state.width, store.state.height),
        0
      );
    };

    return {
      onChange,
      selectHandle,
      inputHandle,
      backHandle,
      forwardHandle,
      clearHandle,
      previewHandle,
      keepHandle,
      createHandle,
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped>
.header-config {
  display: flex;
  align-items: center;
  .header-title {
    margin-right: 10px;
    display: inline-block;
  }
  .header-title-size {
    width: 32px;
  }
  .header-title-size-middle {
    width: 48px;
  }
  .header-com-select {
    margin-right: 10px;
  }
  .header-canvas-item {
    display: flex;
    align-items: center;
    .header-slider {
      width: 140px;
    }
  }
}
</style>
