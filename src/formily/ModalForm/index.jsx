import {useImperativeHandle} from 'react';
import { useMemoizedFn, useControllableValue,useCreation } from 'ahooks';
import { createForm } from '@formily/core';
import { FormProvider, observer } from '@formily/react';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Link, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import { IconCircleX } from '@tabler/icons-react';
import { useGlobalId } from "@iimm/react-shared";
import Draggable from "react-draggable";

import { Reset } from '../Reset';
import { Submit } from '../Submit';

export const ModalForm = observer((props) => {
  const {
    trigger, triggerProps,
    title, titleProps, titleBoxProps,
    contentProps, actionsProps,
    children, content, withDialogContentWrapper,
    showCloseIcon, CloseIcon, closeIconButtonProps,
    showReset, showSubmit, submitText, resetText, submitProps, resetProps,
    onFinish, extraActions,
    open: openProp, onClose: onCloseProp,
    disabled,
    formRef, PaperComponent, form: formProp,
    fullScreen: fullScreenProp, draggable: draggableProp,
    responsive, breakpoint,  disableVisibleRecreateForm,
    ...restProps
  } = props;
  const theme = useTheme();
  const tId = useGlobalId();
  const down = useMediaQuery(theme.breakpoints.down(breakpoint));
  const fullScreen = fullScreenProp ?? (responsive ? down : undefined);
  const draggable = draggableProp && !fullScreen;
  const [open, setOpen] = useControllableValue(props, {
    defaultValue: false,
    valuePropName: "open",
    trigger: "setOpen",
  });
  const op = !!(disableVisibleRecreateForm || formProp) ? true:  open;
  const form = useCreation(() => formProp || createForm({}), [ op, formProp ]);

    const Commponent = useCreation(() => {
    if (!draggable) return undefined;
    return (props) => (
      <Draggable handle={`#${tId}`} cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper {...props} />
      </Draggable>
    );
  }, [draggable, tId]);

  useImperativeHandle(formRef, () => form, [ form ]);

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

  return (
    <>
      {!!trigger && (
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
        PaperComponent={PaperComponent ?? Commponent}
        {...restProps}
        fullScreen={fullScreen}
        open={trigger ? open : !!openProp}
        onClose={onClose}
      >
        <FormProvider form={form}>
          {(!!title || showCloseIcon) && (
            <DialogTitle
              display='flex'
              alignItems='start'
              bgcolor='#f5f5f5'
              {...(titleProps || {})}
              sx={{ padding: 0, ...(titleProps?.sx || {}) }}
            >
              <Box
                id={tId}
                flex={1} fontSize='16px' height='100%' alignSelf='center' marginLeft={1.5} marginY={0.5}
                {...(titleBoxProps || {})}
                sx={draggable ? ({ cursor: 'move', ...(titleBoxProps?.sx || {}) }) : titleBoxProps?.sx}
              >
                {title}
              </Box>
              {showCloseIcon && (
                <Tooltip arrow placement='top' title='关闭'>
                  <IconButton
                    sx={{ px: 0.25, py: 0.5 }}
                    {...(closeIconButtonProps || {})}
                    aria-label='close'
                    onClick={onClose}
                  >
                    {CloseIcon || <IconCircleX size='1.5em' stroke='1.5px' color='#8c8c8c' />}
                  </IconButton>
                </Tooltip>
              )}
            </DialogTitle>
          )}
          {withDialogContentWrapper ? (
            <DialogContent {...(contentProps || {})}>
              {content ?? children}
            </DialogContent>
          ) : (
            content ?? children
          )}
          <DialogActions {...(actionsProps || {})}>
            {extraActions}
            {showReset && (
              <Reset disabled={form?.submitting} {...(resetProps || {})}>
                {resetText}
              </Reset>
            )}
            {showSubmit && (
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
}, { forwardRef: true, displayName: 'iimm.Mui.Formily.ModalForm' });

ModalForm.defaultProps = {
  fullWidth: true,
  showCloseIcon: true,
  showSubmit: true,
  showReset: true,
  resetText: '重置',
  submitText: '提交',
  breakpoint: 'md',
  withDialogContentWrapper: true,
};

ModalForm.displayName = 'iimm.Mui.Formily.ModalForm';
