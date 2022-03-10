import { selfFetch, optionsTypes, headersTypes } from "./fetch";
import { ElMessage } from "element-plus";
import store from "../store";
import { baseUrl } from "@/consts";

interface dataTypes {
  code: number;
  message: string;
  data: any;
}

const request = async (
  url: string,
  options: optionsTypes
): Promise<dataTypes> => {
  const userInfo: string | null = localStorage.getItem("userInfo");
  const headers: headersTypes = {};
  if (userInfo) {
    const { token } = JSON.parse(userInfo) ?? {};
    headers.token = token;
  }
  const res: dataTypes = await selfFetch(baseUrl + url, {
    ...options,
    headers,
  });
  const { code, message } = res ?? {};

  if (code === 403) {
    store.commit("set_loginVisible", true);
    store.commit("set_userInfo", {});
    localStorage.clear();
  } else if (code !== 200) {
    ElMessage.error(message);
  }
  return res;
};

export default request;
