import type { ComponentType, FC, RefObject, ForwardRefExoticComponent, PropsWithChildren } from 'react';
import type { IFormProps, Form } from '@formily/core';
import type { StepperProps, StepIconProps } from '@mui/material';

import type { ResultRenderProps as StepsFormResultRenderProps } from './DefaultCompleteRender';
import type { StepFormProps } from './StepForm';

export interface StepsFormProps extends StepperProps, Omit<StepsFormResultRenderProps, 'values' | 'form' | 'handleStepChange'> {
  form?: Form,
  direction?: 'horizontal'| 'vertical',
  labelPlacement?: 'horizontal'| 'vertical',
  onFinish?: ((values?: object, allValues?: object) => void | boolean) | ((values?: object, allValues?: object) => Promise<void | boolean>),
  /** 传递给createForm的参数
   * @default {validateFirst:true}
  */
  createFormOptions?: IFormProps,

  ResultRender?: ComponentType<StepsFormResultRenderProps>,

  /** 重建form实例的depend项 */
  depend?: any,
  /** 获取form实例 */
  formRef?: RefObject<Form>
  showReset?: boolean
}

declare const StepsForm: ForwardRefExoticComponent<PropsWithChildren<StepsFormProps>> & {
  StepForm: FC<PropsWithChildren<StepFormProps>>
};

export {
  StepsForm,
  StepFormProps,
  StepsFormResultRenderProps,
  StepIconProps,
};
