import React from 'react';
import { observer } from '@formily/react';

import { RadioGroupBase } from './RadioGroupBase';
import { useFormilyFieldProps } from '../../hooks';
import { UseFormilyFieldPropsFormFieldBaseConfig, UseFormilyFieldPropsFormItemConfig } from '../../utils';

export const RadioGroup = observer((props) => {
  const formilyFieldProps = useFormilyFieldProps(props, props.withFormItem ? { ...UseFormilyFieldPropsFormItemConfig, ...UseFormilyFieldPropsFormFieldBaseConfig, options: true } : { ...UseFormilyFieldPropsFormFieldBaseConfig, options: true });
  return (
    <RadioGroupBase
      {...formilyFieldProps}
    />
  );
}, { forwardRef: true });

RadioGroup.displayName = 'muiFormilyRadioGroup';
