import React from 'react';
import { SwitchProps as MuiSwitchProps } from '@mui/material';

export interface SwitchProps extends MuiSwitchProps {
  readOnly?: boolean,
  error?: boolean,
  spacing?: number,
  left?: React.ReactNode,
  right?: React.ReactNode,
  /** 手动指定不从外层Field获取信息 */
  noField?: boolean,
}

export declare const Switch: React.ForwardRefExoticComponent<SwitchProps>;
