import React from 'react';
import { observer } from '@formily/react';

import { UploadBase } from './UploadBase';
import { useFormilyFieldProps } from '../../hooks';

export const Upload = observer((props) => {
  const formilyFieldProps = useFormilyFieldProps(props, {});
  return (
    <UploadBase
      {...formilyFieldProps}
    />
  );
});

Upload.displayName = 'iimm.Mui.Formily.Upload';
