import { createTheme } from '@mui/material/styles';

createTheme({
  components: {
    MuiDateRangePicker: {
      defaultProps: {
        calendars: 2,
        // @ts-expect-error invalid MuiDateRangePicker prop
        someRandomProp: true,
      },
    },
    MuiDateRangePickerDay: {
      defaultProps: {
        color: 'red',
        // @ts-expect-error invalid MuiDateRangePickerDay prop
        someRandomProp: true,
      },
    },
    MuiDateRangePickerInput: {
      defaultProps: {
        disabled: true,
        // @ts-expect-error invalid MuiDateRangePickerInput prop
        someRandomProp: true,
      },
    },
    MuiDateRangePickerToolbar: {
      defaultProps: {
        toolbarTitle: 'test',
        // @ts-expect-error invalid MuiDateRangePickerToolbar prop
        someRandomProp: true,
      },
    },
    MuiDateRangePickerViewDesktop: {
      defaultProps: {
        disabled: true,
        // @ts-expect-error invalid MuiDateRangePickerViewDesktop prop
        someRandomProp: true,
      },
    },
    MuiDesktopDateRangePicker: {
      defaultProps: {
        open: true,
        // @ts-expect-error invalid MuiDesktopDateRangePicker prop
        someRandomProp: true,
      },
    },
    MuiMobileDateRangePicker: {
      defaultProps: {
        disableFuture: true,
        // @ts-expect-error invalid MuiMobileDateRangePicker prop
        someRandomProp: true,
      },
    },
    MuiStaticDateRangePicker: {
      defaultProps: {
        disabled: true,
        someRandomProp: true,
      },
    },
  },
});
