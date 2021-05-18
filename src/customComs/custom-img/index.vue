<template>
  <img ref="customImg" :src="attr?.imgUrl" />
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";

export default defineComponent({
  props: {
    attr: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props: any) {
    const customImg = ref<any>();

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
    };
  },
});
</script>
