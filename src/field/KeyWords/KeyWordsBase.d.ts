import React from 'react';
import { BoxProps, ChipProps, IconButtonProps, InputBaseProps, PaperProps, StackProps } from '@mui/material';

import { FieldBaseProps } from '../../types';
import { FormItemBaseProps } from '../../layout';

interface IRenderChipParam {
  item: string,
  index: number,
  items: string[],
  diabled: boolean,
  handleRemoveKeyWord: (keyword: string) => void,
}

export interface KeyWordsBaseProps extends FieldBaseProps<string[]>, Omit<FormItemBaseProps, 'className' | 'style' | 'prefixCls'> {
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

  /** 不从Field获取信息 */
  noField?: boolean,
  /** 不从FormLayout获取fullWidth信息 */
  noFormLayout?: boolean,
  /** 外层包裹FormItemBase? */
  withFormItem?: boolean,
  /** 当 withFormItem=true时传递给FormItemBase的className*/
  formItemCls?: string,
  /** 当 withFormItem=true时传递给FormItemBase的style*/
  formItemStyle?: React.CSSProperties,
  /** 当 withFormItem=true时，传递给formItem的内部className的前缀，可以在引入自定义样式时使用
   * @default iimm 可以通过样式覆盖来修改FormItem内部样式(不需要传递此值)
   */
  formItemPrefixCls?: string,
}

export declare const KeyWordsBase: React.FC<KeyWordsBaseProps>;
