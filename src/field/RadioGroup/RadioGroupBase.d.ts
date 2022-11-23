import React from 'react';
import { SxProps } from '@mui/material';

import { IFieldPropOptions, FieldBaseProps } from '../../types';
import { FormItemBaseProps } from '../../layout';

export interface RadioGroupBaseProps extends FieldBaseProps<any>, Omit<FormItemBaseProps, 'className' | 'style'> {
  /** 选项或返回选项的函数。
   *选项值：{value,label,color?,size?,disabled?,icon?,required?,checkedIcon?}
   */
  options?: IFieldPropOptions,
  layout?: 'horizontal' | 'vertical',
  /** 传递给每个checkbox项 */
  itemSx?: SxProps,
  /** 传递给FormGroup */
  sx?: SxProps,
  labelPlacement?: 	'bottom'| 'end'| 'start'| 'top',
  /** 未选中时的图标 */
  icon?: React.ReactNode,
  /** 选中时的图标 */
  checkedIcon?: React.ReactNode,
  size?: 'medium' | 'small',
  color?: 	'default'| 'primary'| 'secondary'| 'error'| 'info'| 'success'| 'warning'| string,
  name?: string,

  /** 不从FormLayout获取fullWidth信息 */
  noFormLayout?: boolean,
  /** 外层包裹FormItemBase? */
  withFormItem?: boolean,
  /** 当 withFormItem=true时传递给FormItemBase的className*/
  formItemCls?: string,
  /** 当 withFormItem=true时传递给FormItemBase的style*/
  formItemStyle?: React.CSSProperties,
}

export declare const RadioGroupBase: React.ForwardRefExoticComponent<RadioGroupBaseProps>;

