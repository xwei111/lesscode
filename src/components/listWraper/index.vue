<template>
  <div
    class="listWraper"
    :style="`
      width: ${
        isMobile ? (dataSource?.width / baseWidth) * 100 : dataSource?.width
      }${unit};
      height: ${
        isMobile ? (dataSource?.height / baseWidth) * 100 : dataSource?.height
      }${unit};
      transform: scale(${dataSource?.percent});
      background: ${dataSource?.canvasBg};
    `"
  >
    <div
      class="el-wraper"
      v-for="(item, index) in dataSource?.components ?? []"
      :key="index"
      :style="`${getWraperStl(item?.style, isMobile)}z-index: ${index + 1};`"
    >
      <component
        style="position: static"
        :data="item"
        :id="item?.uuid"
        :is="item?.template"
        :attr="item?.attr"
        :style="`${getStl(item?.style, isMobile)}`"
        :events="item?.events"
      ></component>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { getStl, getWraperStl } from "@/utils/index";
import { useStore } from "vuex";
import { baseWidth } from "@/consts";

export default defineComponent({
  props: {
    dataSource: {
      type: Object,
      default: () => ({}),
    },
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  setup(props: any) {
    const { state } = useStore();

    const unit = computed(() => (props.isMobile ? "vw" : "px"));

    return {
      state,
      getStl,
      getWraperStl,
      baseWidth,
      unit,
    };
  },
});
</script>
<style lang="scss" scoped>
.listWraper {
  position: relative;
  top: 0;
  left: 0;
}
.el-wraper {
  position: absolute;
  width: auto;
  height: auto;
}
</style>
