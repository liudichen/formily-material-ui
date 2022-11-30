import React from 'react';
import { DialogProps } from '@mui/material';
import { GridActionsCellItemProps } from '@mui/x-data-grid';

interface IDeleteConfirmDialogProps extends DialogProps {
  title?: React.ReactNode,
  content?: React.ReactNode,
}

interface DeleteActionItemProps extends GridActionsCellItemProps {
  showInMenu?: boolean,
  handleDeleteRow: (id: number | string) => void,
  deleteConfirmDialogProps?: IDeleteConfirmDialogProps,
}

declare const DeleteActionItem: React.FC<React.PropsWithChildren<DeleteActionItemProps>>;

export default DeleteActionItem;
