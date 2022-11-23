import React from 'react';

import { IFieldPropOptions, FieldBaseProps } from '../../types';
import { FormItemBaseProps } from '../../layout';

export interface CheckboxGroupBaseProps extends FieldBaseProps<any[]>, Omit<FormGroupProps, 'sx'>, Omit<FormItemBaseProps, 'className' | 'style'> {
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

  /** 不从FormLayout获取fullWidth信息 */
  noFormLayout?: boolean,
  /** 外层包裹FormItemBase? */
  withFormItem?: boolean,
  /** 当 withFormItem=true时传递给FormItemBase的className*/
  fieldItemCls?: string,
  /** 当 withFormItem=true时传递给FormItemBase的style*/
  fieldItemStyle?: React.CSSProperties,
}

export declare const CheckboxGroupBase: React.ForwardRefExoticComponent<CheckboxGroupBaseProps>;
