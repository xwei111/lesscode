const rectStl: {
  [key: string]: any;
} = {
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
};

export default rectStl;
