import React, { forwardRef } from 'react';
import { useControllableValue, useCreation, useMemoizedFn } from 'ahooks';
import { TextField as MuiTextField, InputAdornment, IconButton, FormLabel, Stack, Tooltip } from '@mui/material';
import { Close, HelpOutline } from '@mui/icons-material';

import { useFormLayout } from '../../layout/FormLayout';

export const Input = forwardRef((props, ref) => {
  const {
    // eslint-disable-next-line no-unused-vars
    value: valueProp, onChange: onChangeProp, defaultValue,
    label, labelPosition, labelProps,
    tooltip,
    showClear: showClearProp, required, error, readOnly,
    inputProps, InputProps, endAdornmentItem, fullWidth,
    ...restProps
  } = props;
  const [ value, onChange ] = useControllableValue(props, { defaultValue: '' });
  const layout = useFormLayout();
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
  }, [ showClearProp, props.type ]);
  const renderLabel = () => {
    if ((labelPosition ?? layout.labelPosition) !== 'inner') return;
    return (
      <FormLabel error={error} {...(labelProps || {})}>
        <Stack direction='row' width='100%'>
          <span title={label} style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {required && (
              <span style={{ color: 'red' }}>
              *&nbsp;
              </span>
            )}
            { label }
          &nbsp;
          </span>
          { !!tooltip && (
            <Tooltip
              title={tooltip}
              arrow
              placement='top'
            >
              <HelpOutline
                fontSize='small'
              />
            </Tooltip>
          )}
        </Stack>
      </FormLabel>
    );
  };
  return (
    <MuiTextField
      ref={ref}
      value={value ?? ''}
      onChange={onTextFieldChange}
      label={renderLabel()}
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
      fullWidth={fullWidth ?? layout?.fullWidth}
      {...restProps}
    />
  );
});

Input.defaultProps = {
  size: 'small',
};