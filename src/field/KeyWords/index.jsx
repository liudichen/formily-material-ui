import React from 'react';
import { observer } from '@formily/react';

import { KeyWordsBase } from './KeyWordsBase';
import { useFormilyFieldProps } from '../../hooks';
import { UseFormilyFieldPropsFormFieldBaseConfig, UseFormilyFieldPropsFormItemConfig } from '../../utils';

export const KeyWords = observer((props) => {
  const formilyFieldProps = useFormilyFieldProps(props, props.withFormItem ? { ...UseFormilyFieldPropsFormItemConfig, ...UseFormilyFieldPropsFormFieldBaseConfig } : { ...UseFormilyFieldPropsFormFieldBaseConfig, error: true });

  return (
    <KeyWordsBase
      {...formilyFieldProps}
    />
  );
});

KeyWords.displayName = 'muiFormilyKeyWords';
