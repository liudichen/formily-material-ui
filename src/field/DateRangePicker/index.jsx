import React from 'react';
import { useControllableValue } from 'ahooks';
import { Box, TextField } from '@mui/material';
import { observer } from '@formily/react';

import { DateRangePicker as MuiDateRangePicker } from '../../utils/component/DateRangePicker';
import { useFormilyFieldProps } from '../../hooks';

export const DateRangePicker = observer((props) => {
  const formilyFieldProps = useFormilyFieldProps(props);
  const {
    // eslint-disable-next-line no-unused-vars
    value: valueProp, onChange: onChangeProp, defaultValue,
    size, toText, toSx, fullWidth, color, variant, TextFieldSx,
    ...restProps
  } = formilyFieldProps;
  const [ value, onChange ] = useControllableValue(formilyFieldProps);
  return (
    <MuiDateRangePicker
      value={value || [ null, null ]}
      onChange={onChange}
      renderInput={(startProps, endProps) => (
        <>
          <TextField {...startProps} size={size} fullWidth={fullWidth} color={color} variant={variant} sx={TextFieldSx}/>
          <Box sx={toSx}>{ toText }</Box>
          <TextField {...endProps} size={size} fullWidth={fullWidth} color={color} variant={variant} sx={TextFieldSx}/>
        </>
      )}
      {...restProps}
    />
  );
}, { forwardRef: true });

DateRangePicker.defaultProps = {
  size: 'small',
  toText: '-',
  toSx: { mx: 0.5 },
  inputFormat: 'YYYY-MM-DD',
  componentsProps: {
    actionBar: {
      actions: [ 'today', 'clear', 'accept' ],
      translate: 'yes',
    },
  },
};

DateRangePicker.displayName = 'muiFormilyDateRangePicker';
