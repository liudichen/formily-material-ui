import React from 'react';
import { LoadingButtonProps } from 'mui-component';

export interface SubmitProps extends LoadingButtonProps {
  resetOnSuccess?: boolean,
  onSubmit?: ((value: any) => void) | ((value: any) => Promise<void>),
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

export declare const Submit: React.FC<React.PropsWithChildren<SubmitProps>>;
