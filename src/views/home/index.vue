<template>
  <div class="header">
    <div class="header-logo">LessCode</div>
    <User />
  </div>
  <div class="templates-box">
    <div class="templates-cnotent">
      <el-tabs v-model="type" @tab-click="tabClick" class="templates-content">
        <el-tab-pane label="海报" name="poster">
          <el-scrollbar class="templates-scroll">
            <List :dataSource="dataSource" :type="type" />
          </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane label="我的" name="mine">
          <el-scrollbar class="templates-scroll">
            <List
              :dataSource="dataSource"
              :type="type"
              @successHandle="successHandle"
            />
          </el-scrollbar>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from "vue";
import List from "./list.vue";
import User from "./user.vue";
import { useStore } from "vuex";
import useTemList from "@/hooks/useTemList";

export default defineComponent({
  components: {
    List,
    User,
  },
  setup() {
    const { state } = useStore();
    const data = reactive<{
      type: string;
      dataSource: Array<any>;
    }>({
      type: "poster",
      dataSource: [],
    });

    const { _getTemLists, _getWorkList } = useTemList((dataSource) => {
      data.dataSource = dataSource ?? [];
    });
    // 未登录不切换tab
    watch(
      () => data.type,
      (newVal, oldVal) => {
        if (
          newVal === "mine" &&
          (!state?.userInfo ||
            !state?.userInfo?.user ||
            !state?.userInfo?.token)
        ) {
          setTimeout(() => (data.type = oldVal), 0);
        }
      }
    );
    // 退出登录且tab为我的时，清空数据
    watch(
      () => state.userInfo.token,
      (newVal) => {
        if (!newVal && data.type === "mine") {
          data.dataSource = [];
        }
      }
    );
    // 初始化数据
    _getTemLists({ type: data.type });

    const tabClick = (e: any): void => {
      const {
        props: { name },
      } = e;
      name === "mine" && _getWorkList({ userId: state?.userInfo?.userId });
      name !== "mine" && _getTemLists({ type: name });
    };

    const successHandle = () => {
      _getWorkList({ userId: state?.userInfo?.userId });
    };

    return {
      tabClick,
      successHandle,
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
