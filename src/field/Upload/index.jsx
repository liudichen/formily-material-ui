import React from 'react';
import { observer } from '@formily/react';

import { UploadBase } from './UploadBase';
import { useFormilyFieldProps } from '../../hooks';
import { UseFormilyFieldPropsFormFieldBaseConfig, UseFormilyFieldPropsFormItemConfig } from '../../utils';

export const Upload = observer((props) => {
  const formilyFieldProps = useFormilyFieldProps(props, props.withFormItem ? { ...UseFormilyFieldPropsFormItemConfig, ...UseFormilyFieldPropsFormFieldBaseConfig } : { ...UseFormilyFieldPropsFormFieldBaseConfig });
  return (
    <UploadBase
      {...formilyFieldProps}
    />
  );
}, { forwardRef: true });

Upload.displayName = 'muiFormilyUpload';
