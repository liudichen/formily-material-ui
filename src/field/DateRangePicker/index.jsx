import React from 'react';
import { observer } from '@formily/react';

import { DateRangePickerBase } from './DateRangePickerBase';
import { useFormilyFieldProps } from '../../hooks';

export const DateRangePicker = observer((props) => {
  const formilyFieldProps = useFormilyFieldProps(props, { fullWidth: true });
  return (
    <DateRangePickerBase
      {...formilyFieldProps}
    />
  );
});

DateRangePicker.displayName = 'iimm.Mui.Formily.DateRangePicker';
