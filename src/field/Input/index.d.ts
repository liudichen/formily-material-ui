import React from 'react';
import { SxProps, InputProps as MuiInputProps, InputLabelProps, FormLabelProps, SelectProps } from '@mui/material';

import { FieldBaseProps } from '../../types';

export interface InputProps extends FieldBaseProps<string | number> {
  label?: React.ReactNode,
  labelPosition?: 'top' | 'left' | 'inner',
  fullWidth?: boolean,
  tooltip?: React.ReactNode,
  showClear?: boolean,
  required?: boolean,
  labelProps?: FormLabelProps,

  type: 'text' | 'password' | 'date' | 'color' | 'datetime-local' | 'email' | 'month' | 'number' | 'tel' | 'time' | 'url' | 'week' | 'datetime',
  margin?: 'none' | 'dense' | 'normal',
  maxRows?: number | string,
  autoComplete?: string,
  autoFocus?: boolean,
  classes?: object,
  color?: 'primary'| 'default' | 'secondary' | 'error' | 'info' | 'success' |'warning' | string,
  id?: string,
  multiline?: boolean,
  name?: string,
  placeholder?: string,
  rows?: number | string,
  select?: boolean,
  SelectProps?: SelectProps,
  size?: 'small' | 'medium' | string,
  variant?: 'outlined' | 'filled' | 'standard',
  focused?: boolean,
  component?: React.ReactElement | React.ElementType,
  sx?: SxProps,
  endAdornmentItem?: React.ReactNode,
  InputLabelProps?: Omit<InputLabelProps, 'endAdornment'>,
  InputProps?: MuiInputProps,
}

export declare const Input: React.ForwardRefRenderFunction<unknown, InputProps>;

