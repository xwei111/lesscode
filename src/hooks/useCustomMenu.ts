import { listTypes } from "@/types";
import { ElMessage } from "element-plus";
import { v4 as uuidv4 } from "uuid";
import { useStore } from "vuex";
import useAction from "@/hooks/useAction";

export default (): any => {
  const { state } = useStore();
  const { addAction } = useAction();

  const switchHandle = (
    components: Array<listTypes>,
    i: number,
    j: number
  ): void => {
    const current = components[i];
    components[i] = components[j];
    components[j] = current;
  };

  const removeHandle = (components: Array<listTypes>, i: number): void => {
    components.splice(i, 1);
  };

  const addHandle = (
    components: Array<listTypes>,
    component: listTypes,
    type: number
  ): void => {
    type === 0 ? components.push(component) : components.unshift(component);
  };

  const upHandle = (components: Array<listTypes>, index: number): void => {
    if (index < components.length - 1) {
      switchHandle(components, index, index + 1);
      addAction();
    } else {
      ElMessage.info("已经到顶了");
    }
  };

  const downHandle = (components: Array<listTypes>, index: number): void => {
    if (index > 0) {
      switchHandle(components, index, index - 1);
      addAction();
    } else {
      ElMessage.info("已经到底了");
    }
  };

  const topHandle = (components: Array<listTypes>, index: number): void => {
    if (index < components.length - 1) {
      const current = components[index];
      removeHandle(components, index);
      addHandle(components, current, 0);
      addAction();
    } else {
      ElMessage.info("已经到顶了");
    }
  };

  const bottomHandle = (components: Array<listTypes>, index: number): void => {
    if (index > 0) {
      const current = components[index];
      removeHandle(components, index);
      addHandle(components, current, 1);
      addAction();
    } else {
      ElMessage.info("已经到底了");
    }
  };

  const copyHandle = (components: Array<listTypes>, index: number): void => {
    const copyEl: any = _.cloneDeep(components[index]);
    copyEl.uuid = uuidv4();
    copyEl.style.top += 10;
    copyEl.style.left += 10;
    addHandle(components, copyEl, 0);
    addAction();
  };

  const selectHandle = (key: string): void => {
    const { uuid, components } = state;
    const currentIndex: number =
      components.findIndex((item: any) => item.uuid === uuid) ?? null;
    switch (key) {
      case "copy":
        copyHandle(components, currentIndex);
        break;
      case "up":
        upHandle(components, currentIndex);
        break;
      case "down":
        downHandle(components, currentIndex);
        break;
      case "top":
        topHandle(components, currentIndex);
        break;
      case "bottom":
        bottomHandle(components, currentIndex);
        break;
      case "delete":
        removeHandle(components, currentIndex);
        addAction();
        break;
      default:
        console.log("nothing to do");
        break;
    }
  };

  return {
    state,
    selectHandle,
  };
};
