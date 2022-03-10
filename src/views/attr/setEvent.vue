<template>
  <ul>
    <p class="event-info">交互在预览模式下生效</p>
    <li v-for="item in Object.keys(events ?? {})" :key="item">
      <el-collapse v-model="activeNames" @change="handleChange" accordion>
        <el-collapse-item :title="events?.[item]?.label" :name="item">
          <div
            class="event-item"
            v-for="el in events?.[item]?.relationEl"
            :key="el"
          >
            <div v-for="attr in Object.keys(el)" :key="attr">
              <p class="event-item-uuid" v-if="attr === 'uuid'">
                {{ el?.[attr] }}
              </p>
              <div
                class="event-item-uuid"
                v-if="attr !== 'attrList' && attr !== 'uuid'"
              >
                <p class="attr-label">{{ el?.attrList?.[attr]?.label }}:</p>

                <el-select
                  style="width: 100%"
                  v-if="el?.attrList[attr]?.type === 'select'"
                  v-model="el[attr]"
                  @change="addAction"
                >
                  <el-option
                    v-for="em in el?.attrList[attr]?.enum"
                    :key="em.value"
                    :label="em.label"
                    :value="em.value"
                  >
                  </el-option>
                </el-select>
                <el-input
                  style="width: 100%"
                  v-if="el?.attrList[attr]?.type === 'input'"
                  v-model="el[attr]"
                  @change="addAction"
                />
              </div>
            </div>
            <div class="event-item-add" @click="() => addAttrHandle(el.uuid)">
              添加影响的属性+
            </div>
          </div>
          <p type="text" class="event-addEl" @click="addElHandle">
            添加关联元素+
          </p>
        </el-collapse-item>
      </el-collapse>
    </li>
  </ul>
  <Modal ref="modalRef" :eventType="eventType" />
  <AttrModal ref="attrModalRef" :eventType="eventType" :attrUuid="attrUuid" />
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs, watch } from "vue";
import { useStore } from "vuex";
import { listTypes } from "@/types";
import Modal from "./coms/modal.vue";
import AttrModal from "./coms/atttrModal.vue";
import useAction from "@/hooks/useAction";

export default defineComponent({
  components: {
    Modal,
    AttrModal,
  },
  setup() {
    const { addAction } = useAction();
    const { state } = useStore();
    const data = reactive<{
      events: {
        [key: string]: any;
      };
      activeNames: string;
      eventType: string;
      attrUuid: string;
    }>({
      events: {},
      activeNames: "",
      eventType: "",
      attrUuid: "",
    });
    const modalRef = ref<any>();
    const attrModalRef = ref<any>();
    watch(
      [
        () => state.attrVisible,
        () => state.uuid,
        () => state.actionIndex
      ],
      ([visible, uuid]) => {
        if (visible) {
          const { components } = state;
          const component: listTypes | any =
            components.find((item: listTypes) => item.uuid === uuid) ?? {};
          data.events = component?.events;
        }
      }
    );

    const handleChange = (val: string): void => {
      data.eventType = val;
    };

    const addElHandle = (): void => {
      modalRef.value.visible = true;
    };

    const addAttrHandle = (attrUuid: string): void => {
      attrModalRef.value.visible = true;
      data.attrUuid = attrUuid;
    };

    return {
      addAction,
      addElHandle,
      addAttrHandle,
      handleChange,
      modalRef,
      attrModalRef,
      ...toRefs(data),
    };
  },
});
</script>
<style lang="scss" scoped>
.event-info {
  font-size: 12px;
  color: #f56c6c;
  margin-bottom: 15px;
}
.event-item {
  border: 1px solid #ccc;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 10px;
  width: 218px;
  .event-item-uuid {
    width: 198px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 700;
    margin-right: 3px;
    margin-bottom: 10px;
  }
  .event-item-add {
    color: #409eff;
    cursor: pointer;
    text-align: center;
  }
}
.event-addEl {
  color: #409eff;
  cursor: pointer;
  text-align: center;
}
</style>
