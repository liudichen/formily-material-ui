import React from 'react';
import { observer } from '@formily/react';

import { useFormilyFieldProps } from '../../hooks';
import { FormItemBase } from './FormItemBase';
import { UseFormilyFieldPropsFormItemConfig } from '../../utils';

export const FormItem = observer((props) => {
  const formilyFieldProps = useFormilyFieldProps(props, UseFormilyFieldPropsFormItemConfig);
  return (
    <FormItemBase
      {...formilyFieldProps}
    />
  );
});

FormItem.displayName = 'iimm.Mui.Formily.FormItem';
