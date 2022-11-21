import React from 'react';
import { ButtonProps } from '@mui/material';

import { UploadZoneProps } from './UploadZone';
import { IUploadedFile, FieldBaseProps } from '../../types';

export interface UploadProps extends UploadZoneProps, FieldBaseProps<IUploadedFile[]> {
  isImage?: (file: IUploadedFile[]) => boolean,
  previewFile?: (file: IUploadedFile) => void,
  transformFile?: (file: IUploadedFile) => IUploadedFile,
  uploadButtonProps?: ButtonProps,
  uploadButtonText?: React.ReactNode,
  disabled?: boolean,
  readOnly?: boolean,
  showUploadList?: boolean,
  maxCount?: number,
  showPreviewIcon?: boolean,
  showRemoveIcon?: boolean,
  previewIcon?: React.ReactNode,
  downloadIcon?: React.ReactNode,
  removeIcon?: React.ReactNode,
  uploadListStyle?: React.CSSProperties,
  uploadListClassName?: string,
  itemStyle?: React.CSSProperties,
  itemClassName?: string,
  className?: string,
}

export declare const Upload: React.ForwardRefRenderFunction<unknown, React.PropsWithChildren<UploadProps>>;
