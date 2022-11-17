import { isVoidField } from '@formily/core';
import { connect, mapProps } from '@formily/react';

import { Select } from './index';

export const FormilySelect = connect(
  Select,
  mapProps({
    description: 'tooltip',
    title: 'label',
    dataSource: 'options',
    initialValue: 'defaultValue',
    readOnly: true,
    required: true,
    disabled: true,
  }, (props, field) => {
    if (!field || isVoidField(field)) return props;
    return {
      ...props,
      error: props.error ?? field.selfInvalid,
    };
  }),
);

FormilySelect.displayName = 'muiFormilySelect';
