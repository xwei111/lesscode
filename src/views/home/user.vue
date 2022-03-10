<template>
  <div class="header-login">
    <span v-if="!state?.userInfo?.user" @click="clickHandle">登录/注册</span>
    <el-dropdown v-else @command="handleCommand">
      <span style="color: #409eff">
        {{ state?.userInfo?.user }}
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="out">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const { state } = useStore();

    const clickHandle = (): void => {
      state.loginVisible = true;
    };

    const loginOutHandle = (): void => {
      state.userInfo = {};
      localStorage.clear();
    };

    const handleCommand = (command: string) => {
      command === "out" && loginOutHandle();
    };

    return {
      state,
      clickHandle,
      handleCommand,
    };
  },
});
</script>

<style lang="scss" scoped>
.header-login {
  line-height: 50px;
  color: #409eff;
  cursor: pointer;
}
</style>
