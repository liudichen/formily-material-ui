import React, { useState } from 'react';
import { Tooltip } from '@mui/material';
import { useCreation } from 'ahooks';
import { isVoidField } from '@formily/core';
import { connect, mapProps } from '@formily/react';
import cls from 'classnames';

import './index.scss';
import { useFormLayout } from '../FormLayout';


const getLayoutProps = (layout, props) => {
  const layoutProps = { ...(layout || {}) };
  const { prefixCls, labelPosition, labelAlign, labelWidth, labelWrap, wrapperAlign, wrapperWidth, wrapperWrap, fullWidth, colon, tooltipIcon, tooltipLayout, showFeedback } = props;
  if (prefixCls) layoutProps.prefixCls = prefixCls;
  if (labelPosition) layoutProps.labelPosition = labelPosition;
  if (labelAlign) layoutProps.labelAlign = labelAlign;
  if (typeof labelWidth !== 'undefined') layoutProps.labelWidth = labelWidth;
  if (typeof labelWrap === 'boolean') layoutProps.labelWrap = labelWrap;
  if (wrapperAlign) layoutProps.wrapperAlign = wrapperAlign;
  if (typeof wrapperWidth !== 'undefined') layoutProps.wrapperWidth = wrapperWidth;
  if (typeof wrapperWrap === 'boolean') layoutProps.wrapperWrap = wrapperWrap;
  if (typeof fullWidth === 'boolean') layoutProps.fullWidth = fullWidth;
  if (typeof colon === 'boolean') layoutProps.colon = colon;
  if (tooltipIcon) layoutProps.tooltipIcon = tooltipIcon;
  if (tooltipLayout) layoutProps.tooltipLayout = tooltipLayout;
  if (typeof showFeedback === 'boolean') layoutProps.showFeedback = showFeedback;
  return layoutProps;
};
export const BaseItem = (props) => {
  const {
    noLabel,
    label,
    labelStyle: labelSx,
    wrapperStyle: wrapperSx,
    tooltip,
    required,
    display,
    feedbackStatus,
    feedbackText,
    feedbackIcon,
    extra,
    addonBefore,
    addonAfter,
    children,
    className,
    style,
  } = props;
  const [ active, setActive ] = useState(false);
  const layout = useFormLayout();
  const { prefixCls,
    labelPosition,
    labelWidth,
    labelAlign,
    labelWrap,
    wrapperAlign,
    wrapperWrap,
    wrapperWidth,
    fullWidth,
    colon,
    tooltipIcon,
    tooltipLayout,
    showFeedback,
  } = getLayoutProps(layout, props);
  console.log('formITem', props, layout);
  const labelStyle = useCreation(() => {
    const sx = labelSx || {};
    if (labelWidth) {
      sx.width = labelWidth === 'auto' ? undefined : labelWidth;
      sx.maxWidth = labelWidth === 'auto' ? undefined : labelWidth;
    }
    return sx;
  }, [ labelSx, labelWidth ]);
  const wrapperStyle = useCreation(() => {
    const sx = wrapperSx || {};
    if (wrapperWidth) {
      sx.width = wrapperWidth === 'auto' ? undefined : wrapperWidth;
      sx.maxWidth = wrapperWidth === 'auto' ? undefined : wrapperWidth;
    }
    return sx;
  }, [ wrapperSx, wrapperWidth ]);
  if (display !== 'visible') return null;
  const renderLabelText = () => {
    const labelChildren = (
      <div className={`${prefixCls}-label-content`}>
        <span>
          {required && <span className={`${prefixCls}-required`}>{'*'}</span>}
          <label>{label}</label>
        </span>
      </div>
    );
    if ((tooltipLayout === 'text' && tooltip)) {
      return ((
        <Tooltip placement='top' arrow title={tooltip}>
          {labelChildren}
        </Tooltip>
      ));
    }
    return labelChildren;
  };
  const renderTooltipIcon = () => {
    if (tooltip && tooltipLayout === 'icon') {
      return (
        <span>
          <Tooltip placement='top' title={tooltip} arrow>
            <span>{tooltipIcon}</span>
          </Tooltip>
        </span>
      );
    }
  };
  const renderLabel = () => {
    if (noLabel || !label || labelPosition === 'inner') return null;
    return (
      <div
        style={labelStyle}
        className={cls({
          [`${prefixCls}-label`]: true,
          [`${prefixCls}-lalbel-tooltip`]: !!tooltip && tooltipLayout === 'text',
        })}
      >
        {renderLabelText()}
        {renderTooltipIcon()}
        {label !== ' ' && !!colon && (
          <span className={`${prefixCls}-colon`}>:</span>
        )}
      </div>
    );
  };
  return (
    <div
      style={style}
      className={cls({
        [`${prefixCls}`]: true,
        [`${prefixCls}-${feedbackStatus}`]: !!feedbackStatus,
        [`${prefixCls}-feedback-has-text`]: !!feedbackText,
        [`${prefixCls}-fullness`]: !!fullWidth || !!feedbackIcon,
        [`${prefixCls}-active`]: active,
        [`${prefixCls}-label-align-${labelAlign}`]: true,
        [`${prefixCls}-control-align-${wrapperAlign}`]: true,
        [`${prefixCls}-label-wrap`]: !!labelWrap,
        [`${prefixCls}-control-wrap`]: !!wrapperWrap,
        [`${className}`]: !!className,
      })}
      onFocus={() => { if (feedbackIcon) setActive(true); }}
      onBlur={() => { if (feedbackIcon) setActive(false); }}
    >
      <div className={cls({
        [`${prefixCls}-row`]: labelPosition === 'left',
        [`${prefixCls}-column`]: labelPosition === 'top',
      })}>
        {renderLabel()}
        <div className={`${prefixCls}-control`}>
          <div className={cls(`${prefixCls}-control-content`)}>
            {!!addonBefore && (
              <div className={cls(`${prefixCls}-addon-before`)}>
                {addonBefore}
              </div>
            )}
            <div
              style={wrapperStyle}
              className={cls({
                [`${prefixCls}-control-content-component`]: true,
                [`${prefixCls}-control-content-component-has-feedback-icon`]: !!feedbackIcon,
              })}
            >
              {children}
              {!!feedbackIcon && (
                <div className={cls(`${prefixCls}-feedback-icon`)}>
                  {feedbackIcon}
                </div>
              )}
            </div>
            {!!addonAfter && (
              <div className={cls(`${prefixCls}-addon-after`)}>{addonAfter}</div>
            )}
          </div>
        </div>
      </div>
      { showFeedback && (
        <div
          className={cls({
            [`${prefixCls}-${feedbackStatus}-help`]: !!feedbackStatus,
            [`${prefixCls}-help`]: true,
            [`${prefixCls}-help-enter`]: true,
            [`${prefixCls}-help-enter-active`]: true,
          })}
        >
          {feedbackText || ' '}
        </div>
      )}
      { !!extra && (<div className={`${prefixCls}-extra`}>{extra}</div>)}
    </div>
  );
};

export const FormItem = connect(
  BaseItem,
  mapProps((props, field) => {
    if (isVoidField(field)) {
      return {
        ...props,
        tooltip: props.tooltip ?? field.description,
        label: props.label ?? field.description,
        display: props.display ?? field.display,
      };
    }
    if (!field) return props;
    const takeFeedbackStatus = () => {
      if (field.validating) return 'pending';
      return field.decoratorProps.feedbackStatus || field.validateStatus;
    };
    const takeMessage = () => {
      const split = (messages) => {
        return messages.reduce((buf, text, index) => {
          if (!text) return buf;
          return index < messages.length - 1
            ? buf.concat([ text, ', ' ])
            : buf.concat([ text ]);
        }, []);
      };
      if (field.validating) return;
      if (props.feedbackText) return props.feedbackText;
      if (field.selfErrors.length) return split(field.selfErrors);
      if (field.selfWarnings.length) return split(field.selfWarnings);
      if (field.selfSuccesses.length) return split(field.selfSuccesses);
    };
    const takeRequired = () => {
      if (field.required && field.pattern !== 'readPretty') {
        return true;
      }
      if ('required' in props) {
        return props.required;
      }
      return false;
    };
    return {
      ...props,
      label: props.label ?? field.title,
      feedbackStatus: props.feedbackStatus ?? takeFeedbackStatus(),
      feedbackText: props.feedbackText ?? takeMessage(),
      required: props.required ?? takeRequired(),
      tooltip: props.tooltip ?? field.description,
      display: props.display ?? field.display,
    };
  })
);

FormItem.BaseItem = BaseItem;

export default FormItem;
