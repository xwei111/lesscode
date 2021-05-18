<template>
  <ul>
    <p class="attr-label">唯一标识：</p>
    <p class="attr-uuid">{{ state.uuid }}</p>
    <li v-for="item in Object.keys(attr ?? {})" :key="item">
      <p class="attr-label">{{ attrList?.[item]?.label }}:</p>
      <!-- input -->
      <el-input
        style="width: 100%"
        v-if="attrList?.[item]?.type === 'input'"
        v-model="attr[item]"
        @change="addAction"
      />
      <!-- select -->
      <el-select
        style="width: 100%"
        v-if="attrList?.[item]?.type === 'select'"
        v-model="attr[item]"
        @change="addAction"
      >
        <el-option
          v-for="item in attrList?.[item]?.enum"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <!-- upload -->
      <Upload
        v-if="attrList?.[item]?.type === 'upload'"
        @click="() => selectHandle(item)"
        @onChange="onChange"
      >
        <div class="attr-upload">
          <img
            v-show="attr?.[item]"
            class="attr-upload-img"
            :src="attr?.[item]"
          />
          <div class="attr-upload-mark">
            <i class="el-icon-plus"></i>
          </div>
        </div>
      </Upload>
      <!-- slider -->
      <el-slider
        style="padding: 0 15px"
        v-if="attrList?.[item]?.type === 'slider'"
        v-model="attr[item]"
        :max="1000"
        :step="10"
      >
      </el-slider>
      <!-- inputNumber -->
      <el-input-number
        style="width: 100%"
        v-if="attrList?.[item]?.type === 'inputNumber'"
        v-model="attr[item]"
        :label="attrList?.[item].label"
        @change="addAction"
        :step="attrList?.[item]?.step ? attrList?.[item]?.step : 1"
      ></el-input-number>
      <!-- colorPicker -->
      <el-color-picker
        v-if="attrList?.[item]?.type === 'colorPicker'"
        v-model="attr[item]"
        @change="addAction"
      ></el-color-picker>
      <!-- 提示信息 -->
      <p class="attr-warning" v-if="attrList?.[item]?.warning">
        {{ attrList?.[item]?.warning }}
      </p>
      <p class="attr-info" v-if="attrList?.[item]?.info">
        {{ attrList?.[item]?.info }}
      </p>
    </li>
  </ul>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from "vue";
import Upload from "@/components/upload/index.vue";
import { useStore } from "vuex";
import { listTypes } from "@/types";
import useAction from "@/hooks/useAction";
import customConsts from "@/consts/customConsts";

export default defineComponent({
  components: {
    Upload,
  },
  setup() {
    const { addAction } = useAction();
    const store = useStore();
    const { state } = store;
    const data = reactive<{
      attr: {
        [key: string]: any;
      };
      attrList: {
        [key: string]: any;
      };
      currentAttrKey: string;
    }>({
      attr: {},
      attrList: {},
      currentAttrKey: "",
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

    const selectHandle = (key: string): void => {
      data.currentAttrKey = key;
    };

    const onChange = (file: any): void => {
      const { components, uuid } = state;
      const component: listTypes | any =
        components.find((item: listTypes) => item.uuid === uuid) ?? {};
      component.attr[data.currentAttrKey] = URL.createObjectURL(file?.raw);
      addAction();
    };

    return {
      state,
      addAction,
      selectHandle,
      onChange,
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
.attr-info {
  padding-top: 10px;
  font-size: 12px;
  color: #409eff;
}
.attr-upload {
  width: 120px;
  max-height: 200px;
  min-height: 30px;
  position: relative;
  .attr-upload-img {
    width: 100%;
    height: 100%;
  }
  .attr-upload-mark {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    background: rgba($color: #000000, $alpha: 0.3);
    font-size: 30px;
    color: #fff;
  }
}
</style>
