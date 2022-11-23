import React from 'react';
import { observer } from '@formily/react';

import { SwitchBase } from './SwitchBase';
import { useFormilyFieldProps } from '../../hooks';

export const Switch = observer((props) => {
  const formilyFieldProps = useFormilyFieldProps(props, { required: true, error: true });
  return (
    <SwitchBase
      {...formilyFieldProps}
    />
  );
});

Switch.displayName = 'muiFormilySwitch';
