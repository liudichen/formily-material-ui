import React from 'react';
import Draggable from 'react-draggable';
import { Paper, PaperProps } from '@mui/material';

export interface DraggablePaperProps extends PaperProps {
  handle?: string,
  cancel?: string
}

export const DraggablePaper = (props: DraggablePaperProps) => {
  const { handle, cancel, ...restProps } = props;
  return (
    <Draggable handle={handle} cancel={cancel}>
      <Paper {...restProps} />
    </Draggable>
  );
};

DraggablePaper.defaultProps = {
  cancel: '[class*="MuiDialogContent-root"]',
};
