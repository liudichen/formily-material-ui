import React from 'react';
import { useControllableValue } from 'ahooks';
import { TextField } from '@mui/material';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers';

import { FormItemBase } from '../../layout';

export const DatePickerBase = (props) => {
  const {
    labelPosition, labelWidth, labelAlign, labelWrap, wrapperAlign, wrapperWrap, wrapperWidth, fullWidth, colon, tooltipIcon, tooltipLayout, showFeedback, feedbackLayout,
    noLabel, label, labelStyle, wrapperStyle, tooltip, required, feedbackStatus, feedbackText, feedbackIcon, extra, addonBefore,
    addonAfter, formItemCls, formItemStyle, formItemPrefixCls, error, feedbackCls, extraCls,
    keepTopSpace,
    // eslint-disable-next-line no-unused-vars
    value: valueProp, onChange: onChangeProp, defaultValue, noField, noFormLayout, withFormItem,
    size, showInnerLabel, color, variant, TextFieldSx,
    ...restProps
  } = props;
  const [ value, onChange ] = useControllableValue(props);
  const dom = (
    <MuiDatePicker
      label={showInnerLabel ? label : undefined}
      value={value || null}
      onChange={onChange}
      renderInput={(params) => <TextField color={color} {...params} error={error || params?.error} size={size} fullWidth={fullWidth} variant={variant} sx={TextFieldSx} />}
      {...restProps}
    />
  );
  return withFormItem ? (
    <FormItemBase
      className={formItemCls}
      style={formItemStyle}
      prefixCls={formItemPrefixCls}
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
};

DatePickerBase.defaultProps = {
  size: 'small',
  inputFormat: 'YYYY-MM-DD',
  componentsProps: {
    actionBar: {
      actions: [ 'today', 'clear', 'accept' ],
      translate: 'yes',
    },
  },
};

DatePickerBase.displayName = 'iimm.Mui.Formily.DatePickerBase';
