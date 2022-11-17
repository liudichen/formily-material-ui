import React from 'react';
import { useControllableValue, useSafeState } from 'ahooks';
import { Autocomplete, TextField, FormLabel, Stack, Tooltip } from '@mui/material';
import { HelpOutline } from '@mui/icons-material';
import { isVoidField } from '@formily/core';
import { connect, mapProps } from '@formily/react';

import { useFetchOptions } from '../../hooks';
import { isEqual } from '../../utils';
import { useFormLayout } from '../../layout/FormLayout';

export const Select = (props) => {
  const {
    options: optionsProp, fullWidth, refreshOptionsFlag, error, labelPosition, required, label, labelProps, tooltip,
    // eslint-disable-next-line no-unused-vars
    value: valueProp, onChange: onChangeProp, defaultValue,
    placeholder, variant,
    disableCloseOnSelect,
    ...restProps
  } = props;
  const [ loading, setLoading ] = useSafeState(false);
  const [ value, onChange ] = useControllableValue(props, { defaultValue: props.multiple ? [] : null });
  const options = useFetchOptions(optionsProp, { onLoading: setLoading, deps: refreshOptionsFlag ? [ refreshOptionsFlag ] : undefined });
  const layout = useFormLayout();
  const renderLabel = () => {
    if ((labelPosition ?? layout?.labelPosition) !== 'border') return;
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
    <Autocomplete
      loading={loading}
      options={options}
      value={value}
      fullWidth={fullWidth ?? layout?.fullWidth}
      onChange={(e, v) => onChange(v)}
      isOptionEqualToValue={(op, v) => isEqual(op.value, v?.value)}
      disableCloseOnSelect={disableCloseOnSelect ?? props.multiple}
      renderInput={(params) => (
        <TextField
          placeholder={placeholder}
          {...params}
          error={error}
          variant={variant}
          label={renderLabel()}
        />
      )}
      {...restProps}
    />
  );
};

Select.defaultProps = {
  size: 'small',
  variant: 'outlined',
};

export const FormilySelect = connect(
  Select,
  mapProps((props, field) => {
    if (!field || isVoidField) return props;
    return {
      ...props,
      error: props.error ?? field.selfInvalid,
      tooltip: props.tooltip ?? field.description,
      readOnly: props.readOnly ?? field.readOnly,
      required: props.required ?? field.required,
      defaultValue: props.defaultValue ?? field.initialValue,
      label: props.label ?? field.title,
      options: props.options ?? field.dataSource,
    };
  })
);
