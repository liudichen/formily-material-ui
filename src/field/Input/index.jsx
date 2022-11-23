import React from 'react';
import { observer } from '@formily/react';

import { useFormilyFieldProps } from '../../hooks';
import { InputBase } from './InputBase';
import { UseFormilyFieldPropsFormFieldBaseConfig, UseFormilyFieldPropsFormItemConfig } from '../../utils';

export const Input = observer((props) => {
  const formilyFieldProps = useFormilyFieldProps(props, props.withFormItem ? { ...UseFormilyFieldPropsFormItemConfig, ...UseFormilyFieldPropsFormFieldBaseConfig } : { ...UseFormilyFieldPropsFormFieldBaseConfig, error: true, tooltip: true, required: true, label: true, fullWidth: true });
  return (
    <InputBase
      {...formilyFieldProps}
    />
  );
}, { forwardRef: true });

Input.displayName = 'muiFormilyInput';
