import React from 'react';
import { observer } from '@formily/react';

import { useFormilyFieldProps } from '../../hooks';
import { FormItemBase } from './FormItemBase';

export const FormItem = observer((props) => {
  const formilyFieldProps = useFormilyFieldProps(props, { tooltip: true, label: true, error: true, required: true, readOnly: false, disabled: false, feedbackStatus: true, feedbackText: true, defaultValue: false,
    labelPosition: true, labelAlign: true, labelWidth: true, labelWrap: true, wrapperAlign: true, wrapperWidth: true, wrapperWrap: true, fullWidth: true, colon: true, tooltipIcon: true, tooltipLayout: true, showFeedback: true, feedbackLayout: true,
  });
  return (
    <FormItemBase
      {...formilyFieldProps}
    />
  );
});

FormItem.defaultProps = {};

FormItem.displayName = 'muiFormilyFormItem';
