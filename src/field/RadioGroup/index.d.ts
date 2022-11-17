import React from 'react';
import { SxProps } from '@mui/material';

import { IFieldPropOptions, FieldBaseProps } from '../../types';

export interface RadioGroupProps extends FieldBaseProps<any> {
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
}

type RadioGroupType = React.FC<RadioGroupProps>;

export declare const RadioGroup: RadioGroupType;

export declare const FormilyRadioGroup: RadioGroupType;
