export interface styleTypes {
  left: number;
  top: number;
  width: number;
  height: number;
  [key: string]: any;
}

// 组件
export interface listTypes {
  uuid?: string;
  key: string;
  template: string;
  title: string;
  text?: string;
  attr?: {
    [key: string]: any;
  };
  style?: Partial<styleTypes>;
  events?: {
    [key: string]: any;
  };
}
// 自定义右键
export interface customMenusTypes {
  key: string;
  label: string;
}
