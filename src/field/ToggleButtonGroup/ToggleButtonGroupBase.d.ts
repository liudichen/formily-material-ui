import React from 'react';
import { SxProps, ToggleButtonGroupProps as MuiToggleButtonGroupProps } from '@mui/material';

import { FieldBaseProps, IFieldPropOptions } from '../../types';
import { FormItemBaseProps } from '../../layout';

export interface ToggleButtonGroupBaseProps extends FieldBaseProps<any | any[]>, Omit<MuiToggleButtonGroupProps, 'value'|'onChange'>, Omit<FormItemBaseProps, 'className' | 'style' | 'prefixCls'> {
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
  /** 当 withFormItem=true时，传递给formItem的内部className的前缀，可以在引入自定义样式时使用
   * @default iimm 可以通过样式覆盖来修改FormItem内部样式(不需要传递此值)
   */
  formItemPrefixCls?: string,
}

export declare const ToggleButtonGroupBase: React.FC<ToggleButtonGroupBaseProps>;
