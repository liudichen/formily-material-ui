import React from 'react';

import { CheckboxGroupBaseProps } from './CheckboxGroupBase';

export interface CheckboxGroupProps extends CheckboxGroupBaseProps {
  /** 不从FormLayout获取信息 */
  noFormLayout?: boolean,
  /** 手动指定不从外层Field获取信息 */
  noField?: boolean,
}

export declare const CheckboxGroup: React.ForwardRefExoticComponent<CheckboxGroupProps>;
