import React from 'react';
import { observer } from '@formily/react';

import { SwitchBase } from './SwitchBase';
import { useFormilyFieldProps } from '../../hooks';
import { UseFormilyFieldPropsFormFieldBaseConfig, UseFormilyFieldPropsFormItemConfig } from '../../utils';

export const Switch = observer((props) => {
  const formilyFieldProps = useFormilyFieldProps(props, props.withFormItem ? { ...UseFormilyFieldPropsFormItemConfig, ...UseFormilyFieldPropsFormFieldBaseConfig } : { ...UseFormilyFieldPropsFormFieldBaseConfig, required: true, error: true });
  return (
    <SwitchBase
      {...formilyFieldProps}
    />
  );
}, { forwardRef: true });

Switch.displayName = 'muiFormilySwitch';
