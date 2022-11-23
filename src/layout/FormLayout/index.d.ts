import React, { createContext, useContext } from 'react';
import { GridProps } from '@mui/material';

export interface CommonLayoutProps {
  labelPosition?: 'top' | 'left' | 'inner',
  labelWidth?: number | string,
  labelAlign?: 'left' | 'right',
  labelWrap?: boolean,
  wrapperAlign?: 'left' | 'right',
  wrapperWrap?: boolean,
  wrapperWidth?: number | string,
  wrapperAlign?: 'left' | 'right',
  fullWidth?: boolean,
  colon?: boolean,
  tooltipIcon?: React.ReactNode,
  tooltipLayout?: 'text' | 'icon',
  showFeedback?: boolean,
  feedbackLayout?: 'popover' | 'text',
  /** 手动指定不从外层Field获取信息 */
  noField?: boolean,
  /** 手动指定无需获取form信息 */
  noForm?: boolean,
}

declare const FormLayoutContext = createContext<CommonLayoutProps>(null);
export declare const useFormLayout = () => useContext(FormLayoutContext);

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

export declare const FormLayout: React.FC<React.PropsWithChildren<FormLayoutProps>>;

export default FormLayout;
