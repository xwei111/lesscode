import { useStore } from "vuex";
import * as _ from "lodash";
import { ElMessage } from "element-plus";

export default (): any => {
  const store = useStore();
  // 添加快照
  const addAction = (): void => {
    const {
      state: { actionIndex, actionComs, components },
      commit,
    } = store;
    const { length } = actionComs;
    commit("set_actionIndex", ++store.state.actionIndex);
    if (actionIndex == length) {
      commit("set_actionComs_add", _.cloneDeep(components));
    } else {
      // 中途插入数据覆盖旧数据
      commit("set_actionComs_insert", {
        index: actionIndex,
        components: _.cloneDeep(components),
      });
    }
  };
  // 后退
  const backHandle = (): void => {
    const {
      state: { actionComs, actionIndex },
      commit,
    } = store;
    const index = actionIndex - 1;
    if (index < 0) {
      ElMessage.info("没有更多内容，无法后退");
    } else {
      commit("set_actionIndex", index);
      commit("set_components", _.cloneDeep(actionComs[index - 1]) ?? []);
    }
  };
  // 前进
  const forwardHandle = (): void => {
    const {
      state: { actionComs, actionIndex },
      commit,
    } = store;
    const index = actionIndex + 1;
    if (index > actionComs.length) {
      ElMessage.info("没有更多内容，无法后退");
    } else {
      commit("set_actionIndex", index);
      commit("set_components", _.cloneDeep(actionComs[index - 1]) ?? []);
    }
  };
  // 清空
  const clearHandle = (): void => {
    const { commit } = store;
    commit("set_actionIndex", 0);
    commit("set_resetActionComs", []);
    commit("set_components", []);
  };

  return {
    addAction,
    backHandle,
    forwardHandle,
    clearHandle,
  };
};
