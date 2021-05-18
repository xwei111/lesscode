import { listTypes } from "@/types";
import { clickHandle } from "@/utils/handle";

// 组件信息
export const list: Array<listTypes> = [
  // 文案
  {
    key: "text",
    template: "custom-text",
    title: "文本",
    icon: "icon-wenben",
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
  // 矩形
  {
    key: "rect",
    template: "custom-rect",
    title: "矩形",
    icon: "icon-juxing",
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
  // 图片
  {
    key: "img",
    template: "custom-img",
    title: "图片",
    icon: "icon-tupian",
    attr: {
      // 服务器图片生成图片时跨域，需服务器进行配置，暂用本地资源
      // imgUrl: 'https://cdn.qjdchina.com/static-pre/lesscode/img/start.jpg',
      imgUrl: require("../assets/start.jpg"),
      blur: 0,
      brightness: 100,
      contrast: 100,
      grayscale: 0,
      hueRotate: 0,
      invert: 0,
      opacity: 100,
      saturate: 100,
      sepia: 0,
      dropShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
    },
    style: {
      width: 180,
      height: undefined,
      "border-radius": undefined,
    },
    events: {},
  },
  {
    key: "qr",
    template: "custom-qr",
    title: "二维码",
    icon: "icon-qr-code",
    attr: {
      text: "http://www.baidu.com",
      colorDark: "#000000",
      margin: 0,
      size: 200,
      backgroundColor: "#ffffff",
      logoSrc: "",
      logoMargin: 0,
      logoScale: 0.2,
    },
    style: {},
  },
  // 按钮
  {
    key: "button",
    template: "custom-button",
    title: "按钮",
    icon: "icon-button",
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
