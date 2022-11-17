import { isVoidField } from '@formily/core';
import { connect, mapProps } from '@formily/react';

import { Input } from './index';

export const FormilyInput = connect(
  Input,
  mapProps((props, field) => {
    if (!field || isVoidField(field)) return props;
    return {
      ...props,
      error: props.error ?? field.selfInvalid,
      tooltip: props.tooltip ?? field.description,
      readOnly: props.readOnly ?? field.readOnly,
      disabled: props.disabled ?? field.disabled,
      required: props.required ?? field.required,
      defaultValue: props.defaultValue ?? field.initialValue,
      label: props.label ?? field.title,
    };
  }),
);

FormilyInput.displayName = 'muiFormilyInput';
