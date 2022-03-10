<template>
  <el-button size="medium" @click="backHandle">后退</el-button>
  <el-button size="medium" @click="forwardHandle">前进</el-button>
  <el-tooltip effect="dark" content="清空会移除所有数据和快照">
    <el-button size="medium" @click="clearHandle">清空</el-button>
  </el-tooltip>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import useAction from "@/hooks/useAction";

export default defineComponent({
  setup() {
    return {
      ...useAction(),
    };
  },
});
</script>
