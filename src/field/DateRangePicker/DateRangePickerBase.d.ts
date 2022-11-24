import React from 'react';
import { SxProps } from '@mui/material';

import { DateRangePickerProps as MuiDateRangePickerProps } from '../../utils/component/DateRangePicker';
import { FormItemBaseProps } from '../../layout';

export interface DateRangePickerBaseProps extends MuiDateRangePickerProps, Omit<FormItemBaseProps, 'className' | 'style' | 'prefixCls'>{
  size: 'small' | 'medium',
  defaultValue?: any,
  /** 两个文本框直接的元素内容 */
  toText?: React.ReactNode,
  /** 两个文本框之间元素外层Box的sx */
  toSx?: SxProps,
  /** 文本框宽度拉满？ */
  fullWidth?: boolean,
  /** 选中时文本框颜色 */
  color?: 'primary'| 'secondary'| 'error'| 'info'| 'success'| 'warning',
  /** 文本框样式 */
  variant?: 'outlined' | 'filled' | 'standard',
  textFieldSx?: SxProps,

  /** 不从Field获取信息 */
  noField?: boolean,
  /** 不从FormLayout获取fullWidth信息 */
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

export declare const DateRangePickerBase: React.FC<DateRangePickerBaseProps>;
