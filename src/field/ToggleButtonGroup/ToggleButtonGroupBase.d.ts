import React from 'react';
import { SxProps, ToggleButtonGroupProps as MuiToggleButtonGroupProps } from '@mui/material';

import { FieldBaseProps, IFieldPropOptions } from '../../types';
import { FormItemBaseProps, FormItemExtraProps } from '../../layout';

export interface ToggleButtonGroupBaseProps extends FieldBaseProps<any | any[]>, Omit<MuiToggleButtonGroupProps, 'value'|'onChange'>, Omit<FormItemBaseProps, 'className' | 'style' | 'prefixCls'>, FormItemExtraProps {
  options?: IFieldPropOptions
  minCount?: number,
  maxCount?: number,
  layout?: 'horizontal' | 'vertical',
  itemSx?: SxProps,
  itemFullWidth?: boolean,
  itemWidth?: number | string,
  itemMinWidth?: number | string,
  itemMaxWidth?: number | string,

}

export declare const ToggleButtonGroupBase: React.FC<ToggleButtonGroupBaseProps>;
