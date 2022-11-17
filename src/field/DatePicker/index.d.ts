import React from 'react';
import { DatePickerProps as MuiDatePickerProps } from '@mui/x-date-pickers';

export interface DatePickerProps extends MuiDatePickerProps {
  size?: 'small' | 'medium',
  labelPosition?: 'inner' | 'top' | 'left',
  label?: React.ReactNode,
  placeholder?: React.ReactNode,
  defaultValue?: any,
}

export declare const DatePicker: React.FC<DatePickerProps>;
