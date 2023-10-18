import type { ReactNode, FC } from "react";
import type { SxProps } from "@mui/material";
import type { DateRangePickerProps as MuiDateRangePickerProps } from "mui-component";

import type { FormItemBaseProps, FormItemExtraProps } from "../../layout";
import type { FieldBaseProps } from "../../types";

export interface DateRangePickerBaseProps
  extends Omit<MuiDateRangePickerProps, "value" | "onChange">,
    Omit<FormItemBaseProps, "className" | "style" | "prefixCls">,
    FieldBaseProps<any>,
    FormItemExtraProps {
  size: "small" | "medium";
  /** 两个文本框直接的元素内容 */
  toText?: ReactNode;
  /** 两个文本框之间元素外层Box的sx */
  toSx?: SxProps;
  /** 文本框宽度拉满？ */
  fullWidth?: boolean;
  /** 选中时文本框颜色 */
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  /** 文本框样式 */
  variant?: "outlined" | "filled" | "standard";
  textFieldSx?: SxProps;
}

export declare const DateRangePickerBase: FC<DateRangePickerBaseProps>;
