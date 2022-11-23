import React from 'react';
import { SxProps, ToggleButtonGroupProps as MuiToggleButtonGroupProps } from '@mui/material';

import { FieldBaseProps, IFieldPropOptions } from '../../types';
import { FormItemBaseProps } from '../../layout';

export interface ToggleButtonGroupBaseProps extends FieldBaseProps<any | any[]>, Omit<MuiToggleButtonGroupProps, 'value'|'onChange'>, Omit<FormItemBaseProps, 'className' | 'style'> {
  options?: IFieldPropOptions
  minCount?: number,
  maxCount?: number,
  layout?: 'horizontal' | 'vertical',
  itemSx?: SxProps,
  itemFullWidth?: boolean,
  itemWidth?: number | string,
  itemMinWidth?: number | string,
  itemMaxWidth?: number | string,

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
}

export declare const ToggleButtonGroupBase: React.FC<ToggleButtonGroupBaseProps>;
