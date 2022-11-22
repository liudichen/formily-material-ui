import React from 'react';
import { useControllableValue, useMemoizedFn, useSafeState } from 'ahooks';
import { FormControlLabel, Radio, RadioGroup as MuiRadioGroup, Skeleton } from '@mui/material';
import { observer } from '@formily/react';

import { useFetchOptions, useFormilyFieldProps } from '../../hooks';
import { COLORS, isEqual } from '../../utils';

export const RadioGroup = observer((props) => {
  const formilyFieldProps = useFormilyFieldProps(props, { options: true });
  const {
    options: optionsProp,
    // eslint-disable-next-line no-unused-vars
    value: valueProp, onChange: onChangeProp, defaultValue,
    layout, sx, size, color, disabled, itemSx, readOnly,
    labelPlacement, icon, checkedIcon, row,
    ...restProps
  } = formilyFieldProps;
  const [loading, setLoading] = useSafeState(false);
  const options = useFetchOptions(optionsProp, { onLoading: setLoading });
  const [value, onChange] = useControllableValue(formilyFieldProps);
  const handleChange = useMemoizedFn((value) => {
    if (!readOnly) onChange(value ?? null);
  });
  if (loading) {
    return (
      <Skeleton
        variant='rectangular'
        animation='wave'
        width={'100%'}
      >
        <Radio />
      </Skeleton>
    );
  }
  return (
    <MuiRadioGroup
      row={row ?? layout === 'horizontal'}
      name={name}
      sx={sx}
      {...restProps}
    >
      { options.map((item, index) => (
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
    </MuiRadioGroup>
  );
}, { forwardRef: true });

RadioGroup.defaultProps = {
  layout: 'horizontal',
};

RadioGroup.displayName = 'muiFormilyRadioGroup';
