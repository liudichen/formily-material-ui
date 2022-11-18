import React from 'react';
import { useControllableValue } from 'ahooks';
import { TextField } from '@mui/material';
import { DateTimePicker as MuiDateTimePicker } from '@mui/x-date-pickers';
import { observer, useField } from '@formily/react';

export const DateTimePicker = observer((props) => {
  const {
    // eslint-disable-next-line no-unused-vars
    value: valueProp, onChange: onChangeProp, defaultValue,
    size, fullWidth, color, variant, TextFieldSx,
    label, labelPosition,
    ...restProps
  } = props;
  const [ value, onChange ] = useControllableValue(props, { defaultValue: null });
  const field = useField();

  return (
    <MuiDateTimePicker
      label={labelPosition === 'inner' ? (label ?? field?.title) : undefined}
      value={value || null}
      onChange={onChange}
      renderInput={(params) => <TextField {...params} size={size} fullWidth={fullWidth} color={color} variant={variant} sx={TextFieldSx}/>}
      {...restProps}
    />
  );
});

DateTimePicker.defaultProps = {
  size: 'small',
  inputFormat: 'YYYY/MM/DD hh:mm a',
  disableMaskedInput: true,
  componentsProps: {
    actionBar: {
      actions: [ 'today', 'clear', 'accept' ],
      translate: 'yes',
    },
  },
};

DateTimePicker.displayName = 'muiFormilyDateTimePicker';
