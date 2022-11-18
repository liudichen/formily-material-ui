import React from 'react';
import { useMemoizedFn } from 'ahooks';
import { useParentForm } from '@formily/react';
import { Button } from '@mui/material';

export const Reset = (props) => {
  const {
    forceClear,
    validate,
    onResetValidateSuccess,
    onResetValidateFailed,
    children,
    onClick,
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
      onClick={reset}
      {...restProps}
    >
      {children}
    </Button>
  );
};

Reset.defaultProps = {
  children: '重置',
  variant: 'outlined',
  color: 'secondary',
  onResetValidateFailed: (error) => console.log('resetValidateFailed', error),
};

Reset.displayName = 'muiFormilyReset';
