import React from 'react';

import { CommonLayoutProps } from '../FormLayout';

export interface FormItemBaseProps extends Omit<CommonLayoutProps, 'noField'> {
  prefixCls?: string,
  className?: string,
  style?: React.CSSProperties,
  noLabel?: boolean,
  label?: React.ReactNode,
  /** 传递给包裹的FormItem的labelStyle */
  labelStyle?: React.CSSProperties,
  wrapperStyle?: React.CSSProperties,
  tooltip?: React.ReactNode,
  required?: boolean,
  feedbackStatus?: 'error' | 'warning' | 'success' | 'pending' | (string & {}),
  feedbackText?: React.ReactNode,
  feedbackIcon?: React.ReactNode,
  /** formItem下部额外内容 */
  extra?: React.ReactNode,
  addonBefore?: React.ReactNode,
  addonAfter?: React.ReactNode,
  /** formItem下部额外内容的className */
  extraCls?: string,
  feedbackCls?: string,
  keepTopSpace?: boolean,
  error?: boolean,
}

/** 所有属性均需要手动指定，无法从外部获取 */
export declare const FormItemBase: React.FC<React.PropsWithChildren<FormItemBaseProps>>;
