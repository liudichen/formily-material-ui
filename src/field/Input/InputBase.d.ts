import React from 'react';
import type { SxProps, InputProps as MuiInputProps, InputLabelProps, FormLabelProps, SelectProps, TextFieldProps } from '@mui/material';

import { FieldBaseProps } from '../../types';
import { FormItemBaseProps, FormItemExtraProps } from '../../layout';

export interface InputBaseProps extends FieldBaseProps<string | number>, Omit<FormItemBaseProps, 'className' | 'style' | 'prefixCls'>, FormItemExtraProps, Omit<TextFieldProps, 'value'|'onChange'|'defaultValue'> {
  label?: React.ReactNode,
  /** 显示内部label? */
  showInnerLabel?: boolean,
  fullWidth?: boolean,
  tooltip?: React.ReactNode,
  showClear?: boolean,
  required?: boolean,
  /** 仅showInnerLabel=true时传递给内部Label */
  innerLabelProps?: FormLabelProps,

  type?: 'text' | 'password' | 'date' | 'color' | 'datetime-local' | 'email' | 'month' | 'number' | 'tel' | 'time' | 'url' | 'week' | 'datetime',
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

export declare const InputBase: React.FC<InputBaseProps>;

