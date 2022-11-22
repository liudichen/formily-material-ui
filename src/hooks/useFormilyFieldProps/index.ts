import React from 'react';
import { useField } from '@formily/react';
import { isVoidField } from '@formily/core';

import { ICommonProps } from '../../types';

interface IUseFormilyFieldProps {
  /** @default undefined   */
  label?: boolean,
  /** @default undefined   */
  required?: boolean,
  /** @default undefined   */
  error?: boolean,
  /** @default undefined   */
  tooltip?: boolean,
  /** @default undefined   */
  options?: boolean,
  /** @default undefined   */
  display?: boolean,
  /** @default true   */
  defaultValue?: boolean,
  /** @default true   */
  disabled?: boolean,
  /** @default true   */
  readOnly?: boolean,
  /** @default undefined   */
  feedbackText?: boolean,
  /** @default undefined   */
  feedbackStatus?: boolean,
}

interface IProps extends ICommonProps {
  label?: React.ReactNode,
  tooltip?: React.ReactNode,
  defaultValue?: any,
  disabled?: boolean,
  readOnly?: boolean,
  error?: boolean,
  required?: boolean,
  options?: any,
  display?: 'visible' | 'hidden' | 'none' | string,
  feedbackStatus?: 'error' | 'warning' | 'success' | 'pending' | string,
  feedbackText?: React.ReactNode,
  noField?: boolean,
}

export const useFormilyFieldProps = (props: IProps, config: IUseFormilyFieldProps = {}) => {
  const field = useField();
  if (!field || props?.noField) return props;
  const formatProps = {
    ...props,
  };
  if (config.display) { formatProps.display = props.display ?? field.display; }
  if (config?.label) { formatProps.label = props.label ?? field.title; }
  if (config?.tooltip) { formatProps.tooltip = props?.tooltip ?? field.description; }
  if (isVoidField(field)) {
    return formatProps;
  }
  if (config?.defaultValue !== false) {
    formatProps.defaultValue = field.initialValue ?? props.defaultValue;
  }
  if (config?.disabled !== false) {
    formatProps.disabled = props.disabled ?? field.disabled;
  }
  if (config?.readOnly !== false) {
    formatProps.readOnly = props.readOnly ?? field.readOnly;
  }
  if (config?.error) {
    formatProps.error = props.error ?? field.selfInvalid;
  }
  if (config?.required) {
    const takeRequired = () => {
      if (field.required && field.pattern !== 'readPretty') {
        return true;
      }
      if ('required' in props) {
        return props.required;
      }
      return false;
    };
    formatProps.required = takeRequired();
  }
  if (config?.options) {
    formatProps.options = field.dataSource ?? props.options;
  }
  if (config?.feedbackStatus) {
    formatProps.feedbackStatus = props.feedbackStatus ?? (field.validating ? 'pending' : (field.decoratorProps.feedbackStatus || field.validateStatus));
  }
  if (config?.feedbackText) {
    const takeMessage = () => {
      if (field.validating) return;
      if (props.feedbackText) return props.feedbackText;
      const split = (messages: any[]) => {
        return messages.reduce((buf, text, index) => {
          if (!text) return buf;
          return index < messages.length - 1
            ? buf.concat([ text, ', ' ])
            : buf.concat([ text ]);
        }, []);
      };
      if (field.selfErrors.length) return split(field.selfErrors);
      if (field.selfWarnings.length) return split(field.selfWarnings);
      if (field.selfSuccesses.length) return split(field.selfSuccesses);
    };
    formatProps.feedbackText = takeMessage();
  }
  return formatProps;
};
