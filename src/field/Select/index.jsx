import React from 'react';
import { observer } from '@formily/react';

import { useFormilyFieldProps } from '../../hooks';
import { SelectBase } from './SelectBase';
import { UseFormilyFieldPropsFormFieldBaseConfig, UseFormilyFieldPropsFormItemConfig } from '../../utils';

export const Select = observer((props) => {
  const formilyFieldProps = useFormilyFieldProps(props, props.withFormItem ? { ...UseFormilyFieldPropsFormItemConfig, ...UseFormilyFieldPropsFormFieldBaseConfig, options: true, required: true, label: true, tooltip: true, error: true, fullWidth: true } : { ...UseFormilyFieldPropsFormFieldBaseConfig, options: true, required: true, label: true, tooltip: true, error: true, fullWidth: true });
  return (
    <SelectBase
      {...formilyFieldProps}
    />
  );
}, { forwardRef: true });

Select.displayName = 'muiFormilySelect';
