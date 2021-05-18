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
  icon?: string;
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
// 属性样式配置
export interface configTypes {
  [key: string]: Partial<{
    label: string;
    type: string;
    enum: Array<{
      value: string | number | boolean;
      label: string;
    }>;
    info: string;
    warning: string;
    step: number;
  }>;
}
