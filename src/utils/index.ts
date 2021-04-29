import { styleTypes } from "@/types";
// 获取样式
export const getStl = (style: styleTypes | undefined): string => {
  if (!style) return "";
  let stl = "";
  Object.keys(style).forEach((item: string) => {
    if (style[item]) {
      const unit = typeof style?.[item] === "number" ? "px" : "";
      stl += `${item}: ${style?.[item]}${unit};`;
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
  return `top: ${style?.top}px;left: ${style?.left}px;width: ${width}px;height: ${height}px;`;
};
