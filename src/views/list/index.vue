<template>
  <transition name="bounce">
    <div class="list" :style="`height: ${height - 50}px`" v-show="visible">
      <el-scrollbar class="list-scroll">
        <ul class="list-items" @dragstart="dragStartHandle">
          <li
            v-for="item in list"
            :key="item.key"
            :data-key="item.key"
            draggable="true"
          >
            <div class="list-item-box">
              <svg class="icon svg-icon list-icon" aria-hidden="true">
                <use :xlink:href="`#${item.icon}`"></use>
              </svg>
              {{ item.title }}
            </div>
          </li>
        </ul>
      </el-scrollbar>
    </div>
  </transition>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from "vue";
import { list } from "@/consts/comsList";
import { useStore } from "vuex";

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    height: Number,
  },
  setup(props: any) {
    const { commit } = useStore();
    const state = reactive<{
      visible: boolean;
    }>({
      visible: props.visible,
    });
    // 触发dragstart事件，并将组件信息记录于dataTransfer
    const dragStartHandle = (e: any): void => {
      const {
        target: {
          dataset: { key },
        },
        dataTransfer,
      } = e;
      dataTransfer.setData("key", key);
      commit("set_attrVisible", false);
      commit("set_uuid", false);
      commit("set_showCustomMenu", false);
    };

    watch(
      () => props.visible,
      () => {
        state.visible = props.visible;
      }
    );

    return {
      ...toRefs(state),
      list,
      dragStartHandle,
    };
  },
});
</script>

<style lang="scss" scoped>
.list {
  position: absolute;
  z-index: 9;
  top: 60px;
  left: 10px;
  width: 70px;
  height: 800px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0px 10px 0px #999;
  border-radius: 4px;
  .list-scroll {
    width: 100%;
    height: 100%;
    .list-items {
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      li {
        width: 100%;
        box-sizing: border-box;
        cursor: move;
        .list-item-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding-top: 20px;
          .list-icon {
            margin-bottom: 10px;
          }
        }
      }
    }
  }
}
</style>
