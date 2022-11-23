import React from 'react';
import { SwitchProps as MuiSwitchProps } from '@mui/material';

import { FormItemBaseProps } from '../../layout';

export interface SwitchBaseProps extends MuiSwitchProps, Omit<FormItemBaseProps, 'className' | 'style'>{
  readOnly?: boolean,
  error?: boolean,
  spacing?: number,
  left?: React.ReactNode,
  right?: React.ReactNode,

  /** 不从FormLayout获取fullWidth信息 */
  noFormLayout?: boolean,
  /** 外层包裹FormItemBase? */
  withFormItem?: boolean,
  /** 当 withFormItem=true时传递给FormItemBase的className*/
  fieldItemCls?: string,
  /** 当 withFormItem=true时传递给FormItemBase的style*/
  fieldItemStyle?: React.CSSProperties,
}

export declare const SwitchBase: React.ForwardRefExoticComponent<SwitchBaseProps>;
