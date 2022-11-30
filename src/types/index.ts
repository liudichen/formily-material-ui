/** 表单Field项的基本Props */
export interface FieldBaseProps<T> {
  value?: T,
  defaultValue?: T,
  onChange?: (value: T) => void,
  readOnly?: boolean,
  disabled?: boolean,
  error?: boolean,
}

export interface IFieldOptionItem {
  value: any,
  label: string,
}

export type IFieldPropOptionItem = string | number | IFieldOptionItem;

type IFieldPropFnOption = () => IFieldOptionItem[] | Promise<IFieldOptionItem[]>;

export type IFieldPropOptions = IFieldPropOptionItem[] | IFieldPropFnOption;

export type IColors = 'primary'| 'secondary'| 'error'| 'info'| 'success'| 'warning'|string;

export interface ICommonProps {
  [key: string]: any
}

export interface IUploadedFile extends File {
  url?: string,
  thumbUrl?: string,
  status?: 'error' | 'done' | 'uploading',
  message?: string,
}
