import type { ReactNode, MutableRefObject, FC, PropsWithChildren,Dispatch,SetStateAction } from 'react';
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
  /** 禁用modl的open控制重新创建form实例 */
  disableVisibleRecreateForm?: boolean,
  formRef?: MutableRefObject<Form>,
  form?: Form,
  ref?: any
  /** 受控属性,控制是否开启 */
  open?: boolean;
  /** 受控属性 */
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export declare const ModalForm: FC<PropsWithChildren<ModalFormProps>>;
