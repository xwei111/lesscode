const textStl: {
  [key: string]: any;
} = {
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
      { value: "", label: "none" },
      { value: "solid", label: "solid" },
      { value: "dotted", label: "dotted" },
      { value: "double", label: "double" },
    ],
  },
  "font-size": {
    label: "字体大小",
    type: "inputNumber",
  },
  color: {
    label: "颜色",
    type: "colorPicker",
  },
};

export default textStl;
