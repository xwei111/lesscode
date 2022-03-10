import { useStore } from "vuex";

export default () => {
  const { state } = useStore();

  const checkLogin = (): boolean => {
    if (!state?.userInfo || !state?.userInfo?.user || !state?.userInfo?.token) {
      state.loginVisible = true;
      return false;
    }
    return true;
  };

  return {
    checkLogin,
  };
};
