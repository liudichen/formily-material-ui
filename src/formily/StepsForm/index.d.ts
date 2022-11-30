/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-05-09 13:46:02
 * @LastEditTime: 2022-10-14 22:13:14
 */
import React from 'react';
import { IFormProps, Form } from '@formily/core';
import { StepperProps, StepIconProps } from '@mui/material';

import { ResultRenderProps } from './DefaultCompleteRender';
import { StepFormProps } from './StepForm';

export interface StepsFormProps extends StepperProps, Omit<ResultRenderProps, 'values' | 'form' | 'handleStepChange'> {
  direction?: 'horizontal'| 'vertical',
  labelPlacement?: 'horizontal'| 'vertical',
  onFinish?: (values?: object, allValues?: object) => void,
  /** 传递给createForm的参数
   * @default {validateFirst:true}
  */
  createFormOptions?: IFormProps,

  ResultRender?: React.Component<ResultRenderProps> | React.FC<ResultRenderProps> | React.ElementType,

  /** 重建form实例的depend项 */
  depend?: any,
  /** 获取form实例 */
  formRef?: React.RefObject<Form>
}

declare const StepsForm: React.ForwardRefExoticComponent<React.PropsWithChildren<StepsFormProps>> & {
  StepForm: React.FC<React.PropsWithChildren<StepFormProps>>
};

export {
  StepsForm,
  StepsFormProps,
  StepFormProps,
  ResultRenderProps,
  StepIconProps,
};
