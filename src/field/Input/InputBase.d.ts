import React from 'react';
import { SxProps, InputProps as MuiInputProps, InputLabelProps, FormLabelProps, SelectProps } from '@mui/material';

import { FieldBaseProps } from '../../types';
import { FormItemBaseProps } from '../../layout';

export interface InputBaseProps extends FieldBaseProps<string | number>, Omit<FormItemBaseProps, 'className' | 'style' | 'prefixCls'> {
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

  /** 不从Field获取信息 */
  noField?: boolean,
  /** 不从FormLayout获取fullWidth信息 */
  noFormLayout?: boolean,
  /** 外层包裹FormItemBase? */
  withFormItem?: boolean,
  /** 当 withFormItem=true时传递给FormItemBase的className*/
  formItemCls?: string,
  /** 当 withFormItem=true时传递给FormItemBase的style*/
  formItemStyle?: React.CSSProperties,
  /** 当 withFormItem=true时，传递给formItem的内部className的前缀，可以在引入自定义样式时使用
   * @default iimm 可以通过样式覆盖来修改FormItem内部样式(不需要传递此值)
   */
  formItemPrefixCls?: string,
}

export declare const InputBase: React.FC<InputBaseProps>;

