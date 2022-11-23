import React from 'react';
import { useControllableValue } from 'ahooks';
import { Switch as MuiSwitch, Stack, useTheme } from '@mui/material';

import { FormItemBase } from '../../layout';

export const SwitchBase = React.forwardRef((props) => {
  const {
    labelPosition, labelWidth, labelAlign, labelWrap, wrapperAlign, wrapperWrap, wrapperWidth, fullWidth, colon, tooltipIcon, tooltipLayout, showFeedback, feedbackLayout,
    noLabel, label, labelStyle, wrapperStyle, tooltip, required, feedbackStatus, feedbackText, feedbackIcon, extra, addonBefore,
    addonAfter, formItemCls: className, formItemStyle: style, error, feedbackCls, extraCls,
    keepTopSpace,
    // eslint-disable-next-line no-unused-vars
    value: valueProp, onChange: onChangeProp, defaultValue, noField, noFormLayout, withFormItem,
    readOnly,
    left, right, spacing,
    color, edge,
    ...restProps
  } = props;
  const [value, onChange] = useControllableValue(props);
  const theme = useTheme();
  const dom = (
    <Stack
      direction='row'
      alignItems='center'
      spacing={spacing}
    >
      { !!left && (
        <span
          onClick={() => { if (!readOnly && !props.disabled) onChange(false); }}
        >
          <label
            style={{
              cursor: readOnly || props.disabled ? 'default' : 'pointer',
              color: error && !value ? 'red' : undefined,
            }}>
            {left}
          </label>
        </span>
      )}
      <MuiSwitch
        required={required}
        checked={!!value}
        onChange={(e) => { if (!readOnly) onChange(e.target.checked); }}
        edge={edge ?? (left ? false : 'start')}
        {...restProps}
      />
      { !!right && (
        <span
          onClick={() => { if (!readOnly && !props.disabled) onChange(true); }}
        >
          <label
            style={{
              cursor: readOnly || props.disabled ? 'default' : 'pointer',
              color: value ? error ? 'red' : theme.palette?.[color]?.dark : undefined,
            }}
          >
            {right}
          </label>
        </span>
      )}
    </Stack>
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

SwitchBase.defaultProps = {
  color: 'primary',
};

SwitchBase.displayName = 'muiFormilySwitchBase';
