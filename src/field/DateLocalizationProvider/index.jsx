import React from 'react';
import { LocalizationProvider, zhCN } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import zh from 'dayjs/locale/zh-cn';

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
  adapterLocale: zh,
  localeText: zhCN.components.MuiLocalizationProvider.defaultProps.localeText,
};
