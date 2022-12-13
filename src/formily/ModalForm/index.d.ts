import React from 'react';
import { IFormProps } from '@formily/core';
import { ModalProps } from 'mui-component';

import { ResetProps } from '../Reset';
import { SubmitProps } from '../Submit';

export interface ModalFormProps extends Omit<ModalProps, 'showActions' | 'showCancel' | 'onCancel' | 'cancelText' | 'cancelProps' | 'showConfirm' | 'onConfirm' | 'confirmText' | 'confirmProps'> {
  /** 额外的DialogActions项（会放在Reset前） */
  extraActions?: React.ReactNode | React.ReactNode[],
  /** 显示重置按钮? */
  showReset?: boolean,
  /** 重置按钮的props */
  resetProps?: ResetProps,
  resetText?: React.ReactNode,
  /** 显示提交按钮? */
  showSubmit?: boolean,
  /** 提交按钮的props */
  submitProps?: Omit<SubmitProps, 'onSubmit'>,
  submitText?: React.ReactNode,
  /** 返回值为true时窗口自动关闭 */
  onFinish?: (values: any) => boolean | Promise<boolean>,
  /** 重新创建form实例的depend，会自动传入open,如果只受modal显隐控制，则不要传此参数 */
  depend?: any,
  /** 禁用modl的open控制重新创建form实例 */
  disableVisibleRecreateForm?: boolean,
  formRef?: React.MutableRefObject<Form>,
  /** 传递给createForm的参数
   * @default {validateFirst:true}
  */
  createFormOptions?: IFormProps,
}

export declare const ModalForm: React.ForwardRefExoticComponent<React.PropsWithChildren<ModalFormProps>>;
