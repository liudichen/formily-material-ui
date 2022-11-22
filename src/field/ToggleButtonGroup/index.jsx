import React from 'react';
import { useSafeState, useMemoizedFn, useControllableValue, useCreation } from 'ahooks';
import { Checkbox, Skeleton, ToggleButtonGroup as MuiToggleButtonGroup, ToggleButton as MuiToggleButton } from '@mui/material';
import { observer } from '@formily/react';

import { isEqual, isInArray, COLORS } from '../../utils';
import { useFetchOptions, useFormilyFieldProps } from '../../hooks';

export const ToggleButtonGroup = observer((props) => {
  const formilyFieldProps = useFormilyFieldProps(props, { options: true });
  const {
    options: optionsProp,
    // eslint-disable-next-line no-unused-vars
    value: valueProp, onChange: onChangeProp, defaultValue,
    minCount, maxCount, exclusive, orientation,
    layout, size, color, disabled, readOnly, itemSx: itemSxProp, itemWidth, itemMinWidth, itemMaxWidth, itemFullWidth,
    ...restProps
  } = formilyFieldProps;
  const [loading, setLoading] = useSafeState(false);
  const [value, onChange] = useControllableValue(formilyFieldProps);
  const [optionsValues, setOptionsValues] = useSafeState([]);
  const options = useFetchOptions(optionsProp, { onLoading: setLoading, callback: (opts) => setOptionsValues(opts.map((ele) => ele.value)) });
  const itemSx = useCreation(() => {
    if (!itemWidth && !itemMaxWidth && !itemMinWidth) return itemSxProp;
    const sx = { ...(itemSxProp || {}) };
    if (!itemFullWidth && itemWidth) {
      sx.width = itemWidth;
    }
    if (itemMinWidth) sx.minWidth = itemMinWidth;
    if (itemMaxWidth) sx.maxWidth = itemMaxWidth;
    return sx;
  }, [itemSxProp, itemWidth, itemFullWidth, itemMinWidth, itemMaxWidth]);

  const handleChange = useMemoizedFn((v) => {
    if (readOnly) { return; }
    if (exclusive) {
      if (!(minCount === 1 && v !== undefined)) {
        onChange(v);
      }
    } else {
      const newValue = [...(value || [])];
      if (isInArray(v, newValue)) {
        const index = newValue.findIndex((ele) => isEqual(v, ele));
        newValue.splice(index, 1);
      } else {
        newValue.push(v);
      }
      if (!((minCount !== undefined && newValue.length < minCount) || (maxCount !== undefined && newValue.length > maxCount))) {
        newValue.sort((a, b) => {
          const indexA = options.findIndex((opt) => isEqual(a, opt.value));
          const indexB = options.findIndex((opt) => isEqual(b, opt.value));
          return indexA - indexB;
        });
        onChange(newValue.filter((item) => isInArray(item, optionsValues)));
      }
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
    <MuiToggleButtonGroup
      orientation={orientation ?? layout}
      disabled={disabled}
      exclusive={exclusive}
      fullWidth={itemFullWidth}
      size={size}
      color={color}
      {...restProps}
    >
      { options.map((item, index) => (
        <MuiToggleButton
          key={index}
          size={item?.size ?? size}
          color={item.color && COLORS.includes(item.color) ? item.color : color}
          disabled={item.disabled ?? disabled}
          value={item.value}
          onClick={() => handleChange(item.value)}
          selected={exclusive ? isEqual(item.value, value) : isInArray(item.value, value)}
          sx={item?.sx ?? itemSx}
        >
          { item.label }
        </MuiToggleButton>
      ))}
    </MuiToggleButtonGroup>
  );
}, { forwardRef: true });

ToggleButtonGroup.defaultProps = {
  size: 'small',
  color: 'primary',
  itemSx: { fontWeight: 'bold' },
  itemMinWidth: 50,
};

ToggleButtonGroup.displayName = 'muiFormilyToggleButtonGroup';
