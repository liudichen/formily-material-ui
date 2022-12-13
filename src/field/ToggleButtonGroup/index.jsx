import React from 'react';
import { observer } from '@formily/react';

import { ToggleButtonGroupBase } from './ToggleButtonGroupBase';
import { useFormilyFieldProps } from '../../hooks';

export const ToggleButtonGroup = observer((props) => {
  const formilyFieldProps = useFormilyFieldProps(props, { options: true });
  return (
    <ToggleButtonGroupBase
      {...formilyFieldProps}
    />
  );
}, { displayName: 'iimm.Mui.Formily.ToggleButtonGroup' });

ToggleButtonGroup.defaultProps = {
  size: 'small',
  color: 'primary',
  itemSx: { fontWeight: 'bold' },
  itemMinWidth: 50,
};

ToggleButtonGroup.displayName = 'iimm.Mui.Formily.ToggleButtonGroup';
