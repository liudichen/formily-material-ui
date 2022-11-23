import React from 'react';
import { SxProps } from '@mui/material';
import { DatePickerProps as MuiDatePickerProps } from '@mui/x-date-pickers';

import { FormItemBaseProps } from '../../layout';

export interface DatePickerBaseProps extends MuiDatePickerProps, Omit<FormItemBaseProps, 'className' | 'style'> {
  size?: 'small' | 'medium',
  /** 显示内部label? */
  showInnerLabel?: boolean,
  label?: React.ReactNode,
  defaultValue?: any,
  /** 文本框宽度拉满？ */
  fullWidth?: boolean,
  /** 选中时文本框颜色 */
  color?: 'primary'| 'secondary'| 'error'| 'info'| 'success'| 'warning',
  /** 文本框样式 */
  variant?: 'outlined' | 'filled' | 'standard',
  textFieldSx?: SxProps,

  /** 不从FormLayout获取fullWidth等信息 */
  noFormLayout?: boolean,
  /** 外层包裹FormItemBase? */
  withFormItem?: boolean,
  /** 当 withFormItem=true时传递给FormItemBase的className*/
  formItemCls?: string,
  /** 当 withFormItem=true时传递给FormItemBase的style*/
  formItemStyle?: React.CSSProperties,
}

export declare const DatePickerBase: React.FC<DatePickerBaseProps>;
