import React, { forwardRef } from 'react';
import { useControllableValue, useSafeState } from 'ahooks';
import { Autocomplete, TextField, FormLabel, Stack, Tooltip } from '@mui/material';
import { HelpOutline } from '@mui/icons-material';
import { isVoidField } from '@formily/core';
import { connect, mapProps } from '@formily/react';

import { useFetchOptions } from '../../hooks';
import { isEqual } from '../../utils';
import { useFormLayout } from '../../layout/FormLayout';


export const Select = forwardRef((props, ref) => {
  const {
    options: optionsProp, fullWidth, refreshOptionsFlag, error, labelPosition, required, label, labelProps, tooltip,
    // eslint-disable-next-line no-unused-vars
    value: valueProp, onChange: onChangeProp, defaultValue,
    placeholder, variant,
    disableCloseOnSelect,
    ...restProps
  } = props;
  const [ loading, setLoading ] = useSafeState(false);
  const [ value, onChange ] = useControllableValue(props);
  const options = useFetchOptions(optionsProp, { onLoading: setLoading, deps: refreshOptionsFlag ? [ refreshOptionsFlag ] : undefined });
  const layout = useFormLayout();
  const renderLabel = () => {
    if ((labelPosition ?? layout?.labelPosition) !== 'inner') return;
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
      ref={ref}
      loading={loading}
      options={options}
      value={value || (props.multiple ? [] : null)}
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
});

Select.defaultProps = {
  size: 'small',
  variant: 'outlined',
};

export const FormilySelect = connect(
  Select,
  mapProps({
    description: 'tooltip',
    title: 'label',
    dataSource: 'options',
    initialValue: 'defaultValue',
    readOnly: true,
    required: true,
    disabled: true,
  }, (props, field) => {
    if (!field || isVoidField) return props;
    return {
      ...props,
      error: field.selfInvalid,
    };
  })
);

FormilySelect.displayName = 'muiFormilySelect';
