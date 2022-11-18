import React from 'react';

import { ListCardCommonProps } from './ListCard';
import { IFieldPropOptions, FieldBaseProps } from '../../types';

export interface TransferProps extends FieldBaseProps<any[]>, ListCardCommonProps {
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
}

export declare const Transfer: React.FC<TransferProps>;
