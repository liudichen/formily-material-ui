import React from 'react';
import { observer } from '@formily/react';

import { DateTimePickerBase } from './DateTimePickerBase';
import { useFormilyFieldProps } from '../../hooks';

export const DateTimePicker = observer((props) => {
  const formilyFieldProps = useFormilyFieldProps(props, { fullWidth: true, label: true });
  return (
    <DateTimePickerBase
      {...formilyFieldProps}
    />
  );
});

DateTimePicker.displayName = 'muiFormilyDateTimePicker';
