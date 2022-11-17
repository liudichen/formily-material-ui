import React from 'react';

import { CommonLayoutProps } from '../FormLayout';

export interface FormItemProps extends CommonLayoutProps {
  prefixCls?: string,
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
  extraClassName?: string,
  feedbackClassName?: string,
}
type ComposeFormItem = React.FC<React.PropsWithChildren<FormItemProps>> & {
  BaseItem?: React.FC<React.PropsWithChildren<FormItemProps>>
};

export declare const BaseItem:React.FC<React.PropsWithChildren<FormItemProps>>;
export declare const FormItem: ComposeFormItem;

export default FormItem;
