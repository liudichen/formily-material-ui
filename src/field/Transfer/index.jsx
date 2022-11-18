import React from 'react';
import { useCreation, useControllableValue, useSafeState, useMemoizedFn } from 'ahooks';
import { observer } from '@formily/react';
import { Box, Grid, IconButton, Skeleton } from '@mui/material';
import { IconArrowBigLeft, IconArrowBigRight } from '@tabler/icons';

import { useFetchOptions, useFormilyFieldProps } from '../../hooks';
import { isInArray, isEqual } from '../../utils';
import { intersection, not, union } from './util';
import ListCard from './ListCard';

export const Transfer = observer((props) => {
  const formilyFieldProps = useFormilyFieldProps(props, { options: true, error: true });
  const {
    // eslint-disable-next-line no-unused-vars
    value: valueProp, onChange: onChangeProp, defaultValue, options: optionsProp, refreshFlag,
    listSx: listSxProp, cardSx: cardSxProp, cardHeaderSx, listItemProps, searchProps, itemCheckboxProps, listItemTextProps, buttonProps,
    keepExtraItems, width, minWidth, maxWidth, height, minHeight, maxHeight,
    readOnly, disabled, error,
    showSearch, showSelectAll, titles,
  } = formilyFieldProps;
  /** value是右侧的值(可能存在不显示的不在列表里的值) */
  const [ value, setValue ] = useControllableValue(formilyFieldProps, { defaultValue: [] });
  const [ checked, setChecked ] = useSafeState([]);
  const [ loading, setLoading ] = useSafeState(false);
  const [ optionsValues, setOptionsValues ] = useSafeState([]);
  const options = useFetchOptions(optionsProp, { onLoading: setLoading, callback: (items) => setOptionsValues(items.map((ele) => ele.value)), deps: refreshFlag });
  const postValue = useMemoizedFn((values) => {
    let v = Array.isArray(values) ? [ ...values ] : [];
    if (!v.length) {
      return [];
    }
    const list = optionsValues || [];
    if (!keepExtraItems) {
      v = v.filter((item) => isInArray(item, list));
    }
    return v;
  });
  const handleToggle = useMemoizedFn((value) => {
    const currentIndex = checked.findIndex((ele) => isEqual(value, ele));
    const newChecked = [ ...checked ];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  });
  const handleToggleAll = useMemoizedFn((items) => {
    let newChecked = [];
    const enabledItems = items.filter((item) => !(options.find((ele) => isEqual(item, ele.value))?.disabled));
    if (intersection(checked, enabledItems).length === enabledItems.length) {
      newChecked = not(checked, enabledItems);
    } else {
      newChecked = union(checked, enabledItems);
    }
    newChecked = intersection(newChecked, optionsValues);
    setChecked(newChecked);
  });
  const left = useCreation(() => {
    return not(optionsValues, value);
  }, [ optionsValues, value ]);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, value);
  const onClickToLeft = useMemoizedFn(() => {
    if (readOnly || disabled) return;
    const newValue = postValue(not(value, rightChecked));
    setValue(newValue);
    setChecked(not(checked, rightChecked));
  });
  const onClickToRight = useMemoizedFn(() => {
    if (readOnly || disabled) return;
    const newValue = postValue(union(value, leftChecked));
    setValue(newValue);
    setChecked(not(checked, leftChecked));
  });
  const cardSx = useCreation(() => {
    const sx = { ...(cardSxProp || {}) };
    if (width) sx.width = width;
    if (minWidth) sx.minWidth = minWidth;
    if (maxWidth) sx.maxWidth = maxWidth;
    return sx;
  }, [ cardSxProp, width, minWidth, maxWidth ]);
  const listSx = useCreation(() => {
    const sx = { ...(listSxProp || {}) };
    if (height) sx.height = height;
    if (minHeight) sx.minHeight = minHeight;
    if (maxHeight) sx.maxHeight = maxHeight;
    return sx;
  }, [ listSxProp, height, minHeight, maxHeight ]);
  return (
    <Box
      display='flex'
      gap={1}
      alignItems='center'
      justifyContent='center'
    >
      { loading ? (
        <Skeleton
          variant='rectangular'
          width={width ?? minWidth ?? maxWidth}
          height={height ?? minHeight ?? maxHeight}
          animation='wave'
        />
      ) : (
        <ListCard
          error={error}
          readOnly={readOnly}
          disabled={disabled}
          items={left}
          options={options}
          handleToggle={handleToggle}
          handleToggleAll={handleToggleAll}
          checked={checked}
          setChecked={setChecked}
          showSearch={showSearch}
          showSelectAll={showSelectAll}
          title={Array.isArray(titles) ? titles[0] : titles}
          listSx={listSx}
          cardSx={cardSx}
          cardHeaderSx={cardHeaderSx}
          listItemProps={listItemProps}
          searchProps={searchProps}
          listItemTextProps={listItemTextProps}
          itemCheckboxProps={itemCheckboxProps}
        />
      )}
      <Box>
        <Grid
          container
          direction='column'
          alignItems='center'
          spacing={3}
        >
          <Grid
            item
          >
            <IconButton
              color = 'primary'
              {...(buttonProps || {})}
              onClick = {onClickToRight}
              disabled = {disabled || readOnly || !leftChecked?.length}
            >
              <IconArrowBigRight />
            </IconButton>
          </Grid>
          <Grid
            item
          >
            <IconButton
              color = 'primary'
              tabIndex={-1}
              {...(buttonProps || {})}
              onClick = {onClickToLeft}
              disabled = {disabled || readOnly || !rightChecked?.length}
            >
              <IconArrowBigLeft />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
      { loading ? (
        <Skeleton
          variant='rectangular'
          width={width}
          height={height ?? minHeight ?? maxHeight}
          animation='wave'
        />
      ) : (
        <ListCard
          error={error}
          readOnly={readOnly}
          disabled={disabled}
          items={intersection(value, optionsValues)}
          options={options}
          handleToggle={handleToggle}
          handleToggleAll={handleToggleAll}
          checked={checked}
          setChecked={setChecked}
          showSearch={showSearch}
          showSelectAll={showSelectAll}
          title={Array.isArray(titles) ? titles[1] : titles}
          listSx={listSx}
          cardSx={cardSx}
          cardHeaderSx={cardHeaderSx}
          listItemProps={listItemProps}
          searchProps={searchProps}
          listItemTextProps={listItemTextProps}
          itemCheckboxProps={itemCheckboxProps}
        />
      )}
    </Box>
  );
});

Transfer.defaultProps = {
  showSelectAll: true,
  keepExtraItems: true,
  titles: [ '可选项', '已选项' ],
  maxHeight: '85vh',
  minHeight: 250,
  maxWidth: 250,
};

Transfer.displayName = 'muiFormilyTransfer';
