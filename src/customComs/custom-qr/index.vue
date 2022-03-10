<template>
  <vue-qr
    qid="qrid"
    :correctLevel="2"
    :margin="attr?.margin"
    :text="attr?.text"
    :colorDark="attr?.colorDark"
    :size="attr?.size"
    :backgroundColor="attr?.backgroundColor"
    :logoSrc="url"
    :logoMargin="attr?.logoMargin"
    :logoScale="attr?.logoScale"
  >
  </vue-qr>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import vueQr from "vue-qr/src/packages/vue-qr.vue";
import { assetsUrl } from "@/consts";

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
  setup(props: any) {
    const url = computed(() =>
      props?.attr?.imgUrl
        ? props?.attr?.imgUrl?.indexOf("base64") > -1
          ? props?.attr?.imgUrl
          : `${assetsUrl}${props?.attr?.imgUrl}`
        : ""
    );

    return {
      url,
    };
  },
});
</script>
