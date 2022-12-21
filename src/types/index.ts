/** 表单Field项的基本Props */
export interface FieldBaseProps<T> {
  value?: T,
  defaultValue?: T,
  onChange?: (value: T) => void,
  readOnly?: boolean,
  disabled?: boolean,
  error?: boolean,
}

export interface IFieldOptionItem<V = any, L = string> {
  value: V,
  label: L,
}

export type IFieldPropOptionItem<V = any, L = string> = string | number | IFieldOptionItem<V, L>;

type IFieldPropFnOption<V = any, L = string> = (() => IFieldOptionItem<V, L>[]) | (() => Promise<IFieldOptionItem<V, L>[]>);

export type IFieldPropOptions<V = any, L = string> = IFieldPropOptionItem<V, L>[] | IFieldPropFnOption<V, L>;

export type IColors = 'primary'| 'secondary'| 'error'| 'info'| 'success'| 'warning'| string;

export interface ICommonProps {
  [key: string]: any
}

export interface IUploadedFile extends File {
  url?: string,
  thumbUrl?: string,
  status?: 'error' | 'done' | 'uploading',
  message?: string,
}
