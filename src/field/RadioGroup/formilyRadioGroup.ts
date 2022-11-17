import { connect, mapProps } from '@formily/react';

import { RadioGroup } from './index';

export const FormilyRadioGroup = connect(
  RadioGroup,
  mapProps({
    dataSource: 'options',
    initialValue: 'defaultValue',
    readOnly: true,
    disabled: true,
  }),
);
FormilyRadioGroup.displayName = 'muiFormilyRadioGroup';
