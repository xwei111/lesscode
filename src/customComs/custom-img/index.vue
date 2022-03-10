<template>
  <img ref="customImg" :src="url" />
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { assetsUrl } from "@/consts";

export default defineComponent({
  props: {
    attr: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props: any) {
    const customImg = ref<any>();

    const url = computed(() =>
      props?.attr?.imgUrl?.indexOf("base64") > -1
        ? props?.attr?.imgUrl
        : `${assetsUrl}${props?.attr?.imgUrl}`
    );

    onMounted(() => {
      const {
        attr: {
          blur,
          brightness,
          contrast,
          grayscale,
          hueRotate,
          invert,
          opacity,
          saturate,
          sepia,
          dropShadow,
        },
      } = props;
      customImg.value.style.filter = `blur(${blur}px) brightness(${brightness}%) contrast(${contrast}%) grayscale(${grayscale}%) hue-rotate(${hueRotate}deg) invert(${invert}%) opacity(${opacity}%) saturate(${saturate}%) sepia(${sepia}%) drop-shadow(${dropShadow})`;
    });

    watch(
      [
        () => props.attr.blur,
        () => props.attr.brightness,
        () => props.attr.contrast,
        () => props.attr.grayscale,
        () => props.attr.hueRotate,
        () => props.attr.invert,
        () => props.attr.opacity,
        () => props.attr.saturate,
        () => props.attr.sepia,
        () => props.attr.dropShadow,
      ],
      ([
        blur,
        brightness,
        contrast,
        grayscale,
        hueRotate,
        invert,
        opacity,
        saturate,
        sepia,
        dropShadow,
      ]) => {
        customImg.value.style.filter = `blur(${blur}px) brightness(${brightness}%) contrast(${contrast}%) grayscale(${grayscale}%) hue-rotate(${hueRotate}deg) invert(${invert}%) opacity(${opacity}%) saturate(${saturate}%) sepia(${sepia}%) drop-shadow(${dropShadow})`;
      }
    );

    return {
      customImg,
      url,
    };
  },
});
</script>
