import React from 'react';
import { GridProps } from '@mui/material';

export interface CommonLayoutProps {
  prefixCls?: string,
  labelPosition?: 'top' | 'left' | 'inner',
  labelWidth?: number | string,
  labelAlign?: 'left' | 'right',
  labelWrap?: boolean,
  wrapperAlign?: 'left' | 'right',
  wrapperWrap?: boolean,
  fullWidth?: boolean,
  colon?: boolean,
  tooltipIcon?: React.ReactNode,
  tooltipLayout?: 'text' | 'icon',
  showFeedback?: boolean,
}

interface ColsProps {
  xs?: number,
  sm?: number,
  md?: number,
  lg?: number,
  xl?: number,
}

export interface FormLayoutProps extends CommonLayoutProps, Omit<GridProps, 'item'> {
  defaultCols?: ColsProps,
}
