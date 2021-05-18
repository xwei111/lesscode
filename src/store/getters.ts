import { listTypes } from "@/types";

export const components = (state: any): Array<listTypes> => state.components;
export const showCustomMenu = (state: any): boolean => state.showCustomMenu;
export const mousePos = (state: any): { top: number; left: number } =>
  state.mousePos;
export const percent = (state: any): number => state.percent;
export const actionIndex = (state: any): number => state.actionIndex;
export const actionComs = (state: any): Array<Array<listTypes>> =>
  state.actionComs;
export const attrVisible = (state: any): boolean => state.attrVisible;
export const isPreview = (state: any): boolean => state.isPreview;
export const width = (state: any): number => state.width;
export const height = (state: any): number => state.height;
export const canvasBg = (state: any): string => state.canvasBg;
export const top = (state: any): number => state.top;
export const left = (state: any): number => state.left;
