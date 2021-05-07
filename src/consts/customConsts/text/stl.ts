const textStl: {
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
  color: {
    label: "字体颜色",
    type: "colorPicker",
  },
  "border-width": {
    label: "边框宽度",
    type: "inputNumber",
    warning: "避免异常请设置宽和高",
  },
  "border-color": {
    label: "边框色",
    type: "colorPicker",
  },
  "border-style": {
    label: "边框类型",
    type: "select",
    enum: [
      { value: "", label: "无" },
      { value: "solid", label: "实线" },
      { value: "dotted", label: "点状" },
      { value: "double", label: "双线" },
      { value: "dashed", label: "虚线" },
    ],
  },
  "font-size": {
    label: "字体大小",
    type: "inputNumber",
  },

  "font-weight": {
    label: "字体粗细",
    type: "select",
    enum: [
      { value: "normal", label: "normal" },
      { value: "bold", label: "bold" },
      { value: "100", label: "100" },
      { value: "200", label: "200" },
      { value: "300", label: "300" },
      { value: "400", label: "400" },
      { value: "500", label: "500" },
      { value: "600", label: "600" },
      { value: "700", label: "700" },
      { value: "800", label: "800" },
      { value: "900", label: "900" },
    ],
  },
  "text-align": {
    label: "对齐方式",
    type: "select",
    enum: [
      { value: "left", label: "左对齐" },
      { value: "right", label: "右对齐" },
      { value: "center", label: "居中" },
    ],
    warning: "设置宽度后生效",
  },
  "line-height": {
    label: "行高",
    type: "inputNumber",
  },
  rotate: {
    label: "旋转角度",
    type: "inputNumber",
  },
  isEllipsis: {
    label: "超出显示省略号",
    type: "select",
    enum: [
      { value: true, label: "是" },
      { value: false, label: "否" },
    ],
    warning: "设置宽度后生效",
  },
  ellipsisNum: {
    label: "最多显示几行",
    type: "inputNumber",
    warning: "设置宽度后生效",
  },
  "text-shadow": {
    label: "字体阴影",
    type: "input",
    info: "例：0px 0px 10px #f00",
  },
  "font-family": {
    label: "字体",
    type: "select",
    enum: [
      { value: "楷体", label: "楷体" },
      { value: "黑体", label: "黑体" },
      { value: "SourceHanSansCN-Regular", label: "思源黑体" },
      { value: "宋体", label: "宋体" },
      { value: "白舟角崩朱文", label: "白舟角崩朱文" },
      { value: "FZFWZhuZGDLHJW", label: "方正FW筑紫古典L黑" },
      { value: "SlidexiaxingRegular", label: "夏行楷" },
      { value: "ysbth", label: "标题黑" },
      { value: "pmzdqs", label: "庞门正道轻松体" },
      { value: "jiangxzk", label: "江西拙楷" },
      { value: "muyao", label: "沐瑶随心手写" },
      { value: "Muyao-Softbrush", label: "沐瑶-Softbrush" },
      { value: "shoushuti", label: "手写体" },
      { value: "SlidechunfengRegular", label: "春风楷" },
      { value: "yrdzst_Extralight", label: "杨任东竹石体" },
      { value: "zkwyt", label: "站酷文艺体" },
      { value: "zkxwt", label: "站酷小微LOGO体" },
    ],
    info: "资源存放于github，加载会比较慢，耐心等待",
  },
};

export default textStl;
