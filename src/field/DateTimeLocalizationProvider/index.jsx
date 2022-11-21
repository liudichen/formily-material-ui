import React from 'react';
import { LocalizationProvider, zhCN } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import zh from 'dayjs/locale/zh-cn';

export const DateTimeLocalizationProvider = (props) => {
  const { children, ...restProps } = props;
  return (
    <LocalizationProvider
      {...restProps}
    >
      {children}
    </LocalizationProvider>
  );
};

DateTimeLocalizationProvider.defaultProps = {
  dateAdapter: AdapterDayjs,
  adapterLocale: zh,
  localeText: zhCN.components.MuiLocalizationProvider.defaultProps.localeText,
};

DateTimeLocalizationProvider.displayName = 'muiFormilyDateTimeLocalizationProvider';
