import * as gloablState from "../state";
import { listTypes } from "@/types";

interface posTypes {
  xt: number;
  xc: number;
  xb: number;
  yl: number;
  yc: number;
  yr: number;
}
// 判断是否小于3px
const getIsNear = (
  briefPos: posTypes,
  itemPos: posTypes,
  absorbSpace: number
): string => {
  if (Math.abs(briefPos.xt - itemPos.xt) < absorbSpace) return "tt";
  if (Math.abs(briefPos.xb - itemPos.xb) < absorbSpace) return "bb";
  if (Math.abs(briefPos.xt - itemPos.xb) < absorbSpace) return "tb";
  if (Math.abs(briefPos.xb - itemPos.xt) < absorbSpace) return "bt";
  if (Math.abs(briefPos.yl - itemPos.yl) < absorbSpace) return "ll";
  if (Math.abs(briefPos.yr - itemPos.yr) < absorbSpace) return "rr";
  if (Math.abs(briefPos.yl - itemPos.yr) < absorbSpace) return "lr";
  if (Math.abs(briefPos.yr - itemPos.yl) < absorbSpace) return "rl";
  return "";
};
// 获取当前元素x和y轴位置
const getCurretPos = (
  top: number,
  left: number,
  width: number,
  height: number
): posTypes => {
  const xt: number = top;
  const xc: number = top + height / 2;
  const xb: number = top + height;
  const yl: number = left;
  const yc: number = left + width / 2;
  const yr: number = left + width;
  return {
    xt,
    xc,
    xb,
    yl,
    yc,
    yr,
  };
};
// 设置标线是否显示
const setLinesStatus = (
  state: any,
  movePos?: posTypes,
  hitPos?: posTypes
): void => {
  if (movePos && hitPos) {
    state.linesStatus.xt =
      movePos.xt === hitPos.xt || movePos.xt === hitPos.xb ? true : false;
    state.linesStatus.xc = Math.abs(movePos.xc - hitPos.xc) < 1 ? true : false;
    state.linesStatus.xb =
      movePos.xb === hitPos.xb || movePos.xb === hitPos.xt ? true : false;
    state.linesStatus.yl =
      movePos.yl === hitPos.yl || movePos.yl === hitPos.yr ? true : false;
    state.linesStatus.yc = Math.abs(movePos.yc - hitPos.yc) < 1 ? true : false;
    state.linesStatus.yr =
      movePos.yr === hitPos.yr || movePos.yr === hitPos.yl ? true : false;
  } else {
    state.linesStatus.xt = false;
    state.linesStatus.xc = false;
    state.linesStatus.xb = false;
    state.linesStatus.yl = false;
    state.linesStatus.yc = false;
    state.linesStatus.yr = false;
  }
};
// 设置标线位置
const setLinesPos = (
  state: any,
  movePos?: posTypes,
  hitPos?: posTypes
): void => {
  if (movePos && hitPos) {
    state.linesPos.xt =
      movePos.xt === hitPos.xt || movePos.xt === hitPos.xb
        ? { top: movePos.xt }
        : null;
    state.linesPos.xc = movePos.xc === hitPos.xc ? { top: movePos.xc } : null;
    state.linesPos.xb =
      movePos.xb === hitPos.xb || movePos.xb === hitPos.xt
        ? { top: movePos.xb }
        : null;
    state.linesPos.yl =
      movePos.yl === hitPos.yl || movePos.yl === hitPos.yr
        ? { left: movePos.yl }
        : null;
    state.linesPos.yc =
      Math.abs(movePos.yc - hitPos.yc) < 1 ? { left: movePos.yc } : null;
    state.linesPos.yr =
      movePos.yr === hitPos.yr || movePos.yr === hitPos.yl
        ? { left: movePos.yr }
        : null;
  } else {
    state.linesPos.xt = null;
    state.linesPos.xc = null;
    state.linesPos.xb = null;
    state.linesPos.yl = null;
    state.linesPos.yc = null;
    state.linesPos.yr = null;
  }
};
// 设置标线
const setLines = (state: any, movePos?: posTypes, hitPos?: posTypes): void => {
  setLinesStatus(state, movePos, hitPos);
  setLinesPos(state, movePos, hitPos);
};

export default {
  state: {
    absorbSpace: 3,
    lines: ["xt", "xc", "xb", "yl", "yc", "yr"],
    linesStatus: {
      xt: false,
      xc: false,
      xb: false,
      yl: false,
      yc: false,
      yr: false,
    },
    linesPos: {
      xt: {},
      xc: {},
      xb: {},
      yl: {},
      yc: {},
      yr: {},
    },
  },
  mutations: {
    move(
      state: { [key: string]: any },
      currentPos: { currentTop: number; currentLeft: number; uuid: string }
    ): void {
      const { currentTop, currentLeft, uuid } = currentPos;
      const moveEl: any = document.getElementById(uuid);
      const hitPos: posTypes | any = {};
      const {
        default: { components },
      } = gloablState;
      const component: listTypes | any =
        components.find((item: listTypes) => item.uuid === uuid) ?? {};

      const briefPos = getCurretPos(
        currentTop,
        currentLeft,
        Number(moveEl?.clientWidth),
        Number(moveEl?.clientHeight)
      );
      let movePos;
      components.map((item: listTypes) => {
        const { style } = item;
        const { left, top } = style as any;
        if (uuid !== item.uuid) {
          const { clientWidth, clientHeight }: any = document.getElementById(
            item.uuid as any
          );
          const itemPos = getCurretPos(
            top,
            left,
            Number(clientWidth),
            Number(clientHeight)
          );
          // 距离小于3px时，直接设置为最近元素的位置
          const isNear: string = getIsNear(
            briefPos,
            itemPos,
            state.absorbSpace
          );
          // 满足吸附条件，触发吸附
          if (isNear === "tt") component.style.top = top;
          if (isNear === "bb")
            component.style.top = top + clientHeight - moveEl?.clientHeight;
          if (isNear === "tb") component.style.top = top + clientHeight;
          if (isNear === "bt") component.style.top = top - moveEl?.clientHeight;
          if (isNear === "ll") component.style.left = left;
          if (isNear === "rr")
            component.style.left = left + clientWidth - moveEl?.clientWidth;
          if (isNear === "lr") component.style.left = left + clientWidth;
          if (isNear === "rl")
            component.style.left = left - moveEl?.clientWidth;
          // 吸附后重新获取当前元素个位置，优化标线显示
          movePos = getCurretPos(
            component.style.top,
            component.style.left,
            moveEl?.clientWidth,
            moveEl?.clientHeight
          );
          // 存储所有符合显示标线的数据
          hitPos.xt = hitPos.xt
            ? hitPos.xt
            : movePos.xt === itemPos.xt
            ? movePos.xt
            : 0;
          hitPos.xc = hitPos.xc
            ? hitPos.xc
            : Math.abs(movePos.xc - itemPos.xc) < 1
            ? movePos.xc
            : 0;
          hitPos.xb = hitPos.xb
            ? hitPos.xb
            : movePos.xb === itemPos.xb
            ? movePos.xb
            : 0;
          hitPos.yl = hitPos.yl
            ? hitPos.yl
            : movePos.yl === itemPos.yl
            ? movePos.yl
            : 0;
          hitPos.yc = hitPos.yc
            ? hitPos.yc
            : // 优化y轴小数差异标线无法正常显示问题
            Math.abs(movePos.yc - itemPos.yc) < 1
            ? movePos.yc
            : 0;
          hitPos.yr = hitPos.yr
            ? hitPos.yr
            : movePos.yr === itemPos.yr
            ? movePos.yr
            : 0;
          hitPos.xt = hitPos.xt
            ? hitPos.xt
            : movePos.xt === itemPos.xb
            ? movePos.xt
            : 0;
          hitPos.xb = hitPos.xb
            ? hitPos.xb
            : movePos.xb === itemPos.xt
            ? movePos.xb
            : 0;
          hitPos.yl = hitPos.yl
            ? hitPos.yl
            : movePos.yl === itemPos.yr
            ? movePos.yl
            : 0;
          hitPos.yr = hitPos.yr
            ? hitPos.yr
            : movePos.yr === itemPos.yl
            ? movePos.yr
            : 0;
        }
      });

      setLines(state, movePos, hitPos);
    },
    stop(state: { [key: string]: any }): void {
      // 鼠标抬起重置标线
      setLines(state);
    },
  },
};
