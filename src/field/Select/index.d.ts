import React from 'react';

import { SelectBaseProps } from './SelectBase';

export interface SelectProps extends SelectBaseProps {
  /** 不从FormLayout获取fullWidth信息 */
  noFormLayout?: boolean,
}

export declare const Select: React.ForwardRefExoticComponent<any, SelectProps>;
