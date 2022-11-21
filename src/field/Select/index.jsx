import React from 'react';
import { useControllableValue, useSafeState } from 'ahooks';
import { Autocomplete, TextField, FormLabel, Stack, Tooltip } from '@mui/material';
import { observer } from '@formily/react';
import { HelpOutline } from '@mui/icons-material';

import { useFetchOptions, useFormilyFieldProps } from '../../hooks';
import { isEqual } from '../../utils';
import { useFormLayout } from '../../layout/FormLayout';

export const Select = observer((props) => {
  const formilyFieldProps = useFormilyFieldProps(props, { options: true, required: true, label: true, tooltip: true, error: true });
  const {
    options: optionsProp, fullWidth, refreshOptionsFlag, error, showInnerLabel, required, label, labelProps, tooltip,
    // eslint-disable-next-line no-unused-vars
    value: valueProp, onChange: onChangeProp, defaultValue,
    placeholder, variant,
    disableCloseOnSelect,
    ...restProps
  } = formilyFieldProps;
  const [loading, setLoading] = useSafeState(false);
  const [value, onChange] = useControllableValue(formilyFieldProps);
  const options = useFetchOptions(optionsProp, { onLoading: setLoading, deps: refreshOptionsFlag });
  const layout = useFormLayout();
  const renderLabel = () => {
    if (!showInnerLabel) return;
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
}, { forwardRef: true });

Select.defaultProps = {
  size: 'small',
  variant: 'outlined',
};

Select.displayName = 'muiFormilySelect';
