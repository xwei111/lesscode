<template>
  <el-upload
    action=""
    :on-change="onChange"
    :show-file-list="false"
    :auto-upload="false"
  >
    <slot></slot>
  </el-upload>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup(props: any, { emit }: any) {
    const onChange = (file: any): void => {
      emit("onChange", file);
    };

    return {
      onChange,
    };
  },
});
</script>
