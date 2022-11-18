import React from 'react';

import { LoadingButtonProps } from '../../utils';

export interface SubmitProps extends LoadingButtonProps {
  resetOnSuccess?: boolean,
  onSubmit?: (value: object) => void,
  onSubmitSuccess?: (res: any) => void,
  onSubmitFailed?: (error: Error) => void,
  loading?: boolean,
  loadingIndicator?: React.ReactNode,
  loadingPosition?: 'center' | 'start' | 'end',
  enterKeySubmit?: boolean,
  keyPressEvents?: ('keydown' | 'keyup')[],
  keyPressTarget?: () => Element | Element | React.MutableRefObject<Element> | string | number,
  keyPressExactMatch?: boolean,
}

export declare const Submit: React.FC<SubmitProps>;