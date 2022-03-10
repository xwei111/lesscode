import request from "@/utils/request";

// 注册
export const register = (body: {
  user: string;
  pass: string;
  rePass: string;
}) => {
  return request(`/lesscode/user/register`, { method: "POST", body });
};
// 登录
export const login = (body: { user: string; pass: string }) => {
  return request(`/lesscode/user/login`, {
    method: "POST",
    body,
  });
};
// 获取用户作品
export const getWorkList = (body: { userId?: string; id?: string }) => {
  return request(`/lesscode/work/getWorkList`, { method: "GET", body });
};
// 保存作品 createWork
export const createWork = (body: any) => {
  return request(`/lesscode/work/createWork`, { method: "POST", body });
};
// 更新作品 updateWork
export const updateWork = (body: any) => {
  return request(`/lesscode/work/updateWork`, { method: "POST", body });
};
// 删除作品 deleteWork
export const deleteWork = (body: { userId?: string; id?: string }) => {
  return request(`/lesscode/work/deleteWork`, { method: "GET", body });
};
