import React from 'react';
import { useControllableValue } from 'ahooks';
import { TextField } from '@mui/material';
import { DateTimePicker as MuiDateTimePicker } from '@mui/x-date-pickers';
import { observer } from '@formily/react';

import { useFormilyFieldProps } from '../../hooks';

export const DateTimePicker = observer((props) => {
  const formilyFieldProps = useFormilyFieldProps(props, { label: true });
  const {
    // eslint-disable-next-line no-unused-vars
    value: valueProp, onChange: onChangeProp, defaultValue,
    size, fullWidth, color, variant, TextFieldSx,
    label, labelPosition,
    ...restProps
  } = formilyFieldProps;
  const [ value, onChange ] = useControllableValue(formilyFieldProps, { defaultValue: null });

  return (
    <MuiDateTimePicker
      label={labelPosition === 'inner' ? label : undefined}
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
