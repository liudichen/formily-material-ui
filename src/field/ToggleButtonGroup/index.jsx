import React from 'react';
import { observer } from '@formily/react';

import { ToggleButtonGroupBase } from './ToggleButtonGroupBase';
import { useFormilyFieldProps } from '../../hooks';
import { UseFormilyFieldPropsFormFieldBaseConfig, UseFormilyFieldPropsFormItemConfig } from '../../utils';

export const ToggleButtonGroup = observer((props) => {
  const formilyFieldProps = useFormilyFieldProps(props, props.withFormItem ? { ...UseFormilyFieldPropsFormItemConfig, ...UseFormilyFieldPropsFormFieldBaseConfig, options: true } : { ...UseFormilyFieldPropsFormFieldBaseConfig, options: true });
  return (
    <ToggleButtonGroupBase
      {...formilyFieldProps}
    />
  );
}, { forwardRef: true });

ToggleButtonGroup.defaultProps = {
  size: 'small',
  color: 'primary',
  itemSx: { fontWeight: 'bold' },
  itemMinWidth: 50,
};

ToggleButtonGroup.displayName = 'muiFormilyToggleButtonGroup';
