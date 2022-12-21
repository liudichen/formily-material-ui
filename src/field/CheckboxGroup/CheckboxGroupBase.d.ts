import React from 'react';

import { IFieldPropOptions, FieldBaseProps } from '../../types';
import { FormItemBaseProps, FormItemExtraProps } from '../../layout';

export interface CheckboxGroupBaseProps extends FieldBaseProps<any[]>, Omit<FormGroupProps, 'sx'>, Omit<FormItemBaseProps, 'className' | 'style' | 'prefixCls'>, FormItemExtraProps {
  /** 选项或返回选项的函数。
   *选项值：{value,label,color?,size?,disabled?,icon?,required?,checkedIcon?}
   */
  options?: IFieldPropOptions,
  minCount?: number,
  maxCount?: number,
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
}

export declare const CheckboxGroupBase: React.FC<CheckboxGroupBaseProps>;
