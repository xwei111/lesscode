<template>
  <div class="login-box" v-if="state?.loginVisible">
    <div class="login-content">
      <el-form ref="formRef" :model="form" :rules="rules">
        <el-form-item label="" prop="user">
          <el-input
            prefix-icon="el-icon-user"
            v-model="form.user"
            placeholder="请输入用户名"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="" prop="pass">
          <el-input
            prefix-icon="el-icon-lock"
            v-model="form.pass"
            placeholder="请输入密码"
            style="width: 300px"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="" prop="rePass" v-if="initStatus === 'register'">
          <el-input
            prefix-icon="el-icon-lock"
            v-model="form.rePass"
            placeholder="请重新输入密码"
            style="width: 300px"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            style="width: 300px"
            @click="clickHandle"
            :loading="loading"
            >{{ initStatus === "login" ? "登录" : "注册" }}</el-button
          >
        </el-form-item>
        <span @click="loginCheckHandle" class="login-check">{{
          initStatus === "login" ? "注册" : "登录"
        }}</span>
      </el-form>
      <i class="el-icon-close login-close" @click="closeHandle"></i>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import { login, register } from "@/apis/user";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const { state } = useStore();
    const formRef = ref();
    const data = reactive<{
      form: {
        user: string;
        pass: string;
        rePass?: string;
      };
      initStatus: string;
      rules: {
        [key: string]: Array<any>;
      };
      loading: boolean;
    }>({
      form: {
        user: "",
        pass: "",
        rePass: "",
      },
      rules: {
        user: [
          {
            required: true,
            message: "请输入用户名",
            trigger: ["blur", "change"],
          },
        ],
        pass: [
          {
            required: true,
            message: "请输入密码",
            trigger: ["blur", "change"],
          },
        ],
        rePass: [
          {
            required: true,
            message: "请重新输入密码",
            trigger: ["blur", "change"],
          },
        ],
      },
      initStatus: "login",
      loading: false,
    });

    const loginCheckHandle = (): void => {
      formRef?.value?.resetFields();
      data.initStatus = data.initStatus === "login" ? "register" : "login";
    };

    const clickHandle = async (): Promise<void> => {
      formRef?.value?.validate((valid: boolean) => {
        if (valid) {
          data.loading = true;
          const {
            form: { user, pass, rePass },
          } = data;
          data.initStatus === "register" &&
            _registerHandle({ user, pass, rePass: rePass as string });
          data.initStatus === "login" && _loginHandle({ user, pass });
        }
      });
    };

    const _loginHandle = async (params: {
      user: string;
      pass: string;
    }): Promise<void> => {
      const res = await login(params);
      if (res?.code === 200) {
        ElMessage.success("登录成功");
        state.userInfo = res?.data;
        localStorage.setItem("userInfo", JSON.stringify(res?.data));
        formRef?.value?.resetFields();
        state.loginVisible = false;
      }
      data.loading = false;
    };

    const _registerHandle = async (params: {
      user: string;
      pass: string;
      rePass: string;
    }): Promise<void> => {
      if (params?.pass !== params?.rePass) {
        data.loading = false;
        ElMessage.warning("两次密码不一致");
        return;
      }
      const { code } = await register(params);
      if (code === 200) {
        data.initStatus = "login";
        ElMessage.success("注册成功，请登录");
        formRef?.value?.resetFields();
      }
      data.loading = false;
    };

    const closeHandle = (): void => {
      data.initStatus = "login";
      state.loginVisible = false;
      formRef?.value?.resetFields();
    };

    return {
      state,
      formRef,
      clickHandle,
      closeHandle,
      loginCheckHandle,
      ...toRefs(data),
    };
  },
});
</script>

<style lang="scss" scoped>
.login-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba($color: #000000, $alpha: 0.1);
  z-index: 999;
  .login-content {
    position: absolute;
    left: 50%;
    top: 200px;
    transform: translate(-50%, 0);
    width: 500px;
    height: 360px;
    background: #fff;
    border-radius: 4px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    .login-check {
      cursor: pointer;
      color: #66b1ff;
    }
    .login-close {
      font-size: 20px;
      position: absolute;
      top: 8px;
      right: 8px;
      cursor: pointer;
    }
  }
}
</style>
