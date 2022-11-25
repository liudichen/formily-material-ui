import React from 'react';
import { ButtonProps } from '@mui/material';

import { UploadZoneProps } from './UploadZone';
import { IUploadedFile, FieldBaseProps } from '../../types';
import { FormItemBaseProps } from '../../layout';

interface UploadRefContent {
  inputRef?: React.ElementRef,
  rootRef?: React.ElementRef,
  open?: () => void,
}

export interface UploadBaseProps extends UploadZoneProps, FieldBaseProps<IUploadedFile[]>, Omit<FormItemBaseProps, 'className' | 'style' | 'prefixCls'> {
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

export declare const UploadBase: React.FC<React.PropsWithChildren<UploadBaseProps>>;
