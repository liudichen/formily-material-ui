import React from 'react';
import { useControllableValue, useSafeState } from 'ahooks';
import { Autocomplete, TextField } from '@mui/material';
import { isEqual } from '@iimm/shared';

import { useFetchOptions } from '../../hooks';
import { renderInnerLabel } from '../../utils';
import { FormItemBase } from '../../layout';

export const SelectBase = (props) => {
  const {
    labelPosition, labelWidth, labelAlign, labelWrap, wrapperAlign, wrapperWrap, wrapperWidth, fullWidth, colon, tooltipIcon, tooltipLayout, showFeedback, feedbackLayout,
    noLabel, label, labelStyle, wrapperStyle, tooltip, required, feedbackStatus, feedbackText, feedbackIcon, extra, addonBefore,
    addonAfter, formItemCls, formItemStyle, formItemPrefixCls, error, feedbackCls, extraCls,
    keepTopSpace,
    options: optionsProp, refreshOptionsFlag, showInnerLabel, innerLabelProps,
    // eslint-disable-next-line no-unused-vars
    value: valueProp, onChange: onChangeProp, defaultValue, noField, noFormLayout, withFormItem,
    placeholder, variant,
    disableCloseOnSelect,
    ...restProps
  } = props;
  const [loading, setLoading] = useSafeState(false);
  const [value, onChange] = useControllableValue(props);
  const options = useFetchOptions(optionsProp, { onLoading: setLoading, deps: refreshOptionsFlag });
  const dom = (
    <Autocomplete
      loading={loading}
      options={options}
      value={value || (props.multiple ? [] : null)}
      fullWidth={fullWidth}
      onChange={(e, v) => onChange(v)}
      isOptionEqualToValue={(op, v) => isEqual(op.value, v?.value)}
      disableCloseOnSelect={disableCloseOnSelect ?? props.multiple}
      renderInput={(params) => (
        <TextField
          placeholder={placeholder}
          {...params}
          error={error}
          variant={variant}
          label={renderInnerLabel({ showInnerLabel, label, error, required, innerLabelProps, tooltip })}
        />
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

SelectBase.defaultProps = {
  size: 'small',
  variant: 'outlined',
};

SelectBase.displayName = 'muiFormilySelectBase';
