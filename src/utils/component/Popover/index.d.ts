import React from 'react';
import { PopoverProps as MuiPopoverProps } from '@mui/material';

export interface PopoverProps extends MuiPopoverProps {
  triggerType?: 'hover' | 'click',
  disabled?: boolean,
  trigger?: React.ReactNode,
  content?: React.ReactNode,
}

export declare const Popover: React.ForwardRefExoticComponent<PopoverProps>;
