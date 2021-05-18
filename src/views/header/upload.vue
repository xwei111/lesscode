<template>
  <Upload @onChange="onChange">
    <el-button size="medium" type="primary" style="margin: 0 15px"
      >添加图片</el-button
    >
  </Upload>
</template>
<script lang="ts">
import Upload from "@/components/upload/index.vue";
import { defineComponent, ref } from "vue";
import { list } from "@/consts/comsList";
import { v4 as uuidv4 } from "uuid";
import { listTypes } from "@/types";
import * as _ from "lodash";
import { useStore } from "vuex";

import useAction from "@/hooks/useAction";
export default defineComponent({
  components: {
    Upload,
  },
  setup() {
    const store = useStore();

    const { addAction } = useAction();
    const key = ref<string>("img");

    const onChange = (file: any): void => {
      let components: Array<listTypes> = store.state.components;
      const component: listTypes | undefined = list.find(
        (item: any) => item.key === key.value
      );
      if (component) {
        const cpCom: any = _.cloneDeep(component);
        cpCom.uuid = `${key.value}--${uuidv4()}`;
        const render = new FileReader();
        render.onload = (e) => {
          // 图片转base64，应对后续本地图片保存后无法正常显示问题，另一个方案是将本地图片上传至服务器
          cpCom.attr.imgUrl = e.target?.result;
          cpCom.style.top = 0;
          cpCom.style.left = 0;
          components.push(cpCom);
          addAction();
        };
        render.readAsDataURL(file?.raw);
      }
    };

    return {
      onChange,
    };
  },
});
</script>
