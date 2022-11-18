import React, { forwardRef } from 'react';
import { useSafeState } from 'ahooks';
import { Box, Card, CardHeader, Checkbox, Divider, FormControlLabel, List, ListItem, ListItemIcon, ListItemText, TextField } from '@mui/material';

import { intersection } from '../util';
import { isEqual, isInArray } from '../../../utils';

const ListCard = forwardRef((props, ref) => {
  const {
    showSelectAll, showSearch,
    disabled, readOnly, options, error,
    title, items, checked, setChecked,
    handleToggleAll, handleToggle,
    listSx, cardSx, cardHeaderSx, listItemProps, searchProps, itemCheckboxProps, listItemTextProps,
  } = props;
  const checkedNumber = intersection(checked, items).length;
  const [ keyword, setKeyword ] = useSafeState('');
  const onKeywordChange = (v) => {
    if (readOnly || disabled) return;
    setKeyword(v);
    setChecked([]);
  };
  return (
    <Card
      ref={ref}
      sx={{
        boxShadow: '0px 2px 5px #999999',
        ...(cardSx || {}),
      }}
    >
      <CardHeader
        avatar={
          showSelectAll ? (
            <FormControlLabel
              label={`${checkedNumber}/${items.length}`}
              control={
                <Checkbox
                  onClick={() => handleToggleAll(items)}
                  checked={checkedNumber === items.length && !!items.length}
                  indeterminate={checkedNumber !== items.length && !!checkedNumber}
                  disabled={disabled || !items.length}
                />
              }
            />
          ) : null
        }
        title={<Box color={error ? 'red' : 'default'}>{title}</Box>}
        sx={{
          py: 0.5,
          color: error ? 'red' : 'default',
          ...(cardHeaderSx || {}),
        }}
      />
      <Divider />
      { showSearch && (
        <TextField
          sx = {{ px: 1 }}
          size = 'small'
          fullWidth
          {...(searchProps || {})}
          value = {keyword}
          onChange = {onKeywordChange}
        />
      )}
      <List
        dense
        role='list'
        component='div'
        {...(listItemProps || {})}
        sx={{
          bgcolor: 'background.paper',
          overflow: 'auto',
          ...(listSx || {}),
        }}
      >
        { items.filter((ele) => {
          const label = options.find((v) => isEqual(ele, v.value))?.label;
          return `${ele}`.includes(keyword || '') || ((typeof label === 'number' || typeof label === 'string') ? `${label}`.includes(keyword || '') : false);
        }).map((item, i) => (
          <ListItem
            key={`${item}-${i}`}
            role='listitem'
            button
            divider
            disabled={disabled || options.find((opt) => isEqual(item, opt.value))?.disabled}
            {...(listItemProps || {})}
            onClick={() => handleToggle(item)}
          >
            <ListItemIcon sx={{ ml: -1.5 }}>
              <Checkbox
                size='small'
                disableRipple
                tabIndex={-1}
                {...itemCheckboxProps || {}}
                checked={isInArray(item, checked)}
              />
            </ListItemIcon>
            <ListItemText
              primary = {options.find((opt) => isEqual(item, opt.value))?.label}
              {...(listItemTextProps || {})}
            />
          </ListItem>
        ))}
      </List>
    </Card>
  );
});

export default ListCard;
