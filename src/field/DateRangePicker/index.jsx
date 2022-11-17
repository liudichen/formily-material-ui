import React from 'react';
import { useControllableValue } from 'ahooks';
import { Box, TextField } from '@mui/material';

import { DateRangePicker as MuiDateRangePicker } from '../../utils/component/x-date-pro/DateRangePicker';

export const DateRangePicker = (props) => {
  const {
    // eslint-disable-next-line no-unused-vars
    value: valueProp, onChange: onChangeProp, defaultValue,
    size, toText, toSx,
    ...restProps
  } = props;
  const [ value, onChange ] = useControllableValue(props);
  return (
    <MuiDateRangePicker
      value={value || [ null, null ]}
      onChange={onChange}
      renderInput={(startProps, endProps) => (
        <>
          <TextField {...startProps} size={size}/>
          <Box sx={toSx}>{ toText }</Box>
          <TextField {...endProps} size={size} />
        </>
      )}
      {...restProps}
    />
  );
};

DateRangePicker.defaultProps = {
  size: 'small',
  startText: '起',
  endText: '止',
  toText: '-',
  toSx: { mx: 0.5 },
  inputFormat: 'YYYY-MM-DD',
  componentsProps: {
    actionBar: {
      actions: [ 'today', 'clear', 'accept', 'cancel' ],
      translate: 'yes',
    },
  },
};
