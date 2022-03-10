<template>
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
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const { state, commit } = useStore();
    const data = reactive<{
      percent: number;
      width: number;
      height: number;
      canvasBg: string;
    }>({
      percent: 1,
      width: state.width,
      height: state.height,
      canvasBg: state.canvasBg,
    });

    watch(
      () => data.width,
      (val: number): void => {
        state.width = val;
      }
    );

    watch(
      () => data.height,
      (val: number): void => {
        state.height = val;
      }
    );

    watch(
      () => state.width,
      (val: number): void => {
        data.width = val;
      }
    );

    watch(
      () => state.height,
      (val: number): void => {
        data.height = val;
      }
    );

    const onChange = (val: string): void => {
      state.canvasBg = val;
    };

    const inputHandle = (val: number): void => {
      commit("set_percent", val);
    };

    return {
      onChange,
      inputHandle,
      ...toRefs(data),
    };
  },
});
</script>
<style lang="scss" scoped>
.header-canvas-item {
  display: flex;
  align-items: center;
  .header-slider {
    width: 140px;
  }
}
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
</style>
