import React from 'react';
import { SwitchProps as MuiSwitchProps } from '@mui/material';

import { FormItemBaseProps } from '../../layout';

export interface SwitchBaseProps extends Omit<MuiSwitchProps, 'onChange' | 'checked'>, Omit<FormItemBaseProps, 'className' | 'style' | 'prefixCls'> {
  value?: boolean,
  onChange?: (v?: boolean) => void,

  readOnly?: boolean,
  error?: boolean,
  spacing?: number,
  left?: React.ReactNode,
  right?: React.ReactNode,

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

export declare const SwitchBase: React.FC<SwitchBaseProps>;
