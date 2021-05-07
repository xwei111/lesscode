<template>
  <p>
    {{ attr?.text }}
  </p>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "customText",
  props: {
    attr: {
      type: Object,
      default: () => ({}),
    },
  },
});
</script>
