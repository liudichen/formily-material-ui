/** 表单Field项的基本Props */
export interface FieldBaseProps<T> {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
  readOnly?: boolean;
  disabled?: boolean;
  error?: boolean;
}

export interface IFieldOptionItem<V = any, L = string> {
  value: V;
  label: L;
  disabled?: boolean;
}

export type IFieldPropOptionItem<V = any, L = string> = string | number | IFieldOptionItem<V, L>;

type IFieldPropFnOption<V = any, L = string> =
  | ((refresh?: boolean) => IFieldOptionItem<V, L>[])
  | ((refresh?: boolean) => Promise<IFieldOptionItem<V, L>[]>);

export type IFieldPropOptions<V = any, L = string> = IFieldPropOptionItem<V, L>[] | IFieldPropFnOption<V, L>;

export type IColors = "primary" | "secondary" | "error" | "info" | "success" | "warning" | string;

export interface ICommonProps {
  [key: string]: any;
}

export interface IUploadedFile extends File {
  url?: string;
  thumbUrl?: string;
  status?: "error" | "done" | "uploading";
  message?: string;
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
  refreshIcon?: React.ReactNode;
}
