<template>
  <ul class="templates-list">
    <li @click="() => toEditHandle()" v-show="currentTab === 'mine'">
      <i class="template-empty el-icon-plus"></i>
    </li>
    <li
      v-for="(item, index) in dataSource"
      :key="index"
      @click="() => toEditHandle(item?.id)"
    >
      <img :src="item?.imgUrl" />
    </li>
    <u></u>
    <u></u>
    <u></u>
    <u></u>
    <u></u>
    <u></u>
    <u></u>
    <u></u>
    <u></u>
    <u></u>
  </ul>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    currentTab: String,
    dataSource: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const toEditHandle = (id: string): void => {
      window.open(id ? `#/main/${id}` : `#/main`);
    };

    return {
      toEditHandle,
    };
  },
});
</script>

<style lang="scss" scoped>
.templates-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  li {
    width: 10vw;
    height: 15vw;
    border: 1px solid #eee;
    border-radius: 4px;
    box-sizing: border-box;
    margin: 0 10px 20px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .template-empty {
      font-size: 30px;
      color: #ccc;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  u {
    display: inline-block;
    width: 10vw;
    margin: 0 10px 0 10px;
  }
}
</style>
