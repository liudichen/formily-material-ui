import React from 'react';
import { useControllableValue, useMemoizedFn, useSafeState } from 'ahooks';
import { FormControlLabel, Radio, RadioGroup as MuiRadioGroup, Skeleton } from '@mui/material';
import { connect, mapProps } from '@formily/react';

import { useFetchOptions, useId } from '../../hooks';
import { COLORS } from '../../utils';

export const RadioGroup = (props) => {
  const {
    options: optionsProp,
    // eslint-disable-next-line no-unused-vars
    value: valueProp, onChange: onChangeProp, defaultValue,
    layout, sx, size, color, disabled, itemSx, readOnly, name: nameProp,
    labelPlacement, icon, checkedIcon,
  } = props;
  const [ loading, setLoading ] = useSafeState(false);
  const options = useFetchOptions(optionsProp, { onLoading: setLoading });
  const [ value, onChange ] = useControllableValue(props);
  const name = useId(nameProp);
  const handleChange = useMemoizedFn((e) => {
    if (!readOnly) onChange(e.target.value);
  });
  console.log('options-radio', options);
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
      row={layout === 'horizontal'}
      value={value || null}
      onChange={handleChange}
      name={name}
      sx={sx}
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
              sx={itemSx}
            />
          }
        />
      ))}
    </MuiRadioGroup>
  );
};

RadioGroup.defaultProps = {
  layout: 'horizontal',
};

export const FormilyRadioGroup = connect(
  RadioGroup,
  mapProps({
    dataSource: 'options',
    initialValue: 'defaultValue',
    readOnly: true,
    disabled: true,
  })
);
FormilyRadioGroup.displayName = 'muiFormilyRadioGroup';
