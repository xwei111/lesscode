<template>
  <ul class="point">
    <li class="point-item" v-for="item in pointList" :key="item"></li>
  </ul>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  setup() {
    const state = reactive<{
      pointList: string[];
    }>({
      pointList: ["t", "r", "b", "l"],
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>
<style lang="scss" scoped>
.point {
  position: absolute;
  top: -1px;
  left: -1px;
  width: 100%;
  height: 100%;
  border: 1px dashed #409eff;
}
// .point-item {
//   position: absolute;
//   width: 4px;
//   height: 4px;
//   background: rgba(0, 0, 0, 0);
//   border: 1px solid #409EFF;
//   border-radius: 50%;
//   box-sizing: border-box;
// }
// .point-item:nth-of-type(1) {
//   top: -2px;
//   left: 50%;
//   margin-left: -2px;
// }
// .point-item:nth-of-type(2) {
//   right: -2px;
//   top: 50%;
//   margin-top: -2px;
// }
// .point-item:nth-of-type(3) {
//   bottom: -2px;
//   left: 50%;
//   margin-left: -2px;
// }
// .point-item:nth-of-type(4) {
//   left: -2px;
//   top: 50%;
//   margin-top: -2px;
// }
</style>
