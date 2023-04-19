import React from 'react';
import type { IFormProps, Form } from '@formily/core';
import type { StepperProps, StepIconProps } from '@mui/material';

import { ResultRenderProps } from './DefaultCompleteRender';
import { StepFormProps } from './StepForm';

export interface StepsFormProps extends StepperProps, Omit<ResultRenderProps, 'values' | 'form' | 'handleStepChange'> {
  form?: Form,
  direction?: 'horizontal'| 'vertical',
  labelPlacement?: 'horizontal'| 'vertical',
  onFinish?: ((values?: object, allValues?: object) => void | boolean) | ((values?: object, allValues?: object) => Promise<void | boolean>),
  /** 传递给createForm的参数
   * @default {validateFirst:true}
  */
  createFormOptions?: IFormProps,

  ResultRender?: React.ComponentType<ResultRenderProps>,

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
  StepFormProps,
  ResultRenderProps,
  StepIconProps,
};
