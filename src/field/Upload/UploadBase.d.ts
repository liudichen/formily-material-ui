import React from 'react';
import { ButtonProps } from '@mui/material';

import { UploadZoneProps } from './UploadZone';
import { IUploadedFile, FieldBaseProps } from '../../types';
import { FormItemBaseProps } from '../../layout';

export interface UploadBaseProps extends UploadZoneProps, FieldBaseProps<IUploadedFile[]>, Omit<FormItemBaseProps, 'className' | 'style'> {
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

  /** 不从FormLayout获取fullWidth信息 */
  noFormLayout?: boolean,
  /** 外层包裹FormItemBase? */
  withFormItem?: boolean,
  /** 当 withFormItem=true时传递给FormItemBase的className*/
  formItemCls?: string,
  /** 当 withFormItem=true时传递给FormItemBase的style*/
  formItemStyle?: React.CSSProperties,
}

export declare const UploadBase: React.ForwardRefExoticComponent<React.PropsWithChildren<UploadBaseProps>>;
