import React, { createContext, useContext } from 'react';
import { GridProps } from '@mui/material';

export interface CommonLayoutProps {
  /** lable/title显示的位置 */
  labelPosition?: 'top' | 'left' | 'inner',
  labelWidth?: number | string,
  labelAlign?: 'left' | 'right',
  labelWrap?: boolean,
  wrapperAlign?: 'left' | 'right',
  wrapperWrap?: boolean,
  wrapperWidth?: number | string,
  wrapperAlign?: 'left' | 'right',
  /**
   * 子项fullWidth?
   * @default true
   */
  fullWidth?: boolean,
  /** label/title显示冒号? */
  colon?: boolean,
  tooltipIcon?: React.ReactNode,
  /** 帮助文本显示方式, text:在问题上显示tooltip, icon:在图标上显示tooltip */
  tooltipLayout?: 'text' | 'icon',
  /** 显示反馈/错误信息? */
  showFeedback?: boolean,
  /** 反馈/错误文本显示方式： text：以文本方式显示在组件下方, popover:以在图片上的tooltip方式显示在组件右侧 */
  feedbackLayout?: 'popover' | 'text',
  /** 手动指定不从外层Field获取信息 */
  noField?: boolean,
}

interface ColsProps {
  xs?: number,
  sm?: number,
  md?: number,
  lg?: number,
  xl?: number,
}

interface IFormLayoutContext extends CommonLayoutProps {
  /** 传递给下层formField，是否包裹FormItemBase
   * @default true
   */
  withFormItem?: boolean,

}

export interface FormLayoutProps extends IFormLayoutContext, Omit<GridProps, 'item'> {
  /** 手动指定无需获取form信息 */
  noForm?: boolean,
  defaultCols?: ColsProps,
}

declare const FormLayoutContext = createContext<IFormLayoutContext>(null);
export declare const useFormLayout = () => useContext(FormLayoutContext);

/** 本质是1个 container=true 的Grid组件，如果child名称是Grid开头则原样保留child，如果child名称是Field则检查display不等于visible的都丢弃，其他的都自动变成
 *  ```<Grid item>{child}</Grid>```
 * 同时，本组件接受一些传递给子组件的布局信息
 */
export declare const FormLayout: React.FC<React.PropsWithChildren<FormLayoutProps>>;

export default FormLayout;
