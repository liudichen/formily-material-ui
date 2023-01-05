import React from 'react';
import { observer } from '@formily/react';

import { useFormilyFieldProps } from '../../hooks';
import { SelectBase } from './SelectBase';

export const Select = observer((props) => {
  const formilyFieldProps = useFormilyFieldProps(props, { options: true, required: true, label: true, tooltip: true, error: true, fullWidth: true, showInnerLabel: true });
  return (
    <SelectBase
      {...formilyFieldProps}
    />
  );
}, { displayName: 'iimm.Mui.Formily.Select' });

