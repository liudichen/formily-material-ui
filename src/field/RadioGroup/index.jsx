import React from 'react';
import { observer } from '@formily/react';

import { RadioGroupBase } from './RadioGroupBase';
import { useFormilyFieldProps } from '../../hooks';

export const RadioGroup = observer((props) => {
  const formilyFieldProps = useFormilyFieldProps(props, { options: true });
  return (
    <RadioGroupBase
      {...formilyFieldProps}
    />
  );
}, { displayName: 'iimm.Mui.Formily.RadioGroup' });

RadioGroup.displayName = 'iimm.Mui.Formily.RadioGroup';
