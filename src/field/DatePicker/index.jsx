import React from 'react';
import { useControllableValue } from 'ahooks';
import { TextField } from '@mui/material';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers';
import { observer } from '@formily/react';

import { useFormilyFieldProps } from '../../hooks';

export const DatePicker = observer((props) => {
  const formilyFieldProps = useFormilyFieldProps(props);
  const {
    // eslint-disable-next-line no-unused-vars
    value: valueProp, onChange: onChangeProp, defaultValue,
    size, showInnerLabel, label, fullWidth, color, variant, TextFieldSx,
    ...restProps
  } = formilyFieldProps;
  const [ value, onChange ] = useControllableValue(formilyFieldProps);
  return (
    <MuiDatePicker
      label={showInnerLabel ? label : undefined}
      value={value || null}
      onChange={onChange}
      renderInput={(params) => <TextField {...params} size={size} fullWidth={fullWidth} color={color} variant={variant} sx={TextFieldSx}/>}
      {...restProps}
    />
  );
});

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

DatePicker.displayName = 'muiFormilyDatePicker';
