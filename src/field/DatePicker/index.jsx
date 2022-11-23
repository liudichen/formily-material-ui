import React from 'react';
import { observer } from '@formily/react';

import { useFormilyFieldProps } from '../../hooks';
import { DatePickerBase } from './DatePickerBase';
import { UseFormilyFieldPropsFormFieldBaseConfig, UseFormilyFieldPropsFormItemConfig } from '../../utils';

export const DatePicker = observer((props) => {
  const formilyFieldProps = useFormilyFieldProps(props, props.withFormItem ? { ...UseFormilyFieldPropsFormItemConfig, ...UseFormilyFieldPropsFormFieldBaseConfig } : { ...UseFormilyFieldPropsFormFieldBaseConfig, fullWidth: true, label: true });
  return (
    <DatePickerBase
      {...formilyFieldProps}
    />
  );
});

DatePicker.defaultProps = {
  size: 'small',
  inputFormat: 'YYYY-MM-DD',
  componentsProps: {
    actionBar: {
      actions: ['today', 'clear', 'accept'],
      translate: 'yes',
    },
  },
};

DatePicker.displayName = 'muiFormilyDatePicker';
