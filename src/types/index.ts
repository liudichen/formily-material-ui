export interface FieldBaseProps<T> {
  value?: T,
  defaultValue?: T,
  onChange?: (value: T) => void,
  readOnly?: boolean,
  disabled?: boolean,
  error?: boolean,
}
