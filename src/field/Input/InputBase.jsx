import React from 'react';
import { useControllableValue, useCreation, useMemoizedFn } from 'ahooks';
import { TextField as MuiTextField, InputAdornment, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

import { FormItemBase } from '../../layout';
import { renderInnerLabel } from '../../utils';

export const InputBase = (props) => {
  const {
    labelPosition, labelWidth, labelAlign, labelWrap, wrapperAlign, wrapperWrap, wrapperWidth, fullWidth, colon, tooltipIcon, tooltipLayout, showFeedback, feedbackLayout,
    noLabel, label, labelStyle, wrapperStyle, tooltip, required, feedbackStatus, feedbackText, feedbackIcon, extra, addonBefore,
    addonAfter, formItemCls, formItemStyle, formItemPrefixCls, error, feedbackCls, extraCls,
    keepTopSpace,
    // eslint-disable-next-line no-unused-vars
    value: valueProp, onChange: onChangeProp, defaultValue, noField, noFormLayout, withFormItem,
    showInnerLabel, innerLabelProps,
    showClear: showClearProp, readOnly,
    inputProps, InputProps, endAdornmentItem,
    ...restProps
  } = props;
  const [value, onChange] = useControllableValue(props, { defaultValue: '' });
  const onTextFieldChange = useMemoizedFn((e) => {
    if (readOnly || props.disabled) return;
    const v = e.target.value;
    if (props.type === 'number' && v !== '') {
      onChange(+v);
    } else {
      onChange(v ?? '');
    }
  });
  const showClear = useCreation(() => {
    if (!props?.type || props.type === 'text') {
      return showClearProp ?? true;
    }
    return showClearProp ?? false;
  }, [showClearProp, props.type]);
  const dom = (
    <MuiTextField
      value={value ?? ''}
      onChange={onTextFieldChange}
      label={renderInnerLabel({ showInnerLabel, label, required, error, innerLabelProps, tooltip })}
      error={error}
      inputProps={{
        readOnly,
        ...(inputProps || {}),
      }}
      InputProps={{
        endAdornment: !readOnly && !props.disabled && showClear && (!!value || value === 0) ? (
          <InputAdornment
            position='end'
            sx={{
              mr: props.multiline ? 1.5 : undefined,
            }}
          >
            <IconButton
              edge='end'
              tabIndex={-1}
              onClick={() => {
                if (!readOnly && !props.disabled) onChange('');
              }}
            >
              <Close fontSize='small' />
            </IconButton>
            { endAdornmentItem }
          </InputAdornment>
        ) : endAdornmentItem ? (
          <InputAdornment
            position='end'
            sx={{
              mr: props.multiline ? 1.5 : undefined,
            }}
          >
            { endAdornmentItem }
          </InputAdornment>
        ) : null,
        ...(InputProps || {}),
      }}
      fullWidth={fullWidth}
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

InputBase.defaultProps = {
  size: 'small',
};

InputBase.displayName = 'muiFormilyInputBase';
