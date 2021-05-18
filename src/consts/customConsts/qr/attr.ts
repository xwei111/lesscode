import { configTypes } from "@/types";

const qrAttr: configTypes = {
  text: {
    label: "地址",
    type: "input",
  },
  colorDark: {
    label: "颜色",
    type: "colorPicker",
  },
  margin: {
    label: "边距",
    type: "inputNumber",
  },
  size: {
    label: "尺寸",
    type: "inputNumber",
  },
  backgroundColor: {
    label: "背景色",
    type: "colorPicker",
  },
  logoSrc: {
    label: "logo",
    type: "upload",
  },
  logoMargin: {
    label: "logo边距",
    type: "inputNumber",
  },
  logoScale: {
    label: "logo尺寸",
    type: "inputNumber",
    step: 0.1,
  },
};

export default qrAttr;
