import React from 'react';
import { observer } from '@formily/react';

import { KeyWordsBase } from './KeyWordsBase';
import { useFormilyFieldProps } from '../../hooks';

export const KeyWords = observer((props) => {
  const formilyFieldProps = useFormilyFieldProps(props, { error: true });

  return (
    <KeyWordsBase
      {...formilyFieldProps}
    />
  );
});

KeyWords.displayName = 'muiFormilyKeyWords';
