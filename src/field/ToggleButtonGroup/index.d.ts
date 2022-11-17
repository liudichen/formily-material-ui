import React from 'react';
import { SxProps } from '@mui/material';

import { FieldBaseProps, IColors, IFieldPropOptions } from '../../types';

export interface ToggleButtonGroupProps extends FieldBaseProps<any | any[]> {
  options?: IFieldPropOptions
  minCount?: number,
  maxCount?: number,
  exclusive?: boolean,
  layout?: 'horizontal' | 'vertical',
  color?: IColors | 'standard',
  size?: 'small'| 'medium'| 'large'| string,
  sx?: SxProps,
  itemSx?: SxProps,
  itemFullWidth?: boolean,
  itemWidth?: number | string,
  itemMinWidth?: number | string,
  itemMaxWidth?: number | string,
}

export declare const ToggleButtonGroup: React.FC<ToggleButtonGroupProps>;
