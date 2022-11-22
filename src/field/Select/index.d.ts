import React from 'react';
import { AutocompleteProps, FormLabelProps } from '@mui/material';

import { FieldBaseProps, IFieldOptionItem, IFieldPropOptions } from '../../types';

export interface SelectProps extends FieldBaseProps<IFieldOptionItem | IFieldOptionItem[] | null | undefined>, Omit<AutocompleteProps<unknown, boolean | undefined, boolean | undefined, boolean | undefined>, 'value' | 'onChange' | 'defaultValue' | 'options'> {
  options?: IFieldPropOptions,
  refreshOptionsFlag?: any,
  label?: string,
  /** 显示内部label? */
  showInnerLabel?: boolean,
  placeholder?: string,
  required?: boolean,
  labelProps?: FormLabelProps,
  tooltip?: React.ReactNode,
  variant?: 'outlined' | 'filled' | 'standard',
  /** 不从FormLayout获取fullWidth信息 */
  noFormLayout?: boolean,
}

export declare const Select: React.ForwardRefExoticComponent<any, SelectProps>;
