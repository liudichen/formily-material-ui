import React from 'react';
import { useSafeState } from 'ahooks';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';

const DeleteActionItem = (props) => {
  const { deleteConfirmDialogProps, showInMenu, handleDeleteRow, ...restProps } = props;
  const [open, setOpen] = useSafeState(false);
  const { title, content, children, ...restDialogProps } = (deleteConfirmDialogProps || {});
  return (
    <>
      <GridActionsCellItem
        {...restProps}
        onClick={(e) => {
          if (showInMenu) {
            handleDeleteRow();
          } else {
            setOpen(true);
          }
        }}
        showInMenu={showInMenu}
      />
      { !showInMenu && (
        <Dialog
          {...restDialogProps}
          open={open}
        >
          <DialogTitle sx={{ fontSize: 16 }}>
            {title || '确认删除该行数据吗?'}
          </DialogTitle>
          <DialogContent dividers>
            {content || children || '点击“Yes”以删除该行'}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>
            No
            </Button>
            <Button onClick={handleDeleteRow}>
            Yes
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default DeleteActionItem;
