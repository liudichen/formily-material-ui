import { connect, mapProps } from '@formily/react';

import { DatePicker } from './index';

export const FormilyDatePicker = connect(
  DatePicker,
  mapProps({
    initialValue: 'defaultValue',
    readOnly: true,
    disabled: true,
  }, (props, field) => {
    if (!field) return props;
    return {
      ...props,
      label: props.label ?? field.title,
    };
  }),
);

FormilyDatePicker.displayName = 'muiFormilyDatePicker';
