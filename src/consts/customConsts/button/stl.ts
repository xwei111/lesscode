import { configTypes } from "@/types";

const buttonStl: configTypes = {
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
  "border-color": {
    label: "边框色",
    type: "colorPicker",
  },
};

export default buttonStl;
