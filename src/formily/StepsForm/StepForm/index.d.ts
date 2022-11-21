/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-05-09 13:46:59
 * @LastEditTime: 2022-10-14 22:17:48
 */
import React from 'react';
import { StepIconProps, ButtonProps, BoxProps } from '@mui/material';
import { LoadingButtonProps } from '@mui/lab';

interface objectValue {
  [key: string] : any,
}

export interface StepFormProps extends BoxProps {
  // -------------- 1 -------------
  // 此部分props是给stepsForm拦截并使用的
  name?: string,
  title?: React.ReactNode,
  subTitle?: React.ReactNode,
  icon?: React.FunctionComponent<StepIconProps> | React.Component<StepIconProps>,
  // -------------- 1 -------------

  // -------------- 2 -------------
  // 此部分props是由StepsForm组件自动生成并传递的，不要手动传递，可以通过props获取使用
  /** [不要手动传递,但可以通过props获取到]当前激活的stepForm的index(从0开始) */
  current?: number,
  /** [不要手动传递,但可以通过props获取到]该StepForm的编号(从0开始) */
  stepIndex?: number,
  /** [不要手动传递,但可以通过props获取到]步骤总数 */
  stepsCount?: number,
  // -------------- 2 -------------

  handleStepChange?: (direction?: 'next' | 'previous' | number) => void,
  onFinish?: (values?: object, allValues?: object) => void,
  onSubmitFail?: (error?: any, fieldVaue?: object) => void,
  onPrevious?: () => void,
  previousText?: React.ReactNode,
  previousProps?: Omit<ButtonProps, 'onClick'>,
  nextText?: [React.ReactNode, React.ReactNode],
  nextProps?: Omit<Omit<LoadingButtonProps, 'onClick'>, 'loading'>,
}

declare const StepForm: React.ForwardRefRenderFunction<Form, StepFormProps>;

export default StepForm;
