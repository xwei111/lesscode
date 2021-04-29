<template>
  <ul
    class="custom-menu"
    v-show="state.showCustomMenu"
    :style="`left: ${state.mousePos.left}px; top: ${state.mousePos.top}px;`"
  >
    <li
      v-for="item in customMenus"
      :key="item.key"
      @click="() => selectHandle(item.key)"
    >
      {{ item.label }}
    </li>
  </ul>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { customMenus } from "@/consts";
import useCustomMenu from "@/hooks/useCustomMenu";

export default defineComponent({
  setup() {
    const { state, selectHandle } = useCustomMenu();

    return {
      state,
      customMenus,
      selectHandle,
    };
  },
});
</script>

<style lang="scss" scoped>
.custom-menu {
  position: absolute;
  background: #fff;
  border-radius: 4px;
  font-size: 12px;
  overflow: hidden;
  box-shadow: 0 0 10px 0 #ccc;
  z-index: 9999999;
  li {
    width: 60px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    &:hover {
      background: #f1f1f1;
    }
  }
}
</style>
