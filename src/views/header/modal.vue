<template>
  <el-dialog
    :title="title"
    v-model="dialogVisible"
    width="500px"
    :before-close="closeHandle"
  >
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      :label-position="'right'"
      label-width="100px"
    >
      <el-form-item label="是否新项目" prop="project">
        <el-select
          v-model="form.project"
          placeholder="请选择是否新项目"
          style="width: 300px"
        >
          <el-option label="否" :value="1"></el-option>
          <el-option label="是" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目种类" prop="type">
        <el-select
          v-model="form.type"
          placeholder="请选择项目种类"
          style="width: 300px"
        >
          <el-option label="海报" :value="'poster'"></el-option>
          <el-option label="web" :value="'pc'"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目" prop="_id" v-if="form.project === 1">
        <el-select
          v-model="form._id"
          placeholder="请选择项目"
          style="width: 300px"
        >
          <el-option
            v-for="(item, index) in nameOptions"
            :key="index"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目" prop="name" v-if="form.project === 2">
        <el-input
          v-model="form.name"
          placeholder="请输入项目名称"
          style="width: 300px"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeHandle">取 消</el-button>
        <el-button type="primary" @click="sureHandle">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent, inject, reactive, ref, toRefs, watch } from "vue";
import useTemList from "@/hooks/useTemList";
import { useStore } from "vuex";
import { createWork, updateWork } from "@/apis/user";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

export default defineComponent({
  props: {
    visible: Boolean,
    title: String,
  },
  emits: ["cancleHandle"],
  setup(props: any, { emit }: any) {
    const { state } = useStore();
    const router = useRouter();
    const formRef = ref();
    const data = reactive<{
      dialogVisible: boolean;
      form: {
        project: number;
        type: string;
        name?: string;
        _id?: string;
      };
      rules: any;
      nameOptions: {
        name?: string;
        _id?: string;
        [key: string]: any;
      };
      type: string | undefined;
      id: string | undefined;
    }>({
      dialogVisible: false,
      form: {
        project: 1,
        type: "poster",
        name: "",
        _id: "",
      },
      rules: {
        project: [
          {
            required: true,
            message: "请选择是否新项目",
            trigger: ["blur", "change"],
          },
        ],
        type: [
          {
            required: true,
            message: "请选择项目种类",
            trigger: ["blur", "change"],
          },
        ],
        name: [
          {
            required: true,
            message: "请输入项目名称",
            trigger: ["blur", "change"],
          },
        ],
        _id: [
          {
            required: true,
            message: "请选择项目名称",
            trigger: ["blur", "change"],
          },
        ],
      },
      nameOptions: [],
      type: inject("type"),
      id: inject("id"),
    });

    const { _getWorkList } = useTemList((dataSource): void => {
      data.nameOptions = dataSource ?? [];
    });
    // 初始化获取作品
    _getWorkList({ userId: state?.userInfo?.userId });

    const _setFrom = (params: {
      project: number;
      type: string;
      name?: string;
      _id?: string;
    }): void => {
      data.form = params;
    };
    // 新作品保存为作者作品后路由跳转携带作者信息hash值后，更新type并重新获取作者作品数据
    router.beforeEach((to): void => {
      const {
        params: { type, id },
      } = to;
      data.type = type as string;
      data.id = id as string;
      _getWorkList({ userId: state?.userInfo?.userId });
    });

    watch(
      () => props.visible,
      (value: boolean) => {
        if (value) {
          data.type === "mine" &&
            _setFrom({
              project: 1,
              type: "poster",
              _id: data.id as string,
              name: "",
            });
          data.type !== "mine" &&
            _setFrom({ project: 2, type: "poster", name: "", _id: "" });
        } else {
          formRef?.value?.resetFields();
        }
        data.dialogVisible = value;
      }
    );

    const closeHandle = (): void => {
      emit("cancleHandle");
    };

    const _createWork = async (params: any): Promise<void> => {
      const res = await createWork(params);
      if (res?.code === 200) {
        ElMessage.success("保存成功");
        emit("cancleHandle");
        router?.push(`/main/mine/${res?.data?._id}`);
      }
    };

    const _updateWork = async (params: any): Promise<void> => {
      const { code } = await updateWork(params);
      if (code === 200) {
        ElMessage.success("作品更新成功");
        emit("cancleHandle");
      }
    };

    const sureHandle = (): void => {
      formRef?.value?.validate((valid: boolean) => {
        if (valid) {
          const {
            form: { project, type, name, _id },
          } = data;
          const {
            height,
            width,
            components,
            canvasBg,
            userInfo: { userId },
          } = state;
          // 保存
          project === 2 &&
            _createWork({
              height,
              width,
              components,
              canvasBg,
              userId,
              type,
              imgUrl: "",
              name,
            });
          // 更新
          project === 1 &&
            _updateWork({
              height,
              width,
              components,
              canvasBg,
              userId,
              type,
              imgUrl: "",
              _id,
            });
        }
      });
    };

    return {
      formRef,
      closeHandle,
      sureHandle,
      ...toRefs(data),
    };
  },
});
</script>
