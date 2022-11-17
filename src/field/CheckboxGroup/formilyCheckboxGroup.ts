import { connect, mapProps } from '@formily/react';

import { CheckboxGroup } from './index';

export const FormilyCheckboxGroup = connect(
  CheckboxGroup,
  mapProps({
    dataSource: 'options',
    initialValue: 'defaultValue',
    readOnly: true,
    disabled: true,
  }),
);

FormilyCheckboxGroup.displayName = 'muiFormilyCheckboxGroup';
