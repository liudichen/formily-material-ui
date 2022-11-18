import React from 'react';
import { SxProps } from '@mui/material';
import { DateTimePickerProps as MuiDateTimePickerProps } from '@mui/x-date-pickers';

export interface DateTimePickerProps extends MuiDateTimePickerProps {
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
}

export declare const DateTimePicker: React.FC<DateTimePickerProps>;
