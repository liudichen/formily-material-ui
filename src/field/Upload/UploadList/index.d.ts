import React from 'react';

import { IUploadedFile } from '../../../types';

export interface UploadListProps {
  previewFile?: (file: IUploadedFile) => void,
  className?: string,
  style?: React.CSSProperties,
  itemStyle?: React.CSSProperties,
  itemClassName?: string,
  onClickThumb?: (imageIndex: number) => void,
  iconRender?: (file:IUploadedFile) => React.ReactNode,
  isImage?: (file:IUploadedFile) => boolean,
  showPreviewIcon?: boolean,
  showRemoveIcon?: boolean,
  previewIcon?: React.ReactNode,
  removeIcon?: React.ReactNode,
  onPreview?: (file: IUploadedFile, e?: MouseEvent) => void,
  onRemove?: (file: IUploadedFile) => void,
  items?: IUploadedFile[],
}

declare const UploadList: React.FunctionComponent<UploadListProps>;

export default UploadList;
