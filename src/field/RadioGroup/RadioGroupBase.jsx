import React from 'react';
import { useControllableValue, useMemoizedFn, useSafeState } from 'ahooks';
import { FormControlLabel, Radio, RadioGroup as MuiRadioGroup, Skeleton } from '@mui/material';
import { Refresh } from '@mui/icons-material';
import { isEqual } from '@iimm/shared';

import { FormItemBase } from '../../layout';
import { useFetchOptions } from '../../hooks';
import { COLORS } from '../../utils';
import '../../styles/refresh.scss';

export const RadioGroupBase = (props) => {
  const {
    labelPosition, labelWidth, labelAlign, labelWrap, wrapperAlign, wrapperWrap, wrapperWidth, fullWidth, colon, tooltipIcon, tooltipLayout, showFeedback, feedbackLayout,
    noLabel, label, labelStyle, wrapperStyle, tooltip, required, feedbackStatus, feedbackText, feedbackIcon, extra, addonBefore,
    addonAfter, formItemCls, formItemStyle, formItemPrefixCls, error, feedbackCls, extraCls,
    keepTopSpace,
    options: optionsProp,
    // eslint-disable-next-line no-unused-vars
    value: valueProp, onChange: onChangeProp, defaultValue, noField, noFormLayout, withFormItem,
    layout, sx, size, color, disabled, itemSx, readOnly,
    labelPlacement, icon, checkedIcon, row,
    // eslint-disable-next-line no-unused-vars
    showRefresh, refresh: refreshProp, onRefreshChange: onRefreshChangeProp, refreshText = '刷新选项', refreshIcon = <Refresh sx={{ color: '#eb2f96' }} />,
    ...restProps
  } = props;
  const [ loading, setLoading ] = useSafeState(false);
  const [ refresh, onRefreshChange ] = useControllableValue(props, { trigger: 'onRefreshChange', valuePropName: 'refresh', defaultValue: 0 });
  const options = useFetchOptions(optionsProp, { onLoading: setLoading, deps: refresh });
  const [ value, onChange ] = useControllableValue(props);

  const doRefresh = useMemoizedFn(() => {
    onRefreshChange((+refresh || 0) + 1);
  });

  const handleChange = useMemoizedFn((value) => {
    if (!readOnly) onChange(value ?? null);
  });
  const dom = loading ? (
    <Skeleton
      variant='rectangular'
      animation='wave'
      width={'100%'}
    >
      <Radio />
    </Skeleton>
  ) : (
    <MuiRadioGroup
      row={row ?? layout === 'horizontal'}
      name={name}
      sx={sx}
      {...restProps}
    >
      {options.map((item, index) => (
        <FormControlLabel
          key={index}
          label={item.label ?? ''}
          value={item.value}
          labelPlacement={labelPlacement}
          control={
            <Radio
              size={item?.size ?? size}
              color={item.color && COLORS.includes(item.color) ? item.color : color}
              disabled={item.disabled ?? disabled}
              icon={item.icon ?? icon}
              checkedIcon={item.checkedIcon ?? checkedIcon}
              required={item.required}
              sx={item.sx ?? itemSx}
              value={item.value}
              onChange={() => handleChange(item.value)}
              checked={isEqual(item.value, value)}
            />
          }
        />
      ))}
      { showRefresh && !readOnly && !disabled && (
        <FormControlLabel className='refresh-icon-i'
          label={refreshText}
          control={
            <IconButton size={size} onClick={doRefresh} title={typeof refreshText === 'string' ? refreshText : undefined}>
              {refreshIcon}
            </IconButton>
          }
        />
      )}
    </MuiRadioGroup>
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

RadioGroupBase.defaultProps = {
  layout: 'horizontal',
};

RadioGroupBase.displayName = 'iimm.Mui.Formily.RadioGroupBase';
