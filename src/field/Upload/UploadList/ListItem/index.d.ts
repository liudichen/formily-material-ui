import React from 'react';

import { IUploadedFile } from '../../../../types';

interface ListItemProps {
  className?: string,
  style?: React.CSSProperties,
  file?: IUploadedFile,
  onClickThumb?: (imageIndex: number) => void,
  iconRender?: (file:IUploadedFile) => React.ReactNode,
  isImage?: (file:IUploadedFile) => boolean,
  imageIndex?: number,
  showPreviewIcon?: boolean,
  showRemoveIcon?: boolean,
  previewIcon?: React.ReactNode,
  removeIcon?: React.ReactNode,
  onPreview?: (file: IUploadedFile, e?: MouseEvent) => void,
  onRemove?: (file: IUploadedFile) => void,
}

declare const ListItem: React.FunctionComponent<ListItemProps>;

export default ListItem;
