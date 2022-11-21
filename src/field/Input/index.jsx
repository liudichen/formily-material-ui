import React from 'react';
import { useControllableValue, useCreation, useMemoizedFn } from 'ahooks';
import { TextField as MuiTextField, InputAdornment, IconButton, FormLabel, Stack, Tooltip } from '@mui/material';
import { Close, HelpOutline } from '@mui/icons-material';
import { observer } from '@formily/react';

import { useFormLayout } from '../../layout/FormLayout';
import { useFormilyFieldProps } from '../../hooks';

export const Input = observer((props) => {
  const formilyFieldProps = useFormilyFieldProps(props, { error: true, tooltip: true, required: true, label: true });
  const {
    // eslint-disable-next-line no-unused-vars
    value: valueProp, onChange: onChangeProp, defaultValue,
    label, showInnerLabel, labelProps,
    tooltip,
    showClear: showClearProp, required, error, readOnly,
    inputProps, InputProps, endAdornmentItem, fullWidth,
    ...restProps
  } = formilyFieldProps;
  const [value, onChange] = useControllableValue(formilyFieldProps, { defaultValue: '' });
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
  }, [showClearProp, props.type]);
  const renderLabel = () => {
    if (!showInnerLabel) return undefined;
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
}, { forwardRef: true });

Input.defaultProps = {
  size: 'small',
};

Input.displayName = 'muiFormilyInput';
