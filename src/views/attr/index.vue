<template>
  <transition name="bounce">
    <div
      class="attr"
      :style="`height: ${height - 50}px`"
      v-show="state.attrVisible"
    >
      <el-tabs class="attr-content" v-model="activeName">
        <el-tab-pane label="属性" name="attribute">
          <el-scrollbar class="attr-scroll">
            <SetAttribute />
          </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane label="样式" name="style">
          <el-scrollbar class="attr-scroll">
            <SetStyle />
          </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane label="事件" name="event">
          <el-scrollbar class="attr-scroll">
            <SetEvent />
          </el-scrollbar>
        </el-tab-pane>
      </el-tabs>
    </div>
  </transition>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { useStore } from "vuex";
import SetAttribute from "./setAttribute.vue";
import SetStyle from "./setStyle.vue";
import SetEvent from "./setEvent.vue";

export default defineComponent({
  props: {
    height: Number,
  },
  components: {
    SetAttribute,
    SetStyle,
    SetEvent,
  },
  setup() {
    const { state } = useStore();
    const data = reactive({
      activeName: "attribute",
    });

    return {
      state,
      ...toRefs(data),
    };
  },
});
</script>
<style lang="scss" scoped>
.attr {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: absolute;
  z-index: 9;
  top: 60px;
  right: 10px;
  width: 300px;
  height: 800px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0px 10px 0px #999;
  border-radius: 4px;
  .attr-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    :deep() .el-tabs__nav-wrap {
      padding-left: 20px;
    }
    :deep() .el-tabs__content {
      flex: 1;
      display: flex;
      .el-tab-pane {
        flex: 1;
        padding-bottom: 20px;
        .attr-scroll {
          flex: 1;
          padding: 0 20px;
        }
      }
    }
  }
}
</style>
