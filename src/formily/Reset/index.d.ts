import React from 'react';
import { ButtonProps } from '@mui/material';

export interface ResetProps extends ButtonProps {
  forceClear?: boolean,
  validate?: boolean,
  onResetValidateSuccess?: (payload: any) => void,
  onResetValidateFailed?: (error: Error) => void,
}

export declare const Reset: React.FC<ResetProps>;
