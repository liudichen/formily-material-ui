import React from 'react';
import { useControllableValue } from 'ahooks';
import { observer } from '@formily/react';
import { TextField } from '@mui/material';
import { TimePicker as MuiTimePicker } from '@mui/x-date-pickers';

import { useFormilyFieldProps } from '../../hooks';

export const TimePicker = observer((props) => {
  const formilyFieldProps = useFormilyFieldProps(props);
  const {
    // eslint-disable-next-line no-unused-vars
    value: valueProp, onChange: onChangeProp, defaultValue, noField,
    size, fullWidth, color, variant, TextFieldSx,
    label, showInnerLabel, showSecond, views, inputFormat,
    ...restProps
  } = formilyFieldProps;
  const [value, onChange] = useControllableValue(formilyFieldProps, { defaultValue: null });
  return (
    <MuiTimePicker
      value={value || null}
      onChange={onChange}
      label={showInnerLabel ? label : undefined}
      renderInput={(params) => <TextField {...params} size={size} fullWidth={fullWidth} color={color} variant={variant} sx={TextFieldSx}/>}
      views={views ?? (showSecond ? ['hours', 'minutes', 'seconds'] : undefined)}
      inputFormat={inputFormat ?? (showSecond ? 'HH:mm:ss' : undefined)}
      {...restProps}
    />
  );
}, { forwardRef: true });

TimePicker.defaultProps = {
  size: 'small',
  componentsProps: {
    actionBar: {
      actions: ['today', 'clear', 'accept'],
      translate: 'yes',
    },
  },
};

TimePicker.displayName = 'muiFormilyTimePicker';
