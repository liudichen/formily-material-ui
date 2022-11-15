import React from 'react';
import { SxProps, InputProps as MuiInputProps, InputLabelProps, FormLabelProps, SelectProps } from '@mui/material';
import { connect } from '@formily/react';

export interface InputProps {
  value?: string | number,
  defaultValue?: string | number,
  onChange?: (value: string | number | undefined | null) => void,
  label?: React.ReactNode,
  labelPosition?: 'top' | 'left' | 'inner',
  labelStyle?: React.CSSProperties,
  fullWidth?: boolean,
  tooltip?: React.ReactNode,
  tooltipLayout?: 'icon' | 'text',
  showClear?: boolean,
  required?: boolean,
  error?: boolean,
  readOnly?: boolean,
  disabled?: boolean,
  labelProps?: Omit<FormLabelProps, 'error'>,

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

export declare const Input: React.ForwardRefRenderFunction<any, InputProps>;

export declare const FormilyInput = connect(
  Input,
  mapProps((props, field) => {
    if (isVoidField(field)) return props;
    return {
      ...props,
      error: props.error ?? field.selfInvalid,
      fullWidth: props.fullWidth ?? true,
      tooltip: props.tooltip ?? field.description,
      readOnly: props.readOnly ?? field.readOnly,
      disabled: props.disabled ?? field.disabled,
      required: props.required ?? field.required,
      defaultValue: props.defaultValue ?? field.initialValue,
      label: props.label ?? field.title,
    };
  }),
);
