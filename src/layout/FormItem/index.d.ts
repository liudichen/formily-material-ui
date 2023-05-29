import type { FC, PropsWithChildren } from 'react';

import type { FormItemBaseProps } from './FormItemBase';

export interface FormItemProps extends FormItemBaseProps {
  /** 不从FormLayout获取信息 */
  noFormLayout?: boolean,
  /** 手动指定不从外层Field获取信息 */
  noField?: boolean,
}

/** 适用于Field的decorator */
export declare const FormItem: FC<PropsWithChildren<FormItemProps>>;
