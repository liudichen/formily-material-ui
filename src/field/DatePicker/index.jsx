import React from 'react';
import { useControllableValue } from 'ahooks';
import { TextField } from '@mui/material';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers';

export const DatePicker = (props) => {
  const {
    // eslint-disable-next-line no-unused-vars
    value: valueProp, onChange: onChangeProp, defaultValue,
    size, labelPosition, label, fullWidth, color, variant, TextFieldSx,
    ...restProps
  } = props;
  const [ value, onChange ] = useControllableValue(props);
  return (
    <MuiDatePicker
      label={labelPosition === 'inner' ? label : undefined}
      value={value || null}
      onChange={onChange}
      renderInput={(params) => <TextField {...params} size={size} fullWidth={fullWidth} color={color} variant={variant} sx={TextFieldSx}/>}
      {...restProps}
    />
  );
};

DatePicker.defaultProps = {
  size: 'small',
  inputFormat: 'YYYY-MM-DD',
  componentsProps: {
    actionBar: {
      actions: [ 'today', 'clear', 'accept' ],
      translate: 'yes',
    },
  },
};
