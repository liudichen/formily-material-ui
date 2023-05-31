/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-05-09 13:46:43
 * @LastEditTime: 2022-05-19 12:12:17
 */
import type { ReactNode, ComponentType } from 'react';
import { type Form } from '@formily/core';
import type { ButtonProps } from '@mui/material';
import type { ResultProps } from 'mui-component';

export interface ResultRenderProps {
  handleStepChange?: (direction?: 'next' | 'previous' | number) => void,
  status?: ResultProps['status']
  /**
   * 表单的所有字段值汇总,不可手动指定，由StepsForm组件自动生成并传递
   */
  values?: object,
  form?: Form,
  resultTitle?: ReactNode,
  onResultReset?: () => void,
  resultSubTitle?: ReactNode,
  showResultReset?: boolean, // true,
  resultActions?: ReactNode | ReactNode[],
  resultResetText?: ReactNode,
  resultResetProps?: Omit<ButtonProps, 'onClick'> // { variant: 'outlined' }
  resultContent?: ResultProps['content']
}

declare const DefaultCompleteRender: ComponentType<ResultRenderProps>;
