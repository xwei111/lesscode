import { configTypes } from "@/types";

const buttonAttr: configTypes = {
  text: {
    label: "文案",
    type: "input",
  },
  icon: {
    label: "图标",
    type: "input",
    info: "前往element-plus选择icon",
  },
  size: {
    label: "尺寸",
    type: "select",
    enum: [
      { value: "", label: "default" },
      { value: "medium", label: "medium" },
      { value: "small", label: "small" },
      { value: "mini", label: "mini" },
    ],
    warning: "当设置宽高后，尺寸将失效",
  },
  type: {
    label: "类型",
    type: "select",
    enum: [
      { value: "", label: "default" },
      { value: "primary", label: "primary" },
      { value: "success", label: "success" },
      { value: "warning", label: "warning" },
      { value: "danger", label: "danger" },
      { value: "info", label: "info" },
      { value: "text", label: "text" },
    ],
    warning: "当设置颜色后，类型将失效",
  },
  plain: {
    label: "是否朴素按钮",
    type: "select",
    enum: [
      { value: true, label: "是" },
      { value: false, label: "否" },
    ],
  },
  round: {
    label: "是否圆角按钮",
    type: "select",
    enum: [
      { value: true, label: "是" },
      { value: false, label: "否" },
    ],
  },
  circle: {
    label: "是否圆形按钮",
    type: "select",
    enum: [
      { value: true, label: "是" },
      { value: false, label: "否" },
    ],
  },
  loading: {
    label: "是否加载中状态",
    type: "select",
    enum: [
      { value: true, label: "是" },
      { value: false, label: "否" },
    ],
  },
  disabled: {
    label: "是否禁用",
    type: "select",
    enum: [
      { value: true, label: "是" },
      { value: false, label: "否" },
    ],
  },
  autofocus: {
    label: "是否默认聚焦",
    type: "select",
    enum: [
      { value: true, label: "是" },
      { value: false, label: "否" },
    ],
  },
};

export default buttonAttr;
