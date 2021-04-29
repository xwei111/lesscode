<template>
  <el-dialog title="选择属性" v-model="visible" :width="600">
    <p class="events-modal-label">添加影响的属性：</p>
    <el-select
      style="width: 100%"
      filterable
      v-model="selectVal"
      placeholder="添加影响的属性："
    >
      <el-option
        v-for="item in Object.keys(attr)"
        :key="item"
        :label="attrList?.[item]?.label"
        :value="item"
      >
      </el-option>
    </el-select>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="sureHandle">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs, watch } from "vue";
import { useStore } from "vuex";
import { listTypes } from "@/types";
import { ElMessage } from "element-plus";
import customConsts from "@/consts/customConsts";

export default defineComponent({
  props: {
    eventType: {
      type: String,
      default: "",
    },
    attrUuid: {
      type: String,
      default: "",
    },
  },
  setup(props: any) {
    const { state } = useStore();
    const visible = ref(false);
    const selectVal = ref();
    const data = reactive({
      attr: {},
      attrList: {},
    });

    watch(
      [() => state.attrVisible, () => state.uuid, () => state.actionIndex],
      ([visible, uuid]) => {
        if (visible) {
          const { components } = state;
          const component: listTypes | any =
            components.find((item: listTypes) => item.uuid === uuid) ?? {};
          const { key, attr } = component;
          if (key) {
            // 动态引入部署服务器导致资源找不到，我人傻了
            // import(`@/consts/customConsts/${key}/attr`).then(
            //   (res: any): void => {
            //     data.attr = attr;
            //     data.attrList = res?.default;
            //   }
            // );
            data.attr = attr;
            data.attrList = customConsts?.[key]?.attr;
          } else {
            data.attr = {};
            data.attrList = {};
          }
        }
      }
    );

    watch(
      () => visible.value,
      () => {
        selectVal.value = undefined;
      }
    );

    const sureHandle = () => {
      if (!selectVal.value) {
        ElMessage.info("请选择元素");
        return;
      }
      const { components, uuid } = state;
      const { events } =
        components.find((item: any) => item.uuid === uuid) ?? {};
      const relationEl = events?.[props.eventType]?.relationEl;
      const curAttr = relationEl?.find(
        (item: any) => item.uuid === props.attrUuid
      );
      if (Object.prototype.hasOwnProperty.call(curAttr, selectVal.value)) {
        ElMessage.info("该属性已存在");
        return;
      }
      const { attr } =
        components.find((item: any) => item.uuid === props.attrUuid) ?? {};
      curAttr[selectVal.value] = attr[selectVal.value];
      curAttr.attrList = data.attrList;

      visible.value = false;
    };

    return {
      selectVal,
      sureHandle,
      visible,
      ...toRefs(data),
    };
  },
});
</script>
<style lang="scss" scoped>
.events-modal-label {
  font-size: 12px;
  margin-bottom: 15px;
}
</style>
