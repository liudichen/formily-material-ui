import React from 'react';
import { observer } from '@formily/react';

import { useFormilyFieldProps } from '../../hooks';
import { InputBase } from './InputBase';

export const Input = observer((props) => {
  const formilyFieldProps = useFormilyFieldProps(props, { error: true, tooltip: true, required: true, label: true, fullWidth: true });
  return (
    <InputBase
      {...formilyFieldProps}
    />
  );
}, { forwardRef: true });

Input.displayName = 'muiFormilyInput';
