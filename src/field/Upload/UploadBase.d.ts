import React from 'react';
import { ButtonProps } from '@mui/material';

import { UploadZoneProps } from './UploadZone';
import { IUploadedFile, FieldBaseProps } from '../../types';
import { FormItemBaseProps, FormItemExtraProps } from '../../layout';

interface UploadRefContent {
  inputRef?: React.ElementRef,
  rootRef?: React.ElementRef,
  open?: () => void,
}

export interface UploadBaseProps extends UploadZoneProps, FieldBaseProps<IUploadedFile[]>, Omit<FormItemBaseProps, 'className' | 'style' | 'prefixCls'>, FormItemExtraProps {
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
  uploadRef?: React.RefObject<UploadRefContent>,
}

export declare const UploadBase: React.FC<React.PropsWithChildren<UploadBaseProps>>;
