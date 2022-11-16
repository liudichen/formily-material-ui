import React from 'react';

export interface FormItemProps extends CommonLayoutProps {
  className?: string,
  style?: React.CSSProperties,
  noLabel?: boolean,
  label?: React.ReactNode,
  labelStyle?: React.CSSProperties,
  wrapperStyle?: React.CSSProperties,
  tooltip?: React.ReactNode,
  required?: boolean,
  display?: 'visible' | 'hidden' | 'none',
  feedbackStatus?: 'error' | 'warning' | 'success' | 'pending' | (string & {}),
  feedbackText?: React.ReactNode,
  feedbackIcon?: React.ReactNode,
  extra?: React.ReactNode,
  addonBefore?: React.ReactNode,
  addonAfter?: React.ReactNode,
}
type ComposeFormItem = React.FC<React.PropsWithChildren<FormItemProps>> & {
  BaseItem?: React.FC<React.PropsWithChildren<FormItemProps>>
};

export declare const BaseItem:React.FC<React.PropsWithChildren<FormItemProps>>;
export declare const FormItem: ComposeFormItem;

export default FormItem;
