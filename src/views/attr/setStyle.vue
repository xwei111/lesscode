<template>
  <ul>
    <li v-for="item in Object.keys(style ?? {})" :key="item">
      <p class="style-label">{{ styleList?.[item]?.label }}:</p>
      <!-- input -->
      <el-input
        style="width: 100%"
        v-if="styleList?.[item]?.type === 'input'"
        v-model="style[item]"
        @change="addAction"
      />
      <!-- inputNumber -->
      <el-input-number
        style="width: 100%"
        v-if="styleList?.[item]?.type === 'inputNumber'"
        v-model="style[item]"
        :label="styleList?.[item].label"
        @change="addAction"
      ></el-input-number>
      <!-- colorPicker -->
      <el-color-picker
        v-if="styleList?.[item]?.type === 'colorPicker'"
        v-model="style[item]"
        @change="addAction"
      ></el-color-picker>
      <!-- select -->
      <el-select
        style="width: 100%"
        v-if="styleList?.[item]?.type === 'select'"
        v-model="style[item]"
        @change="addAction"
      >
        <el-option
          v-for="item in styleList?.[item]?.enum"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <!-- 提示信息 -->
      <p class="style-warning" v-if="styleList?.[item]?.warning">
        {{ styleList?.[item]?.warning }}
      </p>
      <p class="style-info" v-if="styleList?.[item]?.info">
        {{ styleList?.[item]?.info }}
      </p>
    </li>
  </ul>
</template>
<script lang="ts">
import { defineComponent, watch, reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { listTypes } from "@/types";
import useAction from "@/hooks/useAction";
import customConsts from "@/consts/customConsts";

export default defineComponent({
  setup() {
    const { addAction } = useAction();
    const store = useStore();
    const { state } = store;
    const data = reactive<{
      style: {
        [key: string]: any;
      };
      styleList: {
        [key: string]: any;
      };
    }>({
      style: {},
      styleList: {},
    });

    watch(
      [() => state.attrVisible, () => state.uuid, () => state.actionIndex],
      ([visible, uuid]) => {
        if (visible) {
          const { components } = state;
          const component: listTypes | any =
            components.find((item: listTypes) => item.uuid === uuid) ?? {};
          const { key, style } = component;
          if (key) {
            // 动态引入部署服务器导致资源找不到，我人傻了
            // import(`@/consts/customConsts/${key}/stl`).then(
            //   (res: any): void => {
            //     data.style = style;
            //     data.styleList = res?.default;
            //   }
            // );
            data.style = style;
            data.styleList = customConsts?.[key]?.stl;
          } else {
            data.style = {};
            data.styleList = {};
          }
        }
      }
    );

    return {
      addAction,
      ...toRefs(data),
    };
  },
});
</script>
<style lang="scss" scoped>
.style-label {
  padding: 15px 0;
}
.style-warning {
  padding-top: 10px;
  font-size: 12px;
  color: #e6a23c;
}
.style-info {
  padding-top: 10px;
  font-size: 12px;
  color: #409eff;
}
</style>
