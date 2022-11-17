import React from 'react';
import { AutocompleteProps, FormLabelProps } from '@mui/material';

import { FieldBaseProps, IFieldOptionItem, IFieldPropOptions } from '../../types';

export interface SelectProps extends FieldBaseProps<IFieldOptionItem | IFieldOptionItem[] | null | undefined>, Omit<AutocompleteProps<unknown, boolean | undefined, boolean | undefined, boolean | undefined>, 'value' | 'onChange' | 'defaultValue' | 'options'> {
  options?: IFieldPropOptions,
  refreshOptionsFlag?: any,
  label?: string,
  labelPosition?: 'top' | 'left' | 'inner',
  placeholder?: string,
  required?: boolean,
  labelProps?: FormLabelProps,
  tooltip?: React.ReactNode,
  variant?: 'outlined' | 'filled' | 'standard',
}

export declare const Select: React.ForwardRefRenderFunction<unknown, SelectProps>;

export declare const FormilySelect: React.FC<SelectProps> & {
  displayName: 'formilyMuiSelect'
};
