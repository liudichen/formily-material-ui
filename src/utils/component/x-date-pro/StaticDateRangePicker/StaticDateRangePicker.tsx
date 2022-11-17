/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  PickerStaticWrapper,
  usePickerState,
  StaticPickerProps,
  PickersStaticWrapperSlotsComponent,
  DateInputSlotsComponent,
  PickersStaticWrapperSlotsComponentsProps,
} from '@mui/x-date-pickers/internals';
import { useDateRangeValidation } from '../internal/hooks/validation/useDateRangeValidation';
import {
  DateRangePickerView,
  DateRangePickerViewSlotsComponent,
  DateRangePickerViewSlotsComponentsProps,
} from '../DateRangePicker/DateRangePickerView';
import {
  useDateRangePickerDefaultizedProps,
  BaseDateRangePickerProps,
  dateRangePickerValueManager,
} from '../DateRangePicker/shared';


export interface StaticDateRangePickerSlotsComponent
  extends PickersStaticWrapperSlotsComponent,
  DateRangePickerViewSlotsComponent,
  DateInputSlotsComponent {}

export interface StaticDateRangePickersSlotsComponentsProps
  extends PickersStaticWrapperSlotsComponentsProps,
  DateRangePickerViewSlotsComponentsProps {}

export interface StaticDateRangePickerProps<TInputDate, TDate>
  extends StaticPickerProps<BaseDateRangePickerProps<TInputDate, TDate>> {
  /**
   * Overrideable components.
   * @default {}
   */
  components?: Partial<StaticDateRangePickerSlotsComponent>;
  /**
   * The props used for each component slot.
   * @default {}
   */
  componentsProps?: Partial<StaticDateRangePickersSlotsComponentsProps>;
}

type StaticDateRangePickerComponent = (<TInputDate, TDate = TInputDate>(
  props: StaticDateRangePickerProps<TInputDate, TDate> & React.RefAttributes<HTMLDivElement>,
) => JSX.Element) & { propTypes?: any };

/**
 *
 * Demos:
 *
 * - [Date Range Picker](https://mui.com/x/react-date-pickers/date-range-picker/)
 *
 * API:
 *
 * - [StaticDateRangePicker API](https://mui.com/x/api/date-pickers/static-date-range-picker/)
 */
export const StaticDateRangePicker = React.forwardRef(function StaticDateRangePicker<
  TInputDate,
  TDate = TInputDate,
>(inProps: StaticDateRangePickerProps<TInputDate, TDate>, ref: React.Ref<HTMLDivElement>) {

  const props = useDateRangePickerDefaultizedProps<
  TInputDate,
  TDate,
  StaticDateRangePickerProps<TInputDate, TDate>
  >(inProps, 'MuiStaticDateRangePicker');

  const [ currentlySelectingRangeEnd, setCurrentlySelectingRangeEnd ] = React.useState<
  'start' | 'end'
  >('start');

  const validationError = useDateRangeValidation(props);

  const { pickerProps, inputProps, wrapperProps } = usePickerState(
    props,
    dateRangePickerValueManager,
  );

  const {
    displayStaticWrapperAs = 'mobile',
    value,
    onChange,
    components,
    componentsProps,
    className,
    ...other
  } = props;

  const DateInputProps = {
    ...inputProps,
    ...other,
    currentlySelectingRangeEnd,
    setCurrentlySelectingRangeEnd,
    validationError,
    components,
    componentsProps,
    ref,
  };

  return (
    <PickerStaticWrapper
      displayStaticWrapperAs={displayStaticWrapperAs}
      components={components}
      componentsProps={componentsProps}
      className={className}
      {...wrapperProps}
    >
      <DateRangePickerView
        open={wrapperProps.open}
        DateInputProps={DateInputProps}
        currentlySelectingRangeEnd={currentlySelectingRangeEnd}
        setCurrentlySelectingRangeEnd={setCurrentlySelectingRangeEnd}
        components={components}
        componentsProps={componentsProps}
        {...pickerProps}
        {...other}
      />
    </PickerStaticWrapper>
  );
}) as StaticDateRangePickerComponent;
