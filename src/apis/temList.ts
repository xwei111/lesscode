import request from "@/utils/request";

// 获取模板
export const getTemLists = (body: { type: string; id?: string }) => {
  return request(`/lesscode/common/getTemLists`, { method: "GET", body });
};
// 在线查看作品
export const getWorkList = (body: { id?: string }) => {
  return request(`/lesscode/common/getWorkList`, { method: "GET", body });
};
// 新增模板
export const createTemLists = (body: any) => {
  return request(`/lesscode/common/createTemLists`, { method: "POST", body });
};
