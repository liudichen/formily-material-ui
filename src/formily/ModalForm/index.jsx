import React from 'react';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { createForm } from '@formily/core';
import { FormProvider, observer } from '@formily/react';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Link, Tooltip, useMediaQuery, useTheme, Paper } from '@mui/material';
import Close from '@mui/icons-material/Close';
import Draggable from 'react-draggable';
import classNames from 'classnames';

import { Reset } from '../Reset';
import { Submit } from '../Submit';
import { useId } from '../../hooks';

export const ModalForm = observer((props) => {
  const {
    trigger, title, titleProps, contentProps, actionsProps, triggerProps,
    children,
    showCloseIcon, showReset, showSubmit, CloseIcon,
    submitText, resetText, submitProps, resetProps, createFormOptions,
    onFinish, extraActions,
    open: openProp, onClose: onCloseProp,
    disabled,
    formRef, PaperComponent, fullScreen,
    draggable, responsive, breakpoint, depend, disableVisibleRecreateForm,
    ...restProps
  } = props;
  const theme = useTheme();
  const down = useMediaQuery(theme.breakpoints.down(breakpoint));
  const titleId = useId();
  const [open, setOpen] = useSafeState(false);
  const op = disableVisibleRecreateForm || (trigger ? open : !!openProp);
  const form = React.useMemo(() => createForm(createFormOptions || { validateFirst: true }), [op, depend]);

  React.useImperativeHandle(formRef, () => form, [form]);

  const onClose = useMemoizedFn(async (e, reason) => {
    const res = await onCloseProp?.(e, reason);
    if (trigger && res !== false) {
      setOpen(false);
    }
  });
  const onSubmit = useMemoizedFn(async (values) => {
    const res = await onFinish?.(values);
    if (res === true) {
      onClose();
    }
  });
  const DraggablePaper = useMemoizedFn((props) => {
    const { handle = `.${titleId}`, cancel = '[class*="MuiDialogContent-root"]', ...restProps } = props;
    return (
      <Draggable handle={handle} cancel={cancel}>
        <Paper {...restProps} />
      </Draggable>
    );
  });

  return (
    <>
      { !!trigger && (
        <Link
          underline='none'
          {...(triggerProps || {})}
          sx={{ cursor: 'pointer', ...(triggerProps?.sx || {}) }}
          onClick={(e) => {
            if (!disabled) {
              setOpen(true);
              triggerProps?.onClick?.(e);
            }
          }}
        >
          {trigger}
        </Link>
      )}
      <Dialog
        {...restProps}
        fullScreen={fullScreen ?? (responsive ? down : undefined)}
        PaperComponent={PaperComponent ?? (draggable ? DraggablePaper : undefined)}
        open={trigger ? open : !!openProp}
        onClose={onClose}
      >
        <FormProvider form={form}>
          <DialogTitle
            {...(titleProps || {})}
            className={classNames(titleId, titleProps?.className)}
            sx={{ fontSize: '16px', ...(titleProps?.sx || {}) }
            }
          >
            {title}
            {showCloseIcon && (
              <Tooltip arrow placement='top' title='关闭'>
                <IconButton
                  aria-label='close'
                  onClick={onClose}
                  sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
                >
                  {CloseIcon || <Close />}
                </IconButton>
              </Tooltip>
            )}
          </DialogTitle>
          <DialogContent {...(contentProps || {})}>
            {children}
          </DialogContent>
          <DialogActions {...(actionsProps || {})}>
            {extraActions}
            { showReset && (
              <Reset {...(resetProps || {})}>
                {resetText}
              </Reset>
            )}
            { showSubmit && (
              <Submit
                {...(submitProps || {})}
                onSubmit={onSubmit}
              >
                {submitText}
              </Submit>
            )}
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
}, { forwardRef: true });

ModalForm.defaultProps = {
  fullWidth: true,
  showCloseIcon: true,
  showSubmit: true,
  showReset: true,
  resetText: '重置',
  submitText: '提交',
  breakpoint: 'md',
};

ModalForm.displayName = 'muiFormilyModalForm';
