import type { ReactNode, FC } from 'react';
import type { SxProps } from '@mui/material';
import type { DatePickerProps as MuiDatePickerProps } from '@mui/x-date-pickers';

import { FormItemBaseProps, FormItemExtraProps } from '../../layout';

export interface DatePickerBaseProps extends MuiDatePickerProps, Omit<FormItemBaseProps, 'className' | 'style' | 'prefixCls'>, FormItemExtraProps {
  size?: 'small' | 'medium',
  /** 显示内部label? */
  showInnerLabel?: boolean,
  label?: ReactNode,
  defaultValue?: any,
  /** 文本框宽度拉满？ */
  fullWidth?: boolean,
  /** 选中时文本框颜色 */
  color?: 'primary'| 'secondary'| 'error'| 'info'| 'success'| 'warning',
  /** 文本框样式 */
  variant?: 'outlined' | 'filled' | 'standard',
  textFieldSx?: SxProps,
}

export declare const DatePickerBase: FC<DatePickerBaseProps>;
