import React from 'react';
import { SwitchProps as MuiSwitchProps } from '@mui/material';

export interface SwitchProps extends MuiSwitchProps {
  readOnly?: boolean,
  error?: boolean,
  spacing?: number,
  left?: React.ReactNode,
  right?: React.ReactNode,
}

export declare const Switch: React.ForwardRefExoticComponent<SwitchProps>;
