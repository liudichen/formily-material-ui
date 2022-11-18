import React from 'react';
import { useCreation, useMemoizedFn, useKeyPress } from 'ahooks';
import { useParentForm, observer } from '@formily/react';

import { LoadingButton } from '../../utils';

export const Submit = observer((props) => {
  const {
    onSubmit,
    onSubmitFailed,
    onSubmitSuccess,
    resetOnSuccess,
    enterKeySubmit,
    loading,
    onClick,
    children,
    keyPressEvents,
    keyPressTarget,
    keyPressExactMatch,
    ...restProps
  } = props;
  const form = useParentForm();
  const submit = useMemoizedFn((e) => {
    if (!form) return;
    if (onClick) {
      if (onClick?.(e) === false) return;
    }
    if (onSubmit) {
      form.submit(onSubmit).then((res) => {
        onSubmitSuccess?.(res);
        if (resetOnSuccess && res === true) {
          form?.reset('*');
        }
      }).catch(onSubmitFailed);
    }
  });
  const autoSubmit = useMemoizedFn(() => {
    if (!enterKeySubmit) { return; }
    submit();
  });
  const options = useCreation(() => {
    if (!keyPressEvents && !keyPressTarget && typeof keyPressExactMatch !== 'boolean') return undefined;
    const Op = {};
    if (keyPressEvents) Op.envents = keyPressEvents;
    if (typeof keyPressExactMatch === 'boolean') Op.exactMatch = keyPressExactMatch;
    if ([ 'number', 'string' ].includes(typeof keyPressTarget)) {
      Op.target = () => document.getElementById(keyPressTarget);
    } else if ([ 'object', 'function' ].includes(typeof keyPressTarget)) {
      Op.target = keyPressTarget;
    }
    return Op;
  }, [ keyPressEvents, keyPressTarget, keyPressExactMatch ]);
  useKeyPress('enter', () => autoSubmit(), options);
  return (
    <LoadingButton
      {...restProps}
      loading={loading ?? form?.submitting}
      onClick={submit}
    >
      {children}
    </LoadingButton>
  );
});

Submit.defaultProps = {
  children: '提交',
  variant: 'contained',
  onSubmitSuccess: () => {},
  onSubmitFailed: (error) => { console.log('submitFailed', error); },
};

Submit.displayName = 'muiFormilySubmit';
