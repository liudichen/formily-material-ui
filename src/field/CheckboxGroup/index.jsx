import React from 'react';
import { observer } from '@formily/react';

import { useFormilyFieldProps } from '../../hooks';
import { UseFormilyFieldPropsFormItemConfig, UseFormilyFieldPropsFormFieldBaseConfig } from '../../utils';
import { CheckboxGroupBase } from './CheckboxGroupBase';

export const CheckboxGroup = observer((props) => {
  const formilyFieldProps = useFormilyFieldProps(props, props.withFormItem ? { ...UseFormilyFieldPropsFormItemConfig, ...UseFormilyFieldPropsFormFieldBaseConfig, options: true } : { ...UseFormilyFieldPropsFormFieldBaseConfig, options: true });
  return (
    <CheckboxGroupBase {...formilyFieldProps}/>
  );
}, { forwardRef: true });

CheckboxGroup.displayName = 'muiFormilyCheckboxGroup';
