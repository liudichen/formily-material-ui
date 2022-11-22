import React from 'react';
import { SxProps } from '@mui/material';
import { DatePickerProps as MuiDatePickerProps } from '@mui/x-date-pickers';

export interface DatePickerProps extends MuiDatePickerProps {
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
  /** 手动指定不从外层Field获取信息 */
  noField?: boolean,
}

export declare const DatePicker: React.FC<DatePickerProps>;
