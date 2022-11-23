import React from 'react';
import { observer } from '@formily/react';

import { DatePickerBase } from './DatePickerBase';
import { useFormilyFieldProps } from '../../hooks';

export const DatePicker = observer((props) => {
  const formilyFieldProps = useFormilyFieldProps(props, { fullWidth: true, label: true });
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
