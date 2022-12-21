import React from 'react';

import { CommonLayoutProps } from '../FormLayout';

export interface FormItemBaseProps extends Omit<CommonLayoutProps, 'noField'> {
  /** formItem内部className的前缀，可以在引入自定义样式时使用
   * @default iimm 可以通过样式覆盖来修改FormItem内部样式(不需要传递此值)
   */
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
  feedbackStatus?: 'error' | 'warning' | 'success' | 'pending' | 'default' | (string & {}),
  feedbackText?: React.ReactNode,
  feedbackIcon?: React.ReactNode,
  /** formItem下部额外内容 */
  extra?: React.ReactNode,
  addonBefore?: React.ReactNode,
  addonAfter?: React.ReactNode,
  /** formItem下部额外内容的className */
  extraCls?: string,
  feedbackCls?: string,
  /** 当不显示label/title时是否保持label/title所占空间？ */
  keepTopSpace?: boolean,
  error?: boolean,
}

/** 当包裹内容时，一些用来传递给FormItemBase的props */
export interface FormItemExtraProps {
  /** 不从Field获取信息 */
  noField?: boolean,
  /** 不从FormLayout获取fullWidth等信息 */
  noFormLayout?: boolean,
  /** 外层包裹FormItemBase? */
  withFormItem?: boolean,
  /** 当 withFormItem=true时传递给FormItemBase的className*/
  formItemCls?: string,
  /** 当 withFormItem=true时传递给FormItemBase的style*/
  formItemStyle?: React.CSSProperties,
  /** 当 withFormItem=true时，传递给formItem的内部className的前缀，可以在引入自定义样式时使用
   * @default iimm 可以通过样式覆盖来修改FormItem内部样式(不需要传递此值)
   */
  formItemPrefixCls?: string,
}

/** 所有属性均需要手动指定，无法从外部获取 */
export declare const FormItemBase: React.FC<React.PropsWithChildren<FormItemBaseProps>>;
