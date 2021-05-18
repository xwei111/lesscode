/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'uuid';
declare module 'dom-to-image';
declare module 'save-as';
declare const _: any;