import React from 'react';
import { TimePickerProps as MuiTimePickerProps } from '@mui/x-date-pickers';

import { FormItemBaseProps } from '../../layout';

export interface TimePickerBaseProps extends MuiTimePickerProps, Omit<FormItemBaseProps, 'className' | 'style'> {
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
  /** 显示秒？ */
  showSecond?: boolean,


  /** 不从FormLayout获取fullWidth等信息 */
  noFormLayout?: boolean,
  /** 外层包裹FormItemBase? */
  withFormItem?: boolean,
  /** 当 withFormItem=true时传递给FormItemBase的className*/
  formItemCls?: string,
  /** 当 withFormItem=true时传递给FormItemBase的style*/
  formItemStyle?: React.CSSProperties,
}

export declare const TimePickerBase: React.FC<TimePickerBaseProps>;