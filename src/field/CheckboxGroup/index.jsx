import React from 'react';
import { observer } from '@formily/react';

import { CheckboxGroupBase } from './CheckboxGroupBase';
import { useFormilyFieldProps } from '../../hooks';

export const CheckboxGroup = observer((props) => {
  const formilyFieldProps = useFormilyFieldProps(props, { options: true });
  return (
    <CheckboxGroupBase {...formilyFieldProps}/>
  );
});

CheckboxGroup.displayName = 'muiFormilyCheckboxGroup';
