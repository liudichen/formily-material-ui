import React from 'react';
import { observer } from '@formily/react';

import { DateTimePickerBase } from './DateTimePickerBase';
import { useFormilyFieldProps } from '../../hooks';
import { UseFormilyFieldPropsFormFieldBaseConfig, UseFormilyFieldPropsFormItemConfig } from '../../utils';

export const DateTimePicker = observer((props) => {
  const formilyFieldProps = useFormilyFieldProps(props, props.withFormItem ? { ...UseFormilyFieldPropsFormItemConfig, ...UseFormilyFieldPropsFormFieldBaseConfig } : { ...UseFormilyFieldPropsFormFieldBaseConfig, fullWidth: true, label: true });
  return (
    <DateTimePickerBase
      {...formilyFieldProps}
    />
  );
});

DateTimePicker.displayName = 'muiFormilyDateTimePicker';
