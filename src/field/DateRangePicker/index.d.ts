import React from 'react';
import { SxProps } from '@mui/material';

import { DateRangePickerProps as MuiDateRangePickerProps } from '../../utils/component/DateRangePicker';

export interface DateRangePickerProps extends MuiDateRangePickerProps {
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
}

export declare const DateRangePicker: React.ForwardRefRenderFunction<any, DateRangePickerProps>;
