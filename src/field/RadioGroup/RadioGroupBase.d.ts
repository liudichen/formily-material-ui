import React from "react";
import type { SxProps } from "@mui/material";

import type { IFieldPropOptions, FieldBaseProps, RefreshOptionsProps } from "../../types";
import type { FormItemBaseProps } from "../../layout";

export interface RadioGroupBaseProps
  extends FieldBaseProps<any>,
    Omit<FormItemBaseProps, "className" | "style" | "prefixCls">,
    RefreshOptionsProps {
  /** 选项或返回选项的函数。
   *选项值：{value,label,color?,size?,disabled?,icon?,required?,checkedIcon?}
   */
  options?: IFieldPropOptions;
  layout?: "horizontal" | "vertical";
  /** 传递给每个checkbox项 */
  itemSx?: SxProps;
  /** 传递给FormGroup */
  sx?: SxProps;
  labelPlacement?: "bottom" | "end" | "start" | "top";
  /** 未选中时的图标 */
  icon?: React.ReactNode;
  /** 选中时的图标 */
  checkedIcon?: React.ReactNode;
  size?: "medium" | "small";
  color?: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" | string;
  name?: string;

  /** 不从Field获取信息 */
  noField?: boolean;
  /** 不从FormLayout获取fullWidth信息 */
  noFormLayout?: boolean;
  /** 外层包裹FormItemBase? */
  withFormItem?: boolean;
  /** 当 withFormItem=true时传递给FormItemBase的className*/
  formItemCls?: string;
  /** 当 withFormItem=true时传递给FormItemBase的style*/
  formItemStyle?: React.CSSProperties;
  /** 当 withFormItem=true时，传递给formItem的内部className的前缀，可以在引入自定义样式时使用
   * @default iimm 可以通过样式覆盖来修改FormItem内部样式(不需要传递此值)
   */
  formItemPrefixCls?: string;
}

export declare const RadioGroupBase: React.FC<RadioGroupBaseProps>;
