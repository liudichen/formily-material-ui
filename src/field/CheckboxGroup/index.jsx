import React from 'react';
import { useControllableValue, useMemoizedFn, useSafeState } from 'ahooks';
import { Checkbox, FormControlLabel, FormGroup, Skeleton } from '@mui/material';
import { observer } from '@formily/react';

import { useFetchOptions, useFormilyFieldProps } from '../../hooks';
import { isEqual, isInArray, COLORS } from '../../utils';

export const CheckboxGroup = observer((props) => {
  const formilyFieldProps = useFormilyFieldProps(props, { options: true });
  const {
    options: optionsProp,
    // eslint-disable-next-line no-unused-vars
    value: valueProp, onChange: onChangeProp, defaultValue, children,
    readOnly, disabled,
    minCount, maxCount, layout,
    itemSx, labelPlacement,
    row,
    icon, checkedIcon, size, color,
    ...restProps
  } = formilyFieldProps;
  const [ loading, setLoading ] = useSafeState(false);
  const [ optionsValues, setOptionsValues ] = useSafeState([]);
  const [ value, onChange ] = useControllableValue(formilyFieldProps);
  const options = useFetchOptions(optionsProp, { onLoading: setLoading, callback: (opts) => setOptionsValues(opts.map((ele) => ele.value)) });
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
  if (loading) {
    return (
      <Skeleton
        variant='rectangular'
        animation='wave'
        width={'100%'}
      >
        <Checkbox />
      </Skeleton>
    );
  }
  return (
    <FormGroup row={row ?? layout === 'horizontal'} {...restProps}>
      { options.map((item, index) => (
        <FormControlLabel
          key={index}
          label={item.label ?? ''}
          labelPlacement={labelPlacement}
          control={
            <Checkbox
              size={item.size ?? size}
              color={item.color && COLORS.includes(item.color) ? item.color : color}
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
    </FormGroup>
  );
}, { forwardRef: true });

CheckboxGroup.defaultProps = {
  layout: 'horizontal',
};

CheckboxGroup.displayName = 'muiFormilyCheckboxGroup';
