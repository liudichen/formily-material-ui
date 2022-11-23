import React from 'react';
import { useControllableValue } from 'ahooks';
import { TextField } from '@mui/material';
import { TimePicker as MuiTimePicker } from '@mui/x-date-pickers';

import { FormItemBase } from '../../layout';

export const TimePickerBase = React.forwardRef((props, ref) => {
  const {
    labelPosition, labelWidth, labelAlign, labelWrap, wrapperAlign, wrapperWrap, wrapperWidth, fullWidth, colon, tooltipIcon, tooltipLayout, showFeedback, feedbackLayout,
    noLabel, label, labelStyle, wrapperStyle, tooltip, required, feedbackStatus, feedbackText, feedbackIcon, extra, addonBefore,
    addonAfter, fieldItemCls: className, fieldItemStyle: style, error, feedbackCls, extraCls,
    keepTopSpace,
    // eslint-disable-next-line no-unused-vars
    value: valueProp, onChange: onChangeProp, defaultValue, noField, noFormLayout, withFormItem,
    size, color, variant, TextFieldSx,
    showInnerLabel, showSecond, views, inputFormat,
    ...restProps
  } = props;
  const [value, onChange] = useControllableValue(props, { defaultValue: null });
  const dom = (
    <MuiTimePicker
      ref={ref}
      value={value || null}
      onChange={onChange}
      label={showInnerLabel ? label : undefined}
      renderInput={(params) => <TextField {...params} size={size} fullWidth={fullWidth} color={color} variant={variant} sx={TextFieldSx}/>}
      views={views ?? (showSecond ? ['hours', 'minutes', 'seconds'] : undefined)}
      inputFormat={inputFormat ?? (showSecond ? 'HH:mm:ss' : undefined)}
      {...restProps}
    />
  );
  return withFormItem ? (
    <FormItemBase
      className={className}
      style={style}
      extra={extra}
      extraCls={extraCls}
      error={error}
      noLabel={noLabel}
      keepTopSpace={keepTopSpace}
      label={label}
      labelStyle={labelStyle}
      labelPosition={labelPosition}
      labelWidth={labelWidth}
      labelAlign={labelAlign}
      labelWrap={labelWrap}
      wrapperAlign={wrapperAlign}
      wrapperWrap={wrapperWrap}
      wrapperWidth={wrapperWidth}
      wrapperStyle={wrapperStyle}
      fullWidth={fullWidth}
      colon={colon}
      required={required}
      tooltip={tooltip}
      tooltipIcon={tooltipIcon}
      tooltipLayout={tooltipLayout}
      showFeedback={showFeedback}
      feedbackLayout={feedbackLayout}
      feedbackCls={feedbackCls}
      feedbackIcon={feedbackIcon}
      feedbackStatus={feedbackStatus}
      feedbackText={feedbackText}
      addonBefore={addonBefore}
      addonAfter={addonAfter}
    >
      {dom}
    </FormItemBase>
  ) : dom;
});

TimePickerBase.defaultProps = {
  size: 'small',
  componentsProps: {
    actionBar: {
      actions: ['today', 'clear', 'accept'],
      translate: 'yes',
    },
  },
};

TimePickerBase.displayName = 'muiFormilyTimePickerBase';
