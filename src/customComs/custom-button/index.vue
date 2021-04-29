<template>
  <el-button
    :size="attr?.size"
    :type="attr?.type"
    :plain="attr?.plain"
    :round="attr?.round"
    :circle="attr?.circle"
    :loading="attr?.loading"
    :disabled="attr?.disabled"
    :icon="attr?.icon"
    :autofocus="attr?.autofocus"
    @click="() => onClick.fn(data)"
  >
    {{ attr?.text }}
  </el-button>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "customButton",
  props: {
    attr: {
      type: Object,
      default: () => ({}),
    },
    events: {
      type: Object,
      default: () => ({}),
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    return {
      ...props.events,
    };
  },
});
</script>
