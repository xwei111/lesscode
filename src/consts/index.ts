import { customMenusTypes } from "@/types";

// baseurl
export const baseUrl =
  process.env.NODE_ENV === "development"
    ? ""
    // ? `http://172.20.10.6:3000` // 手机热点情况下本机ip测试
    : ""; // 生产nginx反向代理^~/lesscode/

export const assetsUrl =
  process.env.NODE_ENV === "development"
    ? "http://47.98.126.233:3000"
    // ? `http://172.20.10.6:3000` // 手机热点情况下本机ip测试
    : "http://47.98.126.233:3000";

// 自定义右键
export const customMenus: Array<customMenusTypes> = [
  { key: "copy", label: "复制" },
  { key: "top", label: "置顶" },
  { key: "bottom", label: "置底" },
  { key: "up", label: "上移" },
  { key: "down", label: "下移" },
  { key: "delete", label: "删除" },
];

// 移动端以375为基准宽度
export const baseWidth = 375;
