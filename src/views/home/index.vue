<template>
  <div class="header">
    <div class="header-logo">LessCode</div>
    <div class="header-login" @click="loginHandle">登录</div>
  </div>
  <div class="templates-box">
    <div class="templates-cnotent">
      <el-tabs
        v-model="currentTab"
        @tab-click="tabClick"
        class="templates-content"
      >
        <el-tab-pane label="我的" name="mine">
          <el-scrollbar class="templates-scroll">
            <List :dataSource="dataSource" :currentTab="currentTab" />
          </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane label="海报" name="poster">
          <el-scrollbar class="templates-scroll">
            <List :dataSource="dataSource" :currentTab="currentTab" />
          </el-scrollbar>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import List from "./list.vue";
import templates from "@/consts/templates";

export default defineComponent({
  components: {
    List,
  },
  setup() {
    const data = reactive<{
      currentTab: string;
      dataSource: Array<any>;
    }>({
      currentTab: "mine",
      dataSource: [],
    });

    const tabClick = (e: any): void => {
      const {
        props: { name },
      } = e;
      data.dataSource =
        name === "mine"
          ? []
          : [
              ...templates,
              ...templates,
              ...templates,
              ...templates,
              ...templates,
              ...templates,
            ];
    };

    const loginHandle = (): void => {
      alert("敬请期待");
    };

    return {
      tabClick,
      loginHandle,
      ...toRefs(data),
    };
  },
});
</script>

<style lang="scss" scoped>
.header-logo {
  line-height: 50px;
  font-size: 20px;
}
.header-login {
  line-height: 50px;
  color: #409eff;
  cursor: pointer;
}
.templates-box {
  flex: 1;
  display: flex;
  padding: 0px 40px 20px;
  box-sizing: border-box;
  overflow: hidden;
  .templates-cnotent {
    flex: 1;
    background: #fff;
    padding: 15px;
    .templates-content {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      :deep() .el-tabs__content {
        flex: 1;
        display: flex;
        .el-tab-pane {
          flex: 1;
          padding-bottom: 20px;
          .templates-scroll {
            flex: 1;
          }
        }
      }
    }
  }
}
</style>
