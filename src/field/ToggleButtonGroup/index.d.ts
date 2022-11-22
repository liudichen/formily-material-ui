import React from 'react';
import { SxProps, ToggleButtonGroupProps as MuiToggleButtonGroupProps } from '@mui/material';

import { FieldBaseProps, IFieldPropOptions } from '../../types';

export interface ToggleButtonGroupProps extends FieldBaseProps<any | any[]>, Omit<MuiToggleButtonGroupProps, 'value'|'onChange'> {
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

export declare const ToggleButtonGroup: React.ForwardRefExoticComponent<ToggleButtonGroupProps>;
