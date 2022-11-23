import React from 'react';
import { observer } from '@formily/react';

import { TransferBase } from './TransferBase';
import { useFormilyFieldProps } from '../../hooks';

export const Transfer = observer((props) => {
  const formilyFieldProps = useFormilyFieldProps(props, { options: true, error: true });
  return (
    <TransferBase
      {...formilyFieldProps}
    />
  );
});

Transfer.displayName = 'muiFormilyTransfer';
