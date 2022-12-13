import React from 'react';
import { observer } from '@formily/react';

import { TimePickerBase } from './TimePickerBase';
import { useFormilyFieldProps } from '../../hooks';

export const TimePicker = observer((props) => {
  const formilyFieldProps = useFormilyFieldProps(props, { fullWidth: true, label: true });
  return (
    <TimePickerBase
      {...formilyFieldProps}
    />
  );
}, { displayName: 'iimm.Mui.Formily.TimePicker' });

TimePicker.displayName = 'iimm.Mui.Formily.TimePicker';
