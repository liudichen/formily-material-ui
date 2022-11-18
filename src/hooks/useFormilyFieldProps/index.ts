import { useField } from '@formily/react';
import { isVoidField } from '@formily/core';

import { ICommonProps } from '../../types';

interface IUseFormilyFieldProps {
  label?: boolean,
  required?: boolean,
  error?: boolean,
  tooltip?: boolean,
  options?: boolean,
}


export const useFormilyFieldProps = (props: ICommonProps, config: IUseFormilyFieldProps = {}) => {
  const field = useField();
  if (!field || isVoidField(field) || !Object.keys(config || {}).length) return props;
  const formatProps = {
    ...props,
  };
  formatProps.defaultValue = props.defaultValue ?? field.initialValue;
  formatProps.disabled = props.disabled ?? field.disabled;
  formatProps.readOnly = props.readOnly ?? field.readOnly;
  if (config?.error) {
    formatProps.error = props.error ?? field.selfInvalid;
  }
  if (config?.required) {
    formatProps.required = props.required ?? field.required;
  }
  if (config?.label) {
    formatProps.label = props.label ?? field.title;
  }
  if (config?.tooltip) {
    formatProps.tooltip = props?.tooltip ?? field.description;
  }
  if (config?.options) {
    formatProps.options = props?.options ?? field.dataSource;
  }
  return formatProps;
};
