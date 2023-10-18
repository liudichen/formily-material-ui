import type { ReactNode, FC } from "react";
import type { SxProps } from "@mui/material";
import type { DateTimePickerProps as MuiDateTimePickerProps } from "@mui/x-date-pickers";

import type { FormItemBaseProps, FormItemExtraProps } from "../../layout";
import type { FieldBaseProps } from "../../types";

export interface DateTimePickerBaseProps
  extends Omit<MuiDateTimePickerProps, "value" | "onChange">,
    Omit<FormItemBaseProps, "className" | "style" | "prefixCls">,
    FieldBaseProps<any>,
    FormItemExtraProps {
  size?: "small" | "medium";
  /** 显示内部label? */
  showInnerLabel?: boolean;
  label?: ReactNode;
  /** 文本框宽度拉满？ */
  fullWidth?: boolean;
  /** 选中时文本框颜色 */
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  /** 文本框样式 */
  variant?: "outlined" | "filled" | "standard";
  textFieldSx?: SxProps;
}

export declare const DateTimePickerBase: FC<DateTimePickerBaseProps>;
