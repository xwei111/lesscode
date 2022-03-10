import { listTypes } from "@/types";
import store from "../store";
// 点击事件（此处以对其他元素属性的影响为demo）
export const clickHandle = (data: listTypes): void => {
  const {
    state: { components },
  } = store;
  const { events } = data;
  // 属性
  const relationEl = events?.onClick?.relationEl ?? [];
  relationEl.length && relationEl.map((item: any) => {
    const component: any = components.find(
      (com: listTypes) => com?.uuid === item?.uuid
    );
    Object.keys(item).map((attr: any) => {
      if (attr !== "uuid" && attr !== "attrList") {
        component.attr[attr] = item[attr];
      }
    });
  });
};
