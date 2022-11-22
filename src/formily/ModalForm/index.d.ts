import React from 'react';
import { DialogProps, DialogActionsProps, DialogContentProps, DialogTitleProps, LinkProps } from '@mui/material';

import { ResetProps } from '../Reset';
import { SubmitProps } from '../Submit';

export interface ModalFormProps extends DialogProps {
  memo?: boolean,
  /** 额外的DialogActions项（会放在Reset前） */
  extraActions?: React.ReactNode | React.ReactNode[],
  disabled?: boolean,
  /** 点击触发弹窗打开的ReactNode，如果不传递此prop，则open使用外部受控模式 */
  trigger?: React.ReactNode,
  triggerProps?: LinkProps,
  title?: React.ReactNode,
  titleProps?: DialogTitleProps,
  contentProps?: DialogContentProps,
  actionsProps?: DialogActionsProps,
  showClose?: boolean,
  showReset?: boolean,
  resetProps?: ResetProps,
  resetText?: React.ReactNode,
  showSubmit?: boolean,
  submitProps?: Omit<SubmitProps, 'onSubmit'>,
  submitText?: React.ReactNode,
  /** 返回值为true时窗口自动关闭 */
  onFinish?: (values: any) => boolean | Promise<boolean>,
  /** 标题可拖拽？ */
  draggable?: boolean,
  /** 响应式全屏？，默认断点为md */
  responsive?: boolean,
  /** 响应式全屏的断点 */
  breakpoint?: 'xs' | 'sml' | 'md' | 'lg' | 'xl',
  /** 重新创建form实例的depend，会自动传入open,如果只受modal显隐控制，则不要传此参数 */
  depend?: any,
  /** 禁用modl的open控制重新创建form实例 */
  disableVisibleRecreateForm?: boolean,
}
