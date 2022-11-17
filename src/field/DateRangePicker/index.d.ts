import React from 'react';
import { SxProps } from '@mui/material';

import { DateRangePickerProps as MuiDateRangePickerProps } from '../../utils/component/x-date-pro/DateRangePicker';

export interface DateRangePickerProps extends MuiDateRangePickerProps {
  size: 'small' | 'medium',
  defaultValue?: any,
  toText?: React.ReactNode,
  toSx?: SxProps
}

export declare const DateRangePicker: React.FC<DateRangePickerProps>;
