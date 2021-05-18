import { configTypes } from "@/types";

const rectStl: configTypes = {
  width: {
    label: "宽",
    type: "inputNumber",
  },
  height: {
    label: "高",
    type: "inputNumber",
  },
  top: {
    label: "距顶部",
    type: "inputNumber",
  },
  left: {
    label: "距左侧",
    type: "inputNumber",
  },
  "background-color": {
    label: "背景色",
    type: "colorPicker",
  },
  "border-width": {
    label: "边框宽度",
    type: "inputNumber",
  },
  "border-color": {
    label: "边框色",
    type: "colorPicker",
  },
  "border-style": {
    label: "边框类型",
    type: "select",
    enum: [
      { value: "none", label: "none" },
      { value: "solid", label: "solid" },
      { value: "dotted", label: "dotted" },
      { value: "double", label: "double" },
    ],
  },
  "border-radius": {
    label: "圆角",
    type: "inputNumber",
  },
  rotate: {
    label: "旋转角度",
    type: "inputNumber",
  },
  "box-shadow": {
    label: "阴影",
    type: "input",
    info: "例：0px 0px 10px #f00",
  },
};

export default rectStl;
