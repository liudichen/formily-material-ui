import React from 'react';
import { useControllableValue } from 'ahooks';
import { isVoidField } from '@formily/core';
import { connect, mapProps } from '@formily/react';
import { Switch as MuiSwitch, Stack, useTheme } from '@mui/material';

export const Switch = (props) => {
  const {
    // eslint-disable-next-line no-unused-vars
    value: valueProp, onChange: onChangeProp, defaultValue,
    readOnly,
    left, right, error, spacing,
    color, edge,
    ...restProps
  } = props;
  const [ value, onChange ] = useControllableValue(props);
  const theme = useTheme();
  return (
    <Stack
      direction='row'
      alignItems='center'
      spacing={spacing}
    >
      { !!left && (
        <span
          style={{
            cursor: readOnly || props.disabled ? 'default' : 'pointer',
            color: error && !value ? 'red' : undefined,
          }}
          onClick={() => { if (!readOnly && !props.disabled) onChange(false); }}
        >
          <label>{left}</label>
        </span>
      )}
      <MuiSwitch
        checked={!!value}
        onChange={(e) => { if (!readOnly) onChange(e.target.checked); }}
        edge={edge ?? (left ? false : 'start')}
        {...restProps}
      />
      { !!right && (
        <span
          style={{
            cursor: readOnly || props.disabled ? 'default' : 'pointer',
            color: value ? error ? 'red' : theme.palette?.[color]?.dark : undefined,
          }}
          onClick={() => { if (!readOnly && !props.disabled) onChange(true); }}
        >
          <label>{right}</label>
        </span>
      )}
    </Stack>
  );
};

Switch.defaultProps = {
  color: 'primary',
};

export const FormilySwitch = connect(
  Switch,
  mapProps(
    {
      description: 'tooltip',
      title: 'label',
      initialValue: 'defaultValue',
      readOnly: true,
      required: true,
      disabled: true,
    },
    (props, field) => {
      if (!field || isVoidField) return props;
      return {
        ...props,
        error: field.selfInvalid,
      };
    }
  )
);

FormilySwitch.displayName = 'muiFormilySwitch';
