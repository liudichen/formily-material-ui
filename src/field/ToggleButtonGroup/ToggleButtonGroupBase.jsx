import React from 'react';
import { useSafeState, useMemoizedFn, useControllableValue, useCreation } from 'ahooks';
import { Checkbox, Skeleton, ToggleButtonGroup as MuiToggleButtonGroup, ToggleButton as MuiToggleButton } from '@mui/material';
import { isEqual, isInArray } from '@iimm/shared';

import { FormItemBase } from '../../layout';
import { COLORS } from '../../utils';
import { useFetchOptions } from '../../hooks';

export const ToggleButtonGroupBase = (props) => {
  const {
    labelPosition, labelWidth, labelAlign, labelWrap, wrapperAlign, wrapperWrap, wrapperWidth, fullWidth, colon, tooltipIcon, tooltipLayout, showFeedback, feedbackLayout,
    noLabel, label, labelStyle, wrapperStyle, tooltip, required, feedbackStatus, feedbackText, feedbackIcon, extra, addonBefore,
    addonAfter, formItemCls, formItemStyle, formItemPrefixCls, error, feedbackCls, extraCls,
    keepTopSpace,
    options: optionsProp,
    // eslint-disable-next-line no-unused-vars
    value: valueProp, onChange: onChangeProp, defaultValue, noField, noFormLayout, withFormItem,
    minCount, maxCount, exclusive, orientation,
    layout, size, color, disabled, readOnly, itemSx: itemSxProp, itemWidth, itemMinWidth, itemMaxWidth, itemFullWidth,
    ...restProps
  } = props;
  const [ loading, setLoading ] = useSafeState(false);
  const [ value, onChange ] = useControllableValue(props);
  const [ optionsValues, setOptionsValues ] = useSafeState([]);
  const options = useFetchOptions(optionsProp, { onLoading: setLoading, callback: (opts) => setOptionsValues(opts.map((ele) => ele.value)) });
  const itemSx = useCreation(() => {
    if (!itemWidth && !itemMaxWidth && !itemMinWidth) return itemSxProp;
    const sx = { ...(itemSxProp || {}) };
    if (!itemFullWidth && itemWidth) {
      sx.width = itemWidth;
    }
    if (itemMinWidth) sx.minWidth = itemMinWidth;
    if (itemMaxWidth) sx.maxWidth = itemMaxWidth;
    return sx;
  }, [ itemSxProp, itemWidth, itemFullWidth, itemMinWidth, itemMaxWidth ]);

  const handleChange = useMemoizedFn((v) => {
    if (readOnly) { return; }
    if (exclusive) {
      if (!(minCount === 1 && v !== undefined)) {
        onChange(v);
      }
    } else {
      const newValue = [ ...(value || []) ];
      if (isInArray(v, newValue)) {
        const index = newValue.findIndex((ele) => isEqual(v, ele));
        newValue.splice(index, 1);
      } else {
        newValue.push(v);
      }
      if (!((minCount !== undefined && newValue.length < minCount) || (maxCount !== undefined && newValue.length > maxCount))) {
        newValue.sort((a, b) => {
          const indexA = options.findIndex((opt) => isEqual(a, opt.value));
          const indexB = options.findIndex((opt) => isEqual(b, opt.value));
          return indexA - indexB;
        });
        onChange(newValue.filter((item) => isInArray(item, optionsValues)));
      }
    }
  });
  const dom = loading ? (
    (
      <Skeleton
        variant='rectangular'
        animation='wave'
        width={'100%'}
      >
        <Checkbox />
      </Skeleton>
    )
  ) : (
    <MuiToggleButtonGroup
      orientation={orientation ?? layout}
      disabled={disabled}
      exclusive={exclusive}
      fullWidth={itemFullWidth}
      size={size}
      color={color}
      {...restProps}
    >
      {options.map((item, index) => (
        <MuiToggleButton
          key={index}
          size={item?.size ?? size}
          color={item.color && COLORS.includes(item.color) ? item.color : color}
          disabled={item.disabled ?? disabled}
          value={item.value}
          onClick={() => handleChange(item.value)}
          selected={exclusive ? isEqual(item.value, value) : isInArray(item.value, value)}
          sx={item?.sx ?? itemSx}
        >
          {item.label}
        </MuiToggleButton>
      ))}
    </MuiToggleButtonGroup>
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

ToggleButtonGroupBase.defaultProps = {
  size: 'small',
  color: 'primary',
  itemSx: { fontWeight: 'bold' },
  itemMinWidth: 50,
};

ToggleButtonGroupBase.displayName = 'iimm.Mui.Formily.ToggleButtonGroupBase';
