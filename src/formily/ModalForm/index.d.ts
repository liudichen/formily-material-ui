import React from 'react';
import { BoxProps, DialogProps, DialogActionsProps, DialogContentProps, DialogTitleProps, LinkProps, IconButtonProps } from '@mui/material';
import { Form, IFormProps } from '@formily/core';

import { ResetProps } from '../Reset';
import { SubmitProps } from '../Submit';

export interface ModalFormProps extends DialogProps {
  /** 额外的DialogActions项（会放在Reset前） */
  extraActions?: React.ReactNode | React.ReactNode[],
  /** 禁止trigger触发? */
  disabled?: boolean,
  /** 点击触发弹窗打开的ReactNode，如果不传递此prop，则open使用外部受控模式 */
  trigger?: React.ReactNode,
  /** trigger包裹的Link组件的props */
  triggerProps?: LinkProps,
  /** 对话框标题 */
  title?: React.ReactNode,
  /** 标题包裹的DialogTitle的props
   * @default 原始状态{display:'flex',alginItems:'start',bgcolor:'#f5f5f5',sx:{padding:0}}
  */
  titleProps?: DialogTitleProps,
  /** 包裹title内容的Box的props
   * @default 初始状态{flex:1,fontSize:'16px',height:'100%',alignSelf:'center',marginLeft:1.5,marginY:0.5}
   */
  titleBoxProps?: BoxProps,
  /** 内容区包裹的DialogContent的props */
  contentProps?: DialogContentProps,
  /** 底部按钮区包裹的DialogActions的props */
  actionsProps?: DialogActionsProps,
  /** 显示右上角的关闭按钮? */
  showCloseIcon?: boolean,
  /** 自定义右上角按钮图标 */
  CloseIcon?: React.ReactNode,
  /** 传递给关闭按钮包裹的IconButton的props
   * @default 原始状态{sx:{px:0.25,py:0.5}}
   */
  closeIconButtonProps?: IconButtonProps,
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
  /** 可拖拽标题移动Modal？ */
  draggable?: boolean,
  /** 响应式全屏？，默认断点为md */
  responsive?: boolean,
  /** 响应式全屏的断点
   * @default 'md'
  */
  breakpoint?: 'xs' | 'sml' | 'md' | 'lg' | 'xl',
  /** 重新创建form实例的depend，会自动传入open,如果只受modal显隐控制，则不要传此参数 */
  depend?: any,
  /** 禁用modl的open控制重新创建form实例 */
  disableVisibleRecreateForm?: boolean,
  formRef?: React.MutableRefObject<Form>,
  /** 传递给createForm的参数
   * @default {validateFirst:true}
  */
  createFormOptions?: IFormProps,
  /** 内容，优先级高于children */
  content?: React.ReactNode | React.ReactNode[],
}

export declare const ModalForm: React.ForwardRefExoticComponent<React.PropsWithChildren<ModalFormProps>>;
