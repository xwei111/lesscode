<template>
  <el-dialog title="选择元素" v-model="visible" :width="600">
    <p class="events-modal-label">请选择要关联的元素：</p>
    <el-select
      style="width: 100%"
      filterable
      v-model="selectVal"
      placeholder="请选择要关联的元素："
    >
      <el-option
        v-for="item in components"
        :key="item.uuid"
        :label="item.uuid"
        :value="item.uuid"
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
import { defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";

export default defineComponent({
  props: {
    eventType: {
      type: String,
      default: "",
    },
  },
  setup(props: any) {
    const { state } = useStore();
    const visible = ref(false);
    const components = ref([]);
    const selectVal = ref();

    watch(
      () => visible.value,
      () => {
        components.value = state.components;
        selectVal.value = undefined;
      }
    );

    const sureHandle = (): void => {
      if (!selectVal.value) {
        ElMessage.info("请选择关联元素");
        return;
      }
      const { components, uuid } = state;
      const { events } =
        components.find((item: any) => item.uuid === uuid) ?? {};
      const isRepeat = events?.[props.eventType]?.relationEl?.some(
        (item: any) => item.uuid === selectVal.value
      );
      if (isRepeat) {
        ElMessage.info("该元素已关联");
        return;
      }
      events?.[props.eventType]?.relationEl.push({
        uuid: selectVal.value,
      });

      visible.value = false;
    };

    return {
      visible,
      components,
      selectVal,
      sureHandle,
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
