import { configTypes } from "@/types";

const imgAttr: configTypes = {
  imgUrl: {
    label: "选择图片",
    type: "upload",
  },
  blur: {
    label: "模糊度",
    type: "inputNumber",
  },
  brightness: {
    label: "亮度",
    type: "inputNumber",
  },
  contrast: {
    label: "对比度",
    type: "inputNumber",
  },
  grayscale: {
    label: "灰度",
    type: "inputNumber",
  },
  hueRotate: {
    label: "颜色旋转",
    type: "inputNumber",
  },
  invert: {
    label: "反色",
    type: "inputNumber",
  },
  opacity: {
    label: "透明度",
    type: "inputNumber",
  },
  saturate: {
    label: "饱和度",
    type: "inputNumber",
  },
  sepia: {
    label: "褐色（怀旧色）",
    type: "inputNumber",
  },
  dropShadow: {
    label: "阴影（非透明区域添加阴影）",
    type: "input",
    info: "例：0px 0px 10px #f00",
  },
};

export default imgAttr;
