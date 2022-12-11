import React from 'react';
import { useMemoizedFn } from 'ahooks';
import { useParentForm, observer } from '@formily/react';
import { Button } from '@mui/material';

export const Reset = observer((props) => {
  const {
    forceClear,
    validate,
    onResetValidateSuccess,
    onResetValidateFailed,
    children,
    onClick,
    disabled,
    ...restProps
  } = props;
  const form = useParentForm();
  const reset = useMemoizedFn((e) => {
    if (!form) return;
    if (onClick) {
      if (onClick?.(e) === false) return;
    }
    form
      .reset('*', { forceClear, validate })
      .then((payload) => {
        onResetValidateSuccess?.(payload);
        form.setValues(form.initialValues);
      })
      .catch(onResetValidateFailed);
  });

  return (
    <Button
      disabled={disabled || form?.submitting}
      onClick={reset}
      {...restProps}
    >
      {children}
    </Button>
  );
});

Reset.defaultProps = {
  children: '重置',
  variant: 'outlined',
  color: 'secondary',
  onResetValidateFailed: (error) => console.log('resetValidateFailed', error),
};

Reset.displayName = 'iimm.Mui.Formily.Reset';
