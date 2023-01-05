import React from 'react';
import { useField } from '@formily/react';
import { isVoidField } from '@formily/core';

import { useFormLayout } from '../../layout/FormLayout';
import type { ICommonProps } from '../../types';
import type { CommonLayoutProps } from '../../layout/FormLayout';

interface IUseFormilyFieldConfig {
  /** 是否从Field获取label(title)配置 */
  label?: boolean,
  /** 是否从Field获取required配置 */
  required?: boolean,
  /** 是否从Field获取error配置 */
  error?: boolean,
  /** 是否从Field获取tooltip(description配置 */
  tooltip?: boolean,
  /** 是否从Field获取optionos(dataSource)配置 */
  options?: boolean,
  /** 是否从Field获取display配置 */
  display?: boolean,
  /** 是否从Field获取defaultValue(initialValue)配置 */
  defaultValue?: boolean,
  /** 是否从Field获取disabled配置 */
  disabled?: boolean,
  /** 是否从Field获取readOnly配置 */
  readOnly?: boolean,
  /** 是否从Field获取feedbackText配置 */
  feedbackText?: boolean,
  /** 是否从Field获取feedbackStatus配置 */
  feedbackStatus?: boolean,
  /** 是否从Field获取fullWidth配置 */
  fullWidth?: boolean,
  /** 是否从FormLayout获取labelPosition配置*/
  labelPosition?: boolean,
  /** 是否从FormLayout获取labelAlign配置 */
  labelAlign?: boolean,
  /** 是否从FormLayout获取labelWidth配置*/
  labelWidth?: boolean,
  /** 是否从FormLayout获取labelWrap配置 */
  labelWrap?: boolean,
  /** 是否从FormLayout获取wrapperAlign配置 */
  wrapperAlign?: boolean,
  /** 是否从FormLayout获取wrapperWidth配置*/
  wrapperWidth?: boolean,
  /** 是否从FormLayout获取wrapperWrap配置 */
  wrapperWrap?: boolean,
  /** 是否从FormLayout获取colon配置 */
  colon?: boolean,
  /** 是否从FormLayout获取tooltipIcon配置 */
  tooltipIcon?: boolean,
  /** 是否从FormLayout获取tooltipLayout配置*/
  tooltipLayout?: boolean,
  /** 是否从FormLayout获取showFeedback配置 */
  showFeedback?: boolean,
  /** 是否从FormLayout获取feedbackLayout配置*/
  feedbackLayout?: boolean,
  /** 是否从FormLayout获取配置*/
  noFormLayout?: boolean,
  /** 是否从FormLayout获取showInnerLabel配置*/
  showInnerLabel?: boolean,
}

interface IProps extends ICommonProps, CommonLayoutProps {
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
  /** 不从FormLayout获取信息 */
  noFormLayout?: boolean,
  withFormItem?: boolean,
}

import { UseFormilyFieldPropsFormFieldBaseConfig, UseFormilyFieldPropsFormItemConfig } from '../../utils';

/** 用来处理FormItem及字段项 props的hooks可以从FormLayout或Field 获取布局或label，error等信息*/
export const useFormilyFieldProps = (props: IProps, extraConfig: IUseFormilyFieldConfig = {}) => {
  const formatProps = {
    ...props,
  };
  const layout = useFormLayout();
  const withFormItem = props?.withFormItem ?? (props?.noFormLayout ? undefined : layout?.withFormItem);
  formatProps.withFormItem = withFormItem;
  const field = useField();
  if ((props?.noField || !field) && (!layout || props?.noFormLayout)) return formatProps;

  let config = {} as IUseFormilyFieldConfig;
  if (withFormItem) {
    config = { ...UseFormilyFieldPropsFormItemConfig, ...UseFormilyFieldPropsFormFieldBaseConfig, ...(extraConfig || {}) };
  } else {
    config = { ...UseFormilyFieldPropsFormFieldBaseConfig, ...(extraConfig || {}) };
  }
  if (layout && !props?.noFormLayout) {
    formatProps.noField = props.noField ?? layout.noField;
    if (config?.fullWidth) formatProps.fullWidth = props.fullWidth ?? layout?.fullWidth;
    if (config?.labelPosition) formatProps.labelPosition = props.labelPosition ?? layout.labelPosition;
    if (config?.labelAlign) formatProps.labelAlign = props.labelAlign ?? layout.labelAlign;
    if (config?.labelWidth) formatProps.labelWidth = props.labelWidth ?? layout.labelWidth;
    if (config?.labelWrap) formatProps.labelWrap = props.labelWrap ?? layout.labelWrap;
    if (config?.wrapperAlign) formatProps.wrapperAlign = props.wrapperAlign ?? layout.wrapperAlign;
    if (config?.wrapperWidth) formatProps.wrapperWidth = props.wrapperWidth ?? layout.wrapperWidth;
    if (config?.wrapperWrap) formatProps.wrapperWrap = props.wrapperWrap ?? layout.wrapperWrap;
    if (config?.colon) formatProps.colon = props.colon ?? layout.colon;
    if (config?.tooltipIcon) formatProps.tooltipIcon = props.tooltipIcon ?? layout.tooltipIcon;
    if (config?.tooltipLayout) formatProps.tooltipLayout = props.tooltipLayout ?? layout.tooltipLayout;
    if (config?.showFeedback) formatProps.showFeedback = props.showFeedback ?? layout.showFeedback;
    if (config?.feedbackLayout) formatProps.feedbackLayout = props.feedbackLayout ?? layout.feedbackLayout;
    if (config?.showInnerLabel) formatProps.showInnerLabel = props.showInnerLabel ?? layout.showInnerLabel;
  }
  if (field && !props.noField) {
    if (config?.display) { formatProps.display = props.display ?? field.display; }
    if (config?.label) { formatProps.label = props.label ?? field.title; }
    if (config?.tooltip) { formatProps.tooltip = props?.tooltip ?? field.description; }
  }
  if (formatProps.noField || !field || isVoidField(field)) {
    return formatProps;
  }
  if (config?.defaultValue) {
    formatProps.defaultValue = field.initialValue ?? props.defaultValue;
  }
  if (config?.disabled) {
    formatProps.disabled = props.disabled ?? field.disabled;
  }
  if (config?.readOnly) {
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
