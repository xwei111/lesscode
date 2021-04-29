import { listTypes } from "@/types";
import store from "../store";

export const clickHandle = (data: listTypes): void => {
  const {
    state: { components },
  } = store;
  const { events } = data;
  const relationEl = events?.onClick?.relationEl ?? [];
  relationEl.map((item: any) => {
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
