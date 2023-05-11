/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-05-09 13:46:43
 * @LastEditTime: 2022-05-19 12:12:17
 */
import React from 'react';
import { Form } from '@formily/core';
import type { ButtonProps } from '@mui/material';
import type { ResultProps } from 'mui-component';

export interface ResultRenderProps {
  handleStepChange?: (direction?: 'next' | 'previous' | number) => void,
  /**
   * 表单的所有字段值汇总,不可手动指定，由StepsForm组件自动生成并传递
   */
  status?: ResultProps['status']
  values?: object,
  form?: Form,
  resultTitle?: React.ReactNode,
  onResultReset?: () => void,
  resultSubTitle?: React.ReactNode,
  showResultReset?: boolean, // true,
  resultActions?: React.ReactNode | React.ReactNode[],
  resultResetText?: React.ReactNode,
  resultResetProps?: Omit<ButtonProps, 'onClick'> // { variant: 'outlined' }
  resultContent?: ResultProps['content']
}

declare const DefaultCompleteRender:React.FunctionComponent<ResultRenderProps>;
