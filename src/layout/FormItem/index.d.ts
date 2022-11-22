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
  feedbackStatus?: 'error' | 'warning' | 'success' | 'pending' | (string & {}),
  feedbackText?: React.ReactNode,
  feedbackIcon?: React.ReactNode,
  extra?: React.ReactNode,
  addonBefore?: React.ReactNode,
  addonAfter?: React.ReactNode,
  extraClassName?: string,
  feedbackClassName?: string,
  keepTopSpace?: boolean,
  error?: boolean,
  /** 不从FormLayout获取信息 */
  noFormLayout?: boolean,
}

export declare const FormItem:React.FC<React.PropsWithChildren<FormItemProps>>;
