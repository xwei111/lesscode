import { ref, onMounted } from "vue";

export default (): any => {
  const wraperHeight = ref<number>(0);
  const wraperWidth = ref<number>(0);

  const setStyl = (): void => {
    const { clientHeight, clientWidth } =
      document.getElementById("edit-wraper") ?? {};
    wraperHeight.value = Number(clientHeight);
    wraperWidth.value = Number(clientWidth);
  };

  onMounted((): void => setStyl());

  return {
    wraperHeight,
    wraperWidth,
  };
};
