import React from 'react';
import { BoxProps, IconButtonProps } from '@mui/material';

import { ListCardCommonProps } from './ListCard';
import { IFieldPropOptions, FieldBaseProps } from '../../types';
import { FormItemBaseProps, FormItemExtraProps } from '../../layout';

export interface TransferBaseProps extends FieldBaseProps<any[]>, ListCardCommonProps, Omit<FormItemBaseProps, 'className' | 'style' | 'prefixCls'>, FormItemExtraProps {
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

}

export declare const TransferBase: React.FC<TransferBaseProps>;
