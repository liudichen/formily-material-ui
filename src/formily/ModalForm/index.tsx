import { useImperativeHandle, type ReactNode, type MutableRefObject } from "react";
import { useMemoizedFn, useControllableValue, useCreation } from "ahooks";
import { createForm, type Form } from "@formily/core";
import { FormProvider, observer } from "@formily/react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
  Tooltip,
  useMediaQuery,
  useTheme,
  Paper,
  type PaperProps,
} from "@mui/material";
import { IconCircleX } from "@tabler/icons-react";
import { useGlobalId } from "@iimm/react-shared";
import { type ModalProps } from "mui-component";
import Draggable from "react-draggable";

import { Reset, type ResetProps } from "../Reset";
import { Submit, type SubmitProps } from "../Submit";

export interface ModalFormProps
  extends Omit<
    ModalProps,
    | "showActions"
    | "showCancel"
    | "onCancel"
    | "cancelText"
    | "cancelProps"
    | "showConfirm"
    | "onConfirm"
    | "confirmText"
    | "confirmProps"
  > {
  /** 额外的DialogActions项（会放在Reset前） */
  extraActions?: ReactNode;
  /** 显示重置按钮? */
  showReset?: boolean;
  /** 重置按钮的props */
  resetProps?: ResetProps;
  resetText?: ReactNode;
  /** 显示提交按钮? */
  showSubmit?: boolean;
  /** 提交按钮的props */
  submitProps?: Omit<SubmitProps, "onSubmit">;
  submitText?: ReactNode;
  /** 返回值为true时窗口自动关闭 */
  onFinish?: ((values: any) => boolean | void) | ((values: any) => Promise<boolean | void>);
  /** 禁用modl的open控制重新创建form实例 */
  disableVisibleRecreateForm?: boolean;
  formRef?: MutableRefObject<Form>;
  form?: Form;
  ref?: any;
}

export const ModalForm = observer(
  (props: ModalFormProps) => {
    const {
      trigger,
      triggerProps,
      title,
      titleProps,
      titleBoxProps,
      contentProps,
      actionsProps,
      children,
      content,
      withDialogContentWrapper = true,
      showCloseIcon = true,
      CloseIcon,
      closeIconButtonProps,
      showReset = true,
      showSubmit = true,
      submitText = "提交",
      resetText = "重置",
      submitProps,
      resetProps,
      onFinish,
      extraActions,
      open: openProp,
      onClose: onCloseProp,
      disabled,
      formRef,
      PaperComponent,
      form: formProp,
      fullScreen: fullScreenProp,
      draggable: draggableProp,
      responsive,
      breakpoint = "md",
      fullWidth = true,
      disableVisibleRecreateForm,
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
    const op = !!disableVisibleRecreateForm || !!formProp ? true : open;
    const form = useCreation(() => (!!formProp ? formProp : createForm({})), [op, formProp]);

    const Commponent = useCreation(() => {
      if (!draggable) return undefined;
      return (props: PaperProps) => (
        <Draggable handle={`#${tId}`} cancel={'[class*="MuiDialogContent-root"]'}>
          <Paper {...props} />
        </Draggable>
      );
    }, [draggable, tId]);

    useImperativeHandle(formRef, () => form, [form]);

    const onClose = useMemoizedFn(async (e?: any, reason?: any) => {
      const res: any = await onCloseProp?.(e, reason);
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
            underline="none"
            {...(triggerProps || {})}
            sx={{ cursor: "pointer", ...(triggerProps?.sx || {}) }}
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
          fullWidth={fullWidth}
          PaperComponent={PaperComponent ?? Commponent}
          {...restProps}
          fullScreen={fullScreen}
          open={trigger ? open : !!openProp}
          onClose={onClose}
        >
          <FormProvider form={form}>
            {(!!title || showCloseIcon) && (
              <DialogTitle
                display="flex"
                alignItems="start"
                bgcolor="#f5f5f5"
                {...(titleProps || {})}
                sx={{ padding: 0, ...(titleProps?.sx || {}) }}
              >
                <Box
                  id={tId}
                  flex={1}
                  fontSize="16px"
                  height="100%"
                  alignSelf="center"
                  marginLeft={1.5}
                  marginY={0.5}
                  {...(titleBoxProps || {})}
                  sx={draggable ? { cursor: "move", ...(titleBoxProps?.sx || {}) } : titleBoxProps?.sx}
                >
                  {title}
                </Box>
                {showCloseIcon && (
                  <Tooltip arrow placement="top" title="关闭">
                    <IconButton
                      sx={{ px: 0.25, py: 0.5 }}
                      {...(closeIconButtonProps || {})}
                      aria-label="close"
                      onClick={onClose}
                    >
                      {CloseIcon || <IconCircleX size="1.5em" stroke="1.5px" color="#8c8c8c" />}
                    </IconButton>
                  </Tooltip>
                )}
              </DialogTitle>
            )}
            {withDialogContentWrapper ? (
              <DialogContent {...(contentProps || {})}>{content ?? children}</DialogContent>
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
                <Submit {...(submitProps || {})} onSubmit={onSubmit}>
                  {submitText}
                </Submit>
              )}
            </DialogActions>
          </FormProvider>
        </Dialog>
      </>
    );
  },
  { forwardRef: true, displayName: "iimm.Mui.Formily.ModalForm" }
);
