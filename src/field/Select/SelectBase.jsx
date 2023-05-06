import React, { useRef } from 'react';
import { useControllableValue, useMemoizedFn, useSafeState } from 'ahooks';
import { Autocomplete, TextField } from '@mui/material';
import { isEqual, isInArray } from '@iimm/shared';

import { useFetchOptions } from '../../hooks';
import { renderInnerLabel } from '../../utils';
import { FormItemBase } from '../../layout';
import { useEffect } from 'react';

export const SelectBase = (props) => {
  const {
    labelPosition, labelWidth, labelAlign, labelWrap, wrapperAlign, wrapperWrap, wrapperWidth, fullWidth, colon, tooltipIcon, tooltipLayout, showFeedback, feedbackLayout,
    noLabel, label, labelStyle, wrapperStyle, tooltip, required, feedbackStatus, feedbackText, feedbackIcon, extra, addonBefore,
    addonAfter, formItemCls, formItemStyle, formItemPrefixCls, error, feedbackCls, extraCls,
    keepTopSpace,
    options: optionsProp, refreshOptionsFlag, showInnerLabel, innerLabelProps,
    // eslint-disable-next-line no-unused-vars
    value: valueProp, onChange: onChangeProp, defaultValue, noField, noFormLayout, withFormItem,
    allowExtraValue,
    placeholder, variant,
    disableCloseOnSelect,
    ...restProps
  } = props;
  const fetchRef = useRef(false);
  const [ loading, setLoading ] = useSafeState(false);
  const [ value, onChange ] = useControllableValue(props);
  const options = useFetchOptions(optionsProp, { onLoading: setLoading, deps: refreshOptionsFlag });
  const onValidChange = useMemoizedFn((e, v) => {
    if (allowExtraValue) {
      onChange(v);
    } else {
      const optValues = (options || []).map((ele) => ele.value);
      const value = props.multiple ? (v ? v.filter((ele) => isInArray(ele.value, optValues)) : v) : ((!v || isInArray(v.value, optValues)) ? v : null);
      onChange(value);
    }
  });
  const syncOptionsValue = useMemoizedFn(() => {
    onValidChange(undefined, value);
  });
  useEffect(() => {
    if (!allowExtraValue && fetchRef.current) {
      syncOptionsValue();
    }
  }, [ options, allowExtraValue ]);
  const dom = (
    <Autocomplete
      loading={loading}
      options={options}
      value={value || (props.multiple ? [] : null)}
      fullWidth={fullWidth}
      onChange={onValidChange}
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

SelectBase.displayName = 'iimm.Mui.Formily.SelectBase';
