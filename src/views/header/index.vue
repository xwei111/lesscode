<template>
  <div class="header">
    <div class="header-config">
      <el-button size="mini" @click="selectHandle">{{ text }}</el-button>
      <el-button @click="backHandle">后退</el-button>
      <el-button @click="forwardHandle">前进</el-button>
      <el-tooltip effect="dark" content="清空会移除所有数据和快照">
        <el-button @click="clearHandle">清空</el-button>
      </el-tooltip>
      <el-button @click="previewHandle">预览</el-button>
      <el-button class="header-com-select" @click="keepHandle">保存</el-button>
      <div class="header-canvas-item">
        <span class="header-title header-title-size">画布尺寸:</span>
        <el-input
          v-model="width"
          placeholder="宽"
          style="width: 100px"
        ></el-input>
        <span style="margin: 0 10px">*</span>
        <el-input
          v-model="height"
          placeholder="高"
          style="width: 100px; margin-right: 10px"
        ></el-input>
      </div>
      <div class="header-canvas-item">
        <span class="header-title">画布比例:</span>
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
    <div>
      <!-- <el-button type="text">隐藏</el-button> -->
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from "vue";
import { useStore } from "vuex";
import useAction from "@/hooks/useAction";

export default defineComponent({
  setup(props: any, { emit }) {
    const store = useStore();
    const { backHandle, forwardHandle, clearHandle } = useAction();

    const state = reactive<{
      text: string;
      percent: number;
      width: number;
      height: number;
    }>({
      text: "选择组件",
      percent: 1,
      width: store.state.width,
      height: store.state.height,
    });

    watch(
      () => state.width,
      (val: number) => {
        store.state.width = val;
      }
    );

    watch(
      () => state.height,
      (val: number) => {
        store.state.height = val;
      }
    );

    const selectHandle = (): void => {
      state.text = state.text === "选择组件" ? "隐藏组件" : "选择组件";
      emit("selectHandle", state.text === "选择组件" ? false : true);
    };

    const inputHandle = (val: number) => {
      store.commit("set_percent", val);
    };

    const previewHandle = () => {
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

    return {
      selectHandle,
      inputHandle,
      backHandle,
      forwardHandle,
      clearHandle,
      previewHandle,
      keepHandle,
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  background: #fff;
  box-shadow: 0 5px 10px -5px #ccc;
  margin-bottom: 10px;
  padding: 0 40px;
  box-sizing: border-box;
  font-size: 12px;
  .header-config {
    display: flex;
    .header-title {
      margin-right: 10px;
      display: inline-block;
    }
    .header-title-size {
      width: 52px;
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
}
</style>
