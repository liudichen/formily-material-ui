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
  label: React.ReactNode,
}

export type IFieldPropOptionItem = string | number | IFieldOptionItem;

type IFieldPropFnOption = () => IFieldOptionItem[] | Promise<IFieldOptionItem[]>;

export type IFieldPropOptions = IFieldPropOptionItem[] | IFieldPropFnOption;
