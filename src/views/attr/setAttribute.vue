<template>
  <ul>
    <p class="attr-label">唯一标识：</p>
    <p class="attr-uuid">{{ state.uuid }}</p>
    <li v-for="item in Object.keys(attr)" :key="item">
      <p class="attr-label">{{ attrList?.[item]?.label }}:</p>
      <el-input
        style="width: 100%"
        v-if="attrList?.[item]?.type === 'input'"
        v-model="attr[item]"
        @change="addAction"
      />
      <el-select
        style="width: 100%"
        v-if="attrList[item]?.type === 'select'"
        v-model="attr[item]"
        @change="addAction"
      >
        <el-option
          v-for="item in attrList[item]?.enum"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <p class="attr-warning" v-if="attrList?.[item]?.warning">
        {{ attrList?.[item]?.warning }}
      </p>
    </li>
  </ul>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from "vue";
import { useStore } from "vuex";
import { listTypes } from "@/types";
import useAction from "@/hooks/useAction";

export default defineComponent({
  setup() {
    const { addAction } = useAction();
    const store = useStore();
    const { state } = store;
    const data = reactive({
      attr: {},
      attrList: {},
    });

    // 分别attrVisible、uuid和actionIndex的变化更新数据
    watch(
      [() => state.attrVisible, () => state.uuid, () => state.actionIndex],
      ([visible, uuid]) => {
        if (visible) {
          const { components } = state;
          const component: listTypes | any =
            components.find((item: listTypes) => item.uuid === uuid) ?? {};
          const { key, attr } = component;
          if (key) {
            import(`@/consts/customConsts/${key}/attr`).then(
              (res: any): void => {
                data.attr = attr;
                data.attrList = res?.default;
              }
            );
          } else {
            data.attr = {};
            data.attrList = {};
          }
        }
      }
    );

    return {
      state,
      addAction,
      ...toRefs(data),
    };
  },
});
</script>
<style lang="scss" scoped>
.attr-label {
  padding: 15px 0;
}
.attr-uuid {
  font-size: 12px;
}
.attr-warning {
  padding-top: 10px;
  font-size: 12px;
  color: #e6a23c;
}
</style>
