import type { ReactNode } from "react";

/** 表单Field项的基本Props */
export interface FieldBaseProps<T = any> {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
  readOnly?: boolean;
  disabled?: boolean;
  error?: boolean;
}

interface EmptyInterface {}

export type IFieldOptionItem<V = any, L = string, E extends any = EmptyInterface> = {
  value: V;
  label: L;
  disabled?: boolean;
} & E;

export type IFieldPropOptionItem<V = any, L = string, E = EmptyInterface> = string | number | IFieldOptionItem<V, L, E>;

type IFieldPropFnOption<V = any, L = string, E = EmptyInterface> =
  | ((refresh?: boolean) => IFieldOptionItem<V, L, E>[])
  | ((refresh?: boolean) => Promise<IFieldOptionItem<V, L, E>[]>);

export type IFieldPropOptions<V = any, L = string, E = EmptyInterface> =
  | IFieldPropOptionItem<V, L, E>[]
  | IFieldPropFnOption<V, L, E>;

export type IColors = "primary" | "secondary" | "error" | "info" | "success" | "warning" | string;

export interface ICommonProps {
  [key: string]: any;
}

export interface IUploadedFile extends File {
  url?: string;
  thumbUrl?: string;
  status?: "error" | "done" | "uploading";
  message?: string;
  error?: any;
}

export interface RefreshOptionsProps {
  /** 显示刷新选项的按钮? */
  showRefresh?: boolean;
  /** refesh刷新选项的受控属性 */
  refresh?: number;
  /** refesh刷新选项的受控属性 */
  onRefreshChange?: (refresh: number) => void;
  /** 刷新选项的文本 */
  refreshText?: string;
  /** 刷新选项的图标 */
  refreshIcon?: ReactNode;
}
