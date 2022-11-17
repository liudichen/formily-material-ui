import { connect, mapProps } from '@formily/react';

import { DateRangePicker } from './index';

export const FormilyDateRangePicker = connect(
  DateRangePicker,
  mapProps({
    readOnly: true,
    disabled: true,
    initialValue: 'defaultValue',
  }),
);
