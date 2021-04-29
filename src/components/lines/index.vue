<template>
  <ul class="line">
    <li
      v-for="item in state.linesModule.lines"
      :key="item"
      :class="['line-item', item.includes('x') ? 'line-item-x' : 'line-item-y']"
      :style="`${getStl(state.linesModule.linesPos[item])}; display: ${
        state.linesModule.linesStatus[item] ? 'block' : 'none'
      }`"
    ></li>
  </ul>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { getStl } from "@/utils/index";

export default defineComponent({
  setup() {
    const { state } = useStore();

    return {
      state,
      getStl,
    };
  },
});
</script>
<style lang="scss" scoped>
.line-item {
  position: absolute;
  z-index: 3;
  background: #409eff;
  &.line-item-x {
    width: 100%;
    height: 1px;
    left: 0;
  }
  &.line-item-y {
    width: 1px;
    height: 100%;
    top: 0;
  }
}
</style>
