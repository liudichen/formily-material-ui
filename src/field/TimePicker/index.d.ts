import React from 'react';
import { TimePickerProps as MuiTimePickerProps } from '@mui/x-date-pickers';

export interface TimePickerProps extends MuiTimePickerProps {
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
  /** 显示秒？ */
  showSecond?: boolean,
  /** 手动指定不从外层Field获取信息 */
  noField?: boolean,
}

export declare const TimePicker: React.ForwardRefExoticComponent<TimePickerProps>;
