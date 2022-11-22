import React from 'react';
import { SxProps, ListItemProps, TextFieldProps, CheckboxProps, ListItemTextProps } from '@mui/material';

interface ListCardCommonProps {
  showSelectAll?: boolean,
  showSearch?: boolean,
  listSx?: SxProps,
  cardSx?: SxProps,
  cardHeaderSx?: SxProps,
  listItemProps?: ListItemProps,
  /** 搜索关键字的文本框的Props */
  searchProps?: TextFieldProps,
  /** 每个选项前的复选框的props */
  itemCheckboxProps?: CheckboxProps,
  /** 选项的文本ListItemText的props */
  listItemTextProps?: ListItemTextProps,
  error?: boolean,
}

type Item = number | string | object;

interface ListCardProps extends ListCardCommonProps {
  readOnly?: boolean,
  disabled?: boolean,
  options?: {value: Item, label:React.ReactNode}[],
  title?: React.ReactNode,
  items?: Item[],
  checked?: Item[],
  setChecked?: (value: Item[] | ((v: Item[])=> Item[])) => void,
  handleToggle?: (value: Item[]) => void,
  handleToggleAll?: (items: Item[]) => void,
}

declare const ListCard: React.ForwardRefExoticComponent<ListCardProps>;

export default ListCard;
