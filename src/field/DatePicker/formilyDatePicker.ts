import { connect, mapProps } from '@formily/react';

import { DatePicker } from './index';

export const FormilyDatePicker = connect(
  DatePicker,
  mapProps({
    initialValue: 'defaultValue',
    readOnly: true,
    disabled: true,
  }),
);

FormilyDatePicker.displayName = 'muiFormilyDatePicker';
