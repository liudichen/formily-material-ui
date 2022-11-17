import { connect, mapProps } from '@formily/react';

import { ToggleButtonGroup } from './index';

export const FormilyToggleButtonGroup = connect(
  ToggleButtonGroup,
  mapProps({
    dataSource: 'options',
    initialValue: 'defaultValue',
    readOnly: true,
    disabled: true,
  }),
);

FormilyToggleButtonGroup.displayName = 'muiFormilyToggleButtonGroup';
