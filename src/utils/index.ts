import { styleTypes } from "@/types";
import { baseWidth } from "@/consts";

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
// px转vw
// 以375为移动端基准
const pxtovw = (value: number, width: number = baseWidth): number => {
  return (value / width) * 100;
};
// 获取移动端样式
const getMobileStl = (isMobile: boolean, value: number): number => {
  return isMobile ? pxtovw(value) : value;
};
// 获取样式
export const getStl = (
  style: styleTypes | undefined,
  isMobile = false
): string => {
  if (!style) return "";
  let stl = "";
  Object.keys(style).forEach((item: string) => {
    if (style[item]) {
      const unit =
        typeof style?.[item] === "number" ? (isMobile ? "vw" : "px") : "";
      if (item === "isEllipsis" && style?.[item]) {
        stl += getEllipsis(style?.ellipsisNum ?? 0);
      } else {
        stl += `${item}: ${
          typeof style?.[item] === "number"
            ? getMobileStl(isMobile, style?.[item])
            : style?.[item]
        }${unit};`;
      }
    }
  });
  return stl;
};
// 获取外部wraper样式
export const getWraperStl = (
  style: styleTypes | undefined,
  isMobile = false
): string => {
  if (!style) return "";
  let width = style?.width ?? 0;
  let height = style?.height ?? 0;
  const unit = isMobile ? "vw" : "px";
  if (style["box-sizing"] !== "border-box") {
    // padding需考虑
    const b = style?.["border-width"];
    width = width + b * 2;
    height = height + b * 2;
  }
  return `top: ${getMobileStl(
    isMobile,
    style?.top
  )}${unit};left: ${getMobileStl(
    isMobile,
    style?.left
  )}${unit};width: ${getMobileStl(
    isMobile,
    width
  )}${unit};height: ${getMobileStl(isMobile, height)}${unit};transform:rotate(${
    style?.rotate
  }deg);`;
};
