import * as types from "./mutationTypes";
import { listTypes } from "@/types";

const mutations = {
  // 组件信息
  [types.set_components](
    state: { [key: string]: any },
    components: Array<listTypes>
  ): void {
    state.components = components;
  },
  // 自定义右键
  [types.set_showCustomMenu](
    state: { [key: string]: any },
    showCustomMenu: boolean
  ): void {
    state.showCustomMenu = showCustomMenu;
  },
  // 鼠标位置
  [types.set_mousePos](
    state: { [key: string]: any },
    mousePos: { top: number; left: number }
  ): void {
    state.mousePos = mousePos;
  },
  // uuid
  [types.set_uuid](state: { [key: string]: any }, uuid: string): void {
    state.uuid = uuid;
  },
  // 画布百分比
  [types.set_percent](state: { [key: string]: any }, percent: number): void {
    state.percent = percent;
  },
  // 当前快照索引
  [types.set_actionIndex](
    state: { [key: string]: any },
    actionIndex: number
  ): void {
    state.actionIndex = actionIndex;
  },
  // 新增快照
  [types.set_actionComs_add](
    state: { [key: string]: any },
    components: Array<listTypes>
  ): void {
    state.actionComs.push(components);
  },
  // 插入快照
  [types.set_actionComs_insert](
    state: { [key: string]: any },
    insertData: { index: number; components: Array<listTypes> }
  ): void {
    const { index, components } = insertData;
    const { actionComs } = state;
    const { length } = actionComs;
    actionComs.splice(index, length - index + 1, components);
  },
  // 重置快照
  [types.set_resetActionComs](state: { [key: string]: any }): void {
    state.actionComs = [];
  },
  // 属性面板是否显示
  [types.set_attrVisible](
    state: { [key: string]: any },
    attrVisible: boolean
  ): void {
    state.attrVisible = attrVisible;
  },
  // 是否预览
  [types.set_isPreview](
    state: { [key: string]: any },
    isPreview: boolean
  ): void {
    state.isPreview = isPreview;
  },
  // 画布宽
  [types.set_width](state: { [key: string]: any }, width: number): void {
    state.width = width;
  },
  // 画布高
  [types.set_height](state: { [key: string]: any }, height: number): void {
    state.height = height;
  },
};

export default mutations;
