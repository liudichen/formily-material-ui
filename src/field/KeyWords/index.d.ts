import React from 'react';
import { BoxProps, ChipProps, IconButtonProps, InputBaseProps, PaperProps, StackProps } from '@mui/material';

import { FieldBaseProps } from '../../types';

interface IRenderChipParam {
  item: string,
  index: number,
  items: string[],
  diabled: boolean,
  handleRemoveKeyWord: (keyword: string) => void,
}

export interface KeyWordsProps extends FieldBaseProps<string[]> {
  /** 文本输入框显示清空按钮? */
  showClear?: boolean,
  /** 点击添加后自动清空文本内容？ */
  autoClear?: boolean,
  /** 添加的文本转换成要格式化后的文本 */
  textConvert?: (keyword: string | number) => string | number,
  /** 最外层的垂直Stack的props */
  containerStackProps?: StackProps,
  /** 包裹输入框的Paper组件的props */
  InputBasePaperProps?: PaperProps,
  /** 输入文本框的组件InputBase的props */
  InputBaseProps?: Omit<InputBaseProps, 'ref' | 'value' | 'onChange'>,
  AddIcon?: React.ReactNode,
  AddButtonProps?: Omit<IconButtonProps, 'onClick'>,
  chipProps?: Omit<ChipProps, 'onDelete'>,
  renderChip?: (param: renderChipParam) => React.ReactNode,
  /** 包裹chips的Box组件的props */
  chipsBoxProps?: BoxProps,
}

export declare const KeyWords: React.FC<KeyWordsProps>;
