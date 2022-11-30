import React from 'react';
import { observer } from '@formily/react';

import { useFormilyFieldProps } from '../../hooks';
import { EditableTableBase, EditableTableBaseProps } from './EditableTableBase';

export interface EditableTableProps extends EditableTableBaseProps {}

/**
 * @deprecated
 * 兼容之前mui-formily/mui-formfield的组件，不建议使用
 */
export const EditableTable = observer((props: EditableTableBaseProps) => {
  const formilyFieldProps = useFormilyFieldProps(props, { fullWidth: true }) as EditableTableBaseProps;
  return (
    <EditableTableBase
      {...formilyFieldProps}
    />
  );
});
