import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export const DateLocalizationProvider = (props) => {
  const { children, ...restProps } = props;
  return (
    <LocalizationProvider
      {...restProps}
    >
      {children}
    </LocalizationProvider>
  );
};

DateLocalizationProvider.defaultProps = {
  dateAdapter: AdapterDayjs,
};
