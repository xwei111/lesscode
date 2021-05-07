import { listTypes } from "@/types";
import { clickHandle } from "@/utils/handle";

// 组件信息
export const list: Array<listTypes> = [
  {
    key: "text",
    template: "custom-text",
    title: "文本",
    attr: {
      text: "文本",
    },
    style: {
      width: undefined,
      height: undefined,
      color: undefined,
      "font-size": undefined,
      "font-family": undefined,
      "font-weight": "100",
      "text-align": "left",
      "line-height": undefined,
      "background-color": undefined,
      "border-width": undefined,
      "border-style": undefined,
      "border-color": undefined,
      rotate: 0,
      isEllipsis: false,
      ellipsisNum: undefined,
      "text-shadow": undefined,
    },
    events: {},
  },
  {
    key: "rect",
    template: "custom-rect",
    title: "矩形",
    attr: {},
    style: {
      width: 200,
      height: 200,
      "background-color": "#ccc",
      "border-width": undefined,
      "border-style": "none",
      "border-color": undefined,
      "border-radius": undefined,
      rotate: 0,
      "box-shadow": undefined,
    },
    events: {},
  },
  {
    key: "button",
    template: "custom-button",
    title: "按钮",
    attr: {
      text: "按钮",
      size: "",
      type: "primary",
      plain: false,
      round: false,
      circle: false,
      loading: false,
      disabled: false,
      icon: "",
      autofocus: false,
    },
    style: {
      width: undefined,
      height: undefined,
      "background-color": undefined,
      "border-color": undefined,
    },
    events: {
      onClick: {
        label: "点击事件",
        isBack: false,
        fn: (data: listTypes) => clickHandle(data),
        relationEl: [],
      },
    },
  },
];
