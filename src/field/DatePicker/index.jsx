import React from 'react';
import { useControllableValue } from 'ahooks';
import { TextField } from '@mui/material';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

export const DatePicker = (props) => {
  const {
    // eslint-disable-next-line no-unused-vars
    value: valueProp, onChange: onChangeProp, defaultValue,
    size, labelPosition, label,
    ...restProps
  } = props;
  const [ value, onChange ] = useControllableValue(props);
  return (
    <MuiDatePicker
      label={labelPosition === 'inner' ? label : undefined}
      value={value ? dayjs.isDayjs(value) ? value : dayjs(value) : null}
      onChange={onChange}
      renderInput={(params) => <TextField {...params} size={size}/>}
      {...restProps}
      componentsProps={{
        actionBar: {
          actions: [ 'today', 'clear', 'accept', 'cancel' ],
          translate: 'yes',
        },
      }}
    />
  );
};

DatePicker.defaultProps = {
  size: 'small',
  inputFormat: 'YYYY-MM-DD',
};
