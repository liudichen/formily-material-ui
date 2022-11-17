import { isVoidField } from '@formily/core';
import { connect, mapProps } from '@formily/react';

import { Switch } from './index';

export const FormilySwitch = connect(
  Switch,
  mapProps(
    {
      initialValue: 'defaultValue',
      readOnly: true,
      required: true,
      disabled: true,
    },
    (props, field) => {
      if (!field || isVoidField(field)) return props;
      return {
        ...props,
        error: props.error ?? field.selfInvalid,
      };
    },
  ),
);

FormilySwitch.displayName = 'muiFormilySwitch';
