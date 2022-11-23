import React from 'react';
import { observer } from '@formily/react';

import { TransferBase } from './TransferBase';
import { useFormilyFieldProps } from '../../hooks';
import { UseFormilyFieldPropsFormFieldBaseConfig, UseFormilyFieldPropsFormItemConfig } from '../../utils';

export const Transfer = observer((props) => {
  const formilyFieldProps = useFormilyFieldProps(props, props.withFormItem ? { ...UseFormilyFieldPropsFormItemConfig, ...UseFormilyFieldPropsFormFieldBaseConfig, options: true } : { ...UseFormilyFieldPropsFormFieldBaseConfig, options: true, error: true });
  return (
    <TransferBase
      {...formilyFieldProps}
    />
  );
});

Transfer.displayName = 'muiFormilyTransfer';
