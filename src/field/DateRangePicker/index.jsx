import React from 'react';
import { observer } from '@formily/react';

import { DateRangePickerBase } from './DateRangePickerBase';
import { useFormilyFieldProps } from '../../hooks';
import { UseFormilyFieldPropsFormFieldBaseConfig, UseFormilyFieldPropsFormItemConfig } from '../../utils';

export const DateRangePicker = observer((props) => {
  const formilyFieldProps = useFormilyFieldProps(props, props.withFormItem ? { ...UseFormilyFieldPropsFormItemConfig, ...UseFormilyFieldPropsFormFieldBaseConfig } : { ...UseFormilyFieldPropsFormFieldBaseConfig, fullWidth: true });
  return (
    <DateRangePickerBase
      {...formilyFieldProps}
    />
  );
}, { forwardRef: true });

DateRangePicker.displayName = 'muiFormilyDateRangePicker';
