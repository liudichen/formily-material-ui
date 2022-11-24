import React from 'react';
import { BoxProps, IconButtonProps } from '@mui/material';

import { ListCardCommonProps } from './ListCard';
import { IFieldPropOptions, FieldBaseProps } from '../../types';
import { FormItemBaseProps } from '../../layout';

export interface TransferBaseProps extends FieldBaseProps<any[]>, ListCardCommonProps, Omit<FormItemBaseProps, 'className' | 'style' | 'prefixCls'> {
  options?: IFieldPropOptions,
  /** 保留不在options里的已选但不显示的值? */
  keepExtraItems?: boolean,
  titles?: React.ReactNode | [leftTitle: React.ReactNode, rightTitle: React.ReactNode],
  /** 每个框的宽度 */
  width?: number | string,
  /** 每个框内容的高度 */
  height?: number | string,
  /** 每个框内容的min高度 */
  minHeight?: number | string,
  /** 每个框内容的max高度 */
  maxHeight?: number | string,
  /** 判断是否需要卡片竖排的限度(ratio个卡片的宽度加上该限度不应大于容器宽度)
   * @default  40
  */
  overflowThreshold?: number,
  /** 判断是否需要卡片竖排首个卡片宽度的倍数(ratio个卡片的宽度加上该限度不应大于容器宽度)
   * @default 1.5
   */
  overflowRatio?: number
  /**
   * 箭头按钮的props
   */
  iconButtonProps?: IconButtonProps,
  /** 最外层的Box组件的props */
  containerBoxProps?: BoxProps,


  /** 不从Field获取信息 */
  noField?: boolean,
  /** 不从FormLayout获取fullWidth等信息 */
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

export declare const TransferBase: React.FC<TransferBaseProps>;
