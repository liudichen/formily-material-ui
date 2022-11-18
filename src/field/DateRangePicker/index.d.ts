import React from 'react';
import { SxProps } from '@mui/material';

import { DateRangePickerProps as MuiDateRangePickerProps } from '../../utils/component/x-date-pro/DateRangePicker';

export interface DateRangePickerProps extends MuiDateRangePickerProps {
  size: 'small' | 'medium',
  defaultValue?: any,
  /** 两个文本框直接的元素内容 */
  toText?: React.ReactNode,
  /** 两个文本框之间元素外层Box的sx */
  toSx?: SxProps,
  /** 文本框充满宽度 */
  fullWidth?: boolean,
}

export declare const DateRangePicker: React.FC<DateRangePickerProps>;
