import type { ReactNode, MutableRefObject, FC } from 'react';
import type { IFormProps, Form } from '@formily/core';
import type { ModalProps } from 'mui-component';

import type { ResetProps } from '../Reset';
import type { SubmitProps } from '../Submit';

export interface ModalFormProps extends Omit<ModalProps, 'showActions' | 'showCancel' | 'onCancel' | 'cancelText' | 'cancelProps' | 'showConfirm' | 'onConfirm' | 'confirmText' | 'confirmProps' | 'setOpen'> {
  /** 额外的DialogActions项（会放在Reset前） */
  extraActions?: ReactNode | ReactNode[],
  /** 显示重置按钮? */
  showReset?: boolean,
  /** 重置按钮的props */
  resetProps?: ResetProps,
  resetText?: ReactNode,
  /** 显示提交按钮? */
  showSubmit?: boolean,
  /** 提交按钮的props */
  submitProps?: Omit<SubmitProps, 'onSubmit'>,
  submitText?: ReactNode,
  /** 返回值为true时窗口自动关闭 */
  onFinish?: ((values: any) => boolean | void) | ((values: any) => Promise<boolean | void>),
  /** 重新创建form实例的depend，会自动传入open,如果只受modal显隐控制，则不要传此参数 */
  depend?: any,
  /** 禁用modl的open控制重新创建form实例 */
  disableVisibleRecreateForm?: boolean,
  formRef?: MutableRefObject<Form>,
  form?: Form,
  /** 传递给createForm的参数
   * @default {validateFirst:true}
  */
  createFormOptions?: IFormProps,
  ref?: any
}

export declare const ModalForm: FC<PropsWithChildren<ModalFormProps>>;
