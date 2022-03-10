<template>
  <div class="header" v-show="!state.isPreview">
    <div class="header-config">
      <el-button size="medium" @click="selectHandle">{{ text }}</el-button>
      <div class="header-upload">
        <Upload />
        <div
          v-if="
            !state?.userInfo ||
            !state?.userInfo?.user ||
            !state?.userInfo?.token
          "
          class="header-upload-mark"
          @click="checkLogin"
        ></div>
      </div>
      <el-button size="medium" type="primary" @click="createHandle">
        生成海报
      </el-button>
      <Step />
      <el-button size="medium" @click="previewHandle">预览</el-button>
      <el-button size="medium" class="header-com-select" @click="keepHandle">
        保存
      </el-button>
      <Cvs />
    </div>
    <User />
  </div>
  <Modal :visible="visible" :title="title" @cancleHandle="cancleHandle" />
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { useStore } from "vuex";
// import useCheckLogin from "@/hooks/useCheckLogin";
import useModal from "@/hooks/useModal";
import Upload from "./upload.vue";
import createImgHandle from "@/utils/createImg";
import User from "../home/user.vue";
import Modal from "./modal.vue";
import Step from "./step.vue";
import Cvs from "./cvs.vue";

export default defineComponent({
  components: {
    Upload,
    User,
    Modal,
    Step,
    Cvs,
  },
  emits: ["selectHandle"],
  setup(props: any, { emit }) {
    const { state, commit } = useStore();
    // const { checkLogin } = useCheckLogin();
    const { visible, title, cancleHandle, openHandle } = useModal({
      title: "保存",
    });
    const data = reactive<{
      text: string;
    }>({
      text: "隐藏组件",
    });

    const selectHandle = (): void => {
      data.text = data.text === "选择组件" ? "隐藏组件" : "选择组件";
      emit("selectHandle", data.text === "选择组件" ? false : true);
    };

    const previewHandle = (): void => {
      // if (!checkLogin()) return;
      commit("set_isPreview", true);
      commit("set_attrVisible", false);
      commit("set_showCustomMenu", false);
      commit("set_uuid", "");
      data.text = "选择组件";
      emit("selectHandle", false);
    };

    const keepHandle = (): void => {
      // if (!checkLogin()) return;
      openHandle();
    };

    const createHandle = (): void => {
      // if (!checkLogin()) return;
      state.left = 0;
      state.top = 0;
      setTimeout(() => createImgHandle(state.width, state.height), 0);
    };

    return {
      // checkLogin,
      selectHandle,
      previewHandle,
      keepHandle,
      createHandle,
      visible,
      title,
      cancleHandle,
      openHandle,
      ...toRefs(data),
      state,
    };
  },
});
</script>

<style lang="scss" scoped>
.header-config {
  display: flex;
  align-items: center;
  .header-com-select {
    margin-right: 10px;
  }
}
.header-upload {
  position: relative;
  .header-upload-mark {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba($color: #000000, $alpha: 0);
    top: 0;
    left: 0;
    cursor: pointer;
  }
}
</style>
