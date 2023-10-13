import React from 'react';
import { useControllableValue, useMemoizedFn, useSafeState } from 'ahooks';
import { Checkbox, FormControlLabel, FormGroup, Skeleton, Tooltip } from '@mui/material';
import { Refresh } from '@mui/icons-material';
import { isEqual, isInArray } from '@iimm/shared';

import { useFetchOptions } from '../../hooks';
import { COLORS } from '../../utils';
import { FormItemBase } from '../../layout/FormItem/FormItemBase';
import '../../styles/refresh.scss';

export const CheckboxGroupBase = (props) => {
  const {
    labelPosition, labelWidth, labelAlign, labelWrap, wrapperAlign, wrapperWrap, wrapperWidth, fullWidth, colon, tooltipIcon, tooltipLayout, showFeedback, feedbackLayout,
    noLabel, label, labelStyle, wrapperStyle, tooltip, required, feedbackStatus, feedbackText, feedbackIcon, extra, addonBefore,
    addonAfter, formItemCls, formItemStyle, formItemPrefixCls, error, feedbackCls, extraCls,
    keepTopSpace,
    options: optionsProp,
    // eslint-disable-next-line no-unused-vars
    value: valueProp, onChange: onChangeProp, defaultValue, children, noField, noFormLayout, withFormItem,
    readOnly: readOnly, disabled,
    minCount, maxCount, layout,
    itemSx, labelPlacement,
    row,
    icon, checkedIcon, size, color,
    // eslint-disable-next-line no-unused-vars
    showRefresh, refresh: refreshProp, onRefreshChange: onRefreshChangeProp, refreshText = '刷新选项', refreshIcon = <Refresh sx={{ color: '#eb2f96' }} />,
    ...restProps
  } = props;
  const [ refresh, onRefreshChange ] = useControllableValue(props, { trigger: 'onRefreshChange', valuePropName: 'refresh' });
  const [ loading, setLoading ] = useSafeState(false);
  const [ optionsValues, setOptionsValues ] = useSafeState([]);
  const [ value, onChange ] = useControllableValue(props);
  const options = useFetchOptions(optionsProp, { onLoading: setLoading, callback: (opts) => setOptionsValues(opts.map((ele) => ele.value)), deps: refresh });

  const doRefresh = useMemoizedFn(() => {
    onRefreshChange(refresh + 1);
  });

  const handleChange = useMemoizedFn((e, optionValue) => {
    if (readOnly) { return; }
    const checked = e.target.checked;
    let newValue = [ ...(value || []) ];
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
    <FormGroup row={row ?? layout === 'horizontal'} {...restProps}>
      {options.map((item, index) => (
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
      { showRefresh && !readOnly && !disabled && (
        <FormControlLabel className='refresh-icon-i'
          label={refreshText}
          control={
            <Tooltip arrow placement='top' title={refreshText}>
              <IconButton size={size} onClick={doRefresh} >
                {refreshIcon}
              </IconButton>
            </Tooltip>
          }
        />
      )}
    </FormGroup>
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

CheckboxGroupBase.defaultProps = {
  layout: 'horizontal',
  withFormItem: true,
  size: 'small',
};

CheckboxGroupBase.displayName = 'iimm.Mui.Formily.CheckboxGroupBase';
