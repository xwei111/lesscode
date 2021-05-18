<template>
  <vue-qr
    qid="qrid"
    :correctLevel="2"
    :margin="attr?.margin"
    :text="attr?.text"
    :colorDark="attr?.colorDark"
    :size="attr?.size"
    :backgroundColor="attr?.backgroundColor"
    :logoSrc="attr?.logoSrc"
    :logoMargin="attr?.logoMargin"
    :logoScale="attr?.logoScale"
  >
  </vue-qr>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import vueQr from "vue-qr/src/packages/vue-qr.vue";

export default defineComponent({
  components: {
    vueQr,
  },
  props: {
    attr: {
      type: Object,
      default: () => ({}),
    },
  },
});
</script>
