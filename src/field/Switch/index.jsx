import React from 'react';
import { useControllableValue } from 'ahooks';
import { Switch as MuiSwitch, Stack, useTheme } from '@mui/material';
import { observer } from '@formily/react';

import { useFormilyFieldProps } from '../../hooks';

export const Switch = observer((props) => {
  const formilyFieldProps = useFormilyFieldProps(props, { required: true });
  const {
    // eslint-disable-next-line no-unused-vars
    value: valueProp, onChange: onChangeProp, defaultValue, noField,
    readOnly,
    left, right, error, spacing,
    color, edge,
    ...restProps
  } = formilyFieldProps;
  const [value, onChange] = useControllableValue(formilyFieldProps);
  const theme = useTheme();
  return (
    <Stack
      direction='row'
      alignItems='center'
      spacing={spacing}
    >
      { !!left && (
        <span
          onClick={() => { if (!readOnly && !props.disabled) onChange(false); }}
        >
          <label
            style={{
              cursor: readOnly || props.disabled ? 'default' : 'pointer',
              color: error && !value ? 'red' : undefined,
            }}>
            {left}
          </label>
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
          onClick={() => { if (!readOnly && !props.disabled) onChange(true); }}
        >
          <label
            style={{
              cursor: readOnly || props.disabled ? 'default' : 'pointer',
              color: value ? error ? 'red' : theme.palette?.[color]?.dark : undefined,
            }}
          >
            {right}
          </label>
        </span>
      )}
    </Stack>
  );
}, { forwardRef: true });

Switch.defaultProps = {
  color: 'primary',
};

Switch.displayName = 'muiFormilySwitch';
