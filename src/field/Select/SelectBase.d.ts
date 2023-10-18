import type { ReactNode, CSSProperties, FC } from "react";
import type { AutocompleteProps, FormLabelProps } from "@mui/material";

import type { FieldBaseProps, IFieldOptionItem, IFieldPropOptions, RefreshOptionsProps } from "../../types";
import type { FormItemBaseProps } from "../../layout";

export interface SelectBaseProps
  extends FieldBaseProps<IFieldOptionItem | IFieldOptionItem[] | null | undefined>,
    Partial<
      Omit<
        AutocompleteProps<unknown, boolean | undefined, boolean | undefined, boolean | undefined>,
        "value" | "onChange" | "defaultValue" | "options"
      >
    >,
    Omit<FormItemBaseProps, "className" | "style" | "prefixCls">,
    RefreshOptionsProps {
  options?: IFieldPropOptions;
  label?: string;
  /** 显示内部label? */
  /** 仅showInnerLabel=true时传递给内部Label */
  innerLabelProps?: FormLabelProps;
  showInnerLabel?: boolean;
  placeholder?: string;
  required?: boolean;
  tooltip?: ReactNode;
  variant?: "outlined" | "filled" | "standard";
  /** 允许不再options里的值? */
  allowExtraValue?: boolean;

  /** 不从Field获取信息 */
  noField?: boolean;
  /** 不从FormLayout获取fullWidth信息 */
  noFormLayout?: boolean;
  /** 外层包裹FormItemBase? */
  withFormItem?: boolean;
  /** 当 withFormItem=true时传递给FormItemBase的className*/
  formItemCls?: string;
  /** 当 withFormItem=true时传递给FormItemBase的style*/
  formItemStyle?: CSSProperties;
  /** 当 withFormItem=true时，传递给formItem的内部className的前缀，可以在引入自定义样式时使用
   * @default iimm 可以通过样式覆盖来修改FormItem内部样式(不需要传递此值)
   */
  formItemPrefixCls?: string;
}

export declare const SelectBase: FC<SelectBaseProps>;
