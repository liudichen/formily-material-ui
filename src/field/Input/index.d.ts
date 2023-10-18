import type { FC } from "react";

import type { InputBaseProps } from "./InputBase";

export interface InputProps extends InputBaseProps {
  /** 手动指定不从外层Field获取信息 */
  noField?: boolean;
}

export declare const Input: React.FC<InputProps>;
