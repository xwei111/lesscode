<template>
  <el-upload
    :action="`/lesscode/public/upload`"
    :show-file-list="false"
    :headers="{
      token: state?.userInfo?.token ?? '',
    }"
    :on-success="successHandle"
    :on-error="errorHandle"
  >
    <slot></slot>
  </el-upload>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";

export default defineComponent({
  setup(props: any, { emit }: any) {
    const { state } = useStore();

    const successHandle = (res: any) => {
      const { code, data, message } = res;
      if (code === 200) {
        emit("successHandle", data?.url ?? "");
      } else {
        ElMessage.error(message);
      }
    };

    const errorHandle = (error: any) => {
      console.log("error----", error);
    };

    return {
      state,
      successHandle,
      errorHandle,
    };
  },
});
</script>
