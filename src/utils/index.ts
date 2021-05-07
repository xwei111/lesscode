import { styleTypes } from "@/types";
const getEllipsis = (num: number): string => {
  if (num > 1) {
    return `overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: ${num};
            -webkit-box-orient: vertical;`;
  } else {
    return `overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;`;
  }
};
// 获取样式
export const getStl = (style: styleTypes | undefined): string => {
  if (!style) return "";
  let stl = "";
  Object.keys(style).forEach((item: string) => {
    if (style[item]) {
      const unit = typeof style?.[item] === "number" ? "px" : "";
      if (item === "isEllipsis" && style?.[item]) {
        stl += getEllipsis(style?.ellipsisNum ?? 0);
      } else {
        stl += `${item}: ${style?.[item]}${unit};`;
      }
    }
  });
  return stl;
};
// 获取外部wraper样式
export const getWraperStl = (style: styleTypes | undefined): string => {
  if (!style) return "";
  let width = style?.width ?? 0;
  let height = style?.height ?? 0;
  if (style["box-sizing"] !== "border-box") {
    // padding需考虑
    const b = style?.["border-width"];
    width = width + b * 2;
    height = height + b * 2;
  }
  return `top: ${style?.top}px;left: ${style?.left}px;width: ${width}px;height: ${height}px;transform:rotate(${style?.rotate}deg);`;
};
