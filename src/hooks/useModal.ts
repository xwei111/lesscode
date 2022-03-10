import { ref } from "vue";

export default (props: { title: string }) => {
  const visible = ref<boolean>(false);
  const title = ref<string>(props?.title ?? "");

  const cancleHandle = (): void => {
    visible.value = false;
  };

  const openHandle = (): void => {
    visible.value = true;
  };

  return {
    visible,
    title,
    cancleHandle,
    openHandle,
  };
};
