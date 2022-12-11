import React from 'react';
import { useControllableValue } from 'ahooks';
import { Box, TextField } from '@mui/material';
import { DateRangePicker as MuiDateRangePicker } from 'mui-component';

import { FormItemBase } from '../../layout';

export const DateRangePickerBase = (props) => {
  const {
    labelPosition, labelWidth, labelAlign, labelWrap, wrapperAlign, wrapperWrap, wrapperWidth, fullWidth, colon, tooltipIcon, tooltipLayout, showFeedback, feedbackLayout,
    noLabel, label, labelStyle, wrapperStyle, tooltip, required, feedbackStatus, feedbackText, feedbackIcon, extra, addonBefore,
    addonAfter, formItemCls, formItemStyle, formItemPrefixCls, error, feedbackCls, extraCls,
    keepTopSpace,
    // eslint-disable-next-line no-unused-vars
    value: valueProp, onChange: onChangeProp, defaultValue, noField, noFormLayout, withFormItem,
    size, toText, toSx, color, variant, TextFieldSx,
    ...restProps
  } = props;
  const [value, onChange] = useControllableValue(props);
  const dom = (
    <MuiDateRangePicker
      value={value || [null, null]}
      onChange={onChange}
      renderInput={(startProps, endProps) => (
        <>
          <TextField {...startProps} size={size} fullWidth={fullWidth} color={color} variant={variant} sx={TextFieldSx} />
          <Box sx={toSx}>{toText}</Box>
          <TextField {...endProps} size={size} fullWidth={fullWidth} color={color} variant={variant} sx={TextFieldSx} />
        </>
      )}
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

DateRangePickerBase.defaultProps = {
  size: 'small',
  toText: '-',
  toSx: { mx: 0.5 },
  inputFormat: 'YYYY-MM-DD',
  componentsProps: {
    actionBar: {
      actions: ['today', 'clear', 'accept'],
      translate: 'yes',
    },
  },
};

DateRangePickerBase.displayName = 'iimm.Mui.Formily.DateRangePickerBase';
