import React from 'react';
import { useControllableValue, useMemoizedFn, useSafeState } from 'ahooks';
import { Checkbox, FormControlLabel, FormGroup, Skeleton } from '@mui/material';

import { useFetchOptions } from '../../hooks';
import { isEqual, isInArray, COLORS } from '../../utils';
import { FormItemBase } from '../../layout/FormItem/FormItemBase';

export const CheckboxGroupBase = React.forwardRef((props, ref) => {
  const {
    labelPosition, labelWidth, labelAlign, labelWrap, wrapperAlign, wrapperWrap, wrapperWidth, fullWidth, colon, tooltipIcon, tooltipLayout, showFeedback, feedbackLayout,
    noLabel, label, labelStyle, wrapperStyle, tooltip, required, feedbackStatus, feedbackText, feedbackIcon, extra, addonBefore,
    addonAfter, formItemCls: className, formItemStyle: style, error, feedbackCls, extraCls,
    keepTopSpace,
    options: optionsProp, withFormItem,
    // eslint-disable-next-line no-unused-vars
    value: valueProp, onChange: onChangeProp, defaultValue, children, noField, noFormLayout,
    readOnly, disabled,
    minCount, maxCount, layout,
    itemSx, labelPlacement,
    row,
    icon, checkedIcon, size, color,
    ...restProps
  } = props;
  const [loading, setLoading] = useSafeState(false);
  const [optionsValues, setOptionsValues] = useSafeState([]);
  const [value, onChange] = useControllableValue(props);
  const options = useFetchOptions(optionsProp, { onLoading: setLoading, callback: (opts) => setOptionsValues(opts.map((ele) => ele.value)) });
  const handleChange = useMemoizedFn((e, optionValue) => {
    if (readOnly) { return; }
    const checked = e.target.checked;
    let newValue = [...(value || [])];
    const optionIndex = newValue.findIndex((ele) => isEqual(ele, optionValue));
    if (optionIndex === -1) {
      if (checked) {
        newValue.push(optionValue);
      }
    } else if (!checked) {
      newValue.splice(optionIndex, 1);
    }
    newValue.sort((a, b) => {
      const indexA = options.findIndex((opt) => isEqual(a, opt.value));
      const indexB = options.findIndex((opt) => isEqual(b, opt.value));
      return indexA - indexB;
    });
    newValue = newValue.filter((item) => isInArray(item, optionsValues));
    let shouldUpdate = true;
    if ((minCount !== undefined && newValue.length < minCount) || (maxCount !== undefined && newValue.length > maxCount)) {
      shouldUpdate = false;
    }
    if (shouldUpdate) {
      onChange(newValue);
    }
  });
  const dom = loading ? (
    <Skeleton
      variant='rectangular'
      animation='wave'
      width={'100%'}
    >
      <Checkbox />
    </Skeleton>
  ) : (
    <FormGroup row={row ?? layout === 'horizontal'} ref={ref} {...restProps}>
      { options.map((item, index) => (
        <FormControlLabel
          key={index}
          label={item.label ?? ''}
          labelPlacement={labelPlacement}
          control={
            <Checkbox
              size={item.size ?? size}
              color={item.color && COLORS.includes(item.color) ? item.color : (color)}
              disabled={item.disabled ?? disabled}
              checked={isInArray(item.value, value)}
              onChange={(e) => handleChange(e, item.value)}
              icon={item.icon ?? icon}
              checkedIcon={item.checkedIcon ?? checkedIcon}
              required={item.required}
              sx={item.sx ?? itemSx}
            />
          }
        />
      ))}
    </FormGroup>
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

CheckboxGroupBase.defaultProps = {
  layout: 'horizontal',
  withFormItem: true,
};

CheckboxGroupBase.displayName = 'muiFormilyCheckboxGroupBase';
