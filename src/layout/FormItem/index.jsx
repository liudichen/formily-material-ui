import React from 'react';
import { Tooltip } from '@mui/material';
import { useCreation } from 'ahooks';
import { isVoidField } from '@formily/core';
import { connect, mapProps } from '@formily/react';
import { ErrorOutlineOutlined, HighlightOffOutlined, CheckCircleOutline } from '@mui/icons-material';
import cls from 'classnames';

import './index.scss';
import { useFormLayout } from '../FormLayout';
import { useOverflow } from '../../hooks';
import { Popover } from '../../utils/Popover';

const useFormItemLayout = (props) => {
  const layout = useFormLayout() || {};
  return {
    ...props,
    labelPosition: props.labelPosition ?? layout.labelPosition,
    labelAlign: props.labelAlign ?? layout.labelAlign,
    labelWidth: props.labelWidth ?? layout.labelWidth,
    labelWrap: props.labelWrap ?? layout.labelWrap,
    wrapperAlign: props.wrapperAlign ?? layout.wrapperAlign,
    wrapperWidth: props.wrapperWidth ?? layout.wrapperWidth,
    wrapperWrap: props.wrapperWrap ?? layout.wrapperWrap,
    fullWidth: props.fullWidth ?? layout.fullWidth,
    colon: props.colon ?? layout.colon,
    tooltipIcon: props.tooltipIcon ?? layout.tooltipIcon,
    tooltipLayout: props.tooltipLayout ?? layout.tooltipLayout,
    showFeedback: props.showFeedback ?? layout.showFeedback,
    feedbackLayout: props.feedbackLayout ?? layout.feedbackLayout,
  };
};

const ICON_MAP = {
  error: <HighlightOffOutlined fontSize='small' />,
  success: <CheckCircleOutline fontSize='small' />,
  warning: <ErrorOutlineOutlined fontSize='small' />,
};

export const BaseItem = (props) => {
  const formatProps = useFormItemLayout(props);
  const {
    prefixCls, labelPosition, labelWidth, labelAlign, labelWrap, wrapperAlign, wrapperWrap, wrapperWidth, fullWidth, colon, tooltipIcon, tooltipLayout, showFeedback, feedbackLayout,
    noLabel, label, labelStyle: labelSx, wrapperStyle: wrapperSx, tooltip, required, display, feedbackStatus, feedbackText, feedbackIcon, extra, addonBefore,
    addonAfter, children, className, style, error,
  } = formatProps;
  const { overflow, containerRef, contentRef } = useOverflow();
  const labelStyle = useCreation(() => {
    const sx = labelSx || {};
    if (labelWidth && labelPosition === 'left') {
      sx.width = labelWidth === 'auto' ? undefined : labelWidth;
      sx.maxWidth = labelWidth === 'auto' ? undefined : labelWidth;
    }
    return sx;
  }, [ labelSx, labelWidth, labelPosition ]);
  const wrapperStyle = useCreation(() => {
    const sx = wrapperSx || {};
    if (wrapperWidth) {
      sx.width = wrapperWidth === 'auto' ? undefined : wrapperWidth;
      sx.maxWidth = wrapperWidth === 'auto' ? undefined : wrapperWidth;
    }
    return sx;
  }, [ wrapperSx, wrapperWidth ]);
  if (display !== 'visible') return null;
  const getOverflowTooltip = () => {
    if (overflow) {
      return (
        <div>
          <div>{label}</div>
          {!!tooltip && tooltip === 'text' && (<div>{tooltip}</div>)}
        </div>
      );
    }
  };
  const renderLabelText = () => {
    const labelChildren = (
      <div className={`${prefixCls}-label-content`} ref={containerRef}>
        <span ref={contentRef}>
          {required && <span className={`${prefixCls}-required`}>{'*'}</span>}
          <label>{label}</label>
        </span>
      </div>
    );
    if ((tooltipLayout === 'text' && tooltip) || overflow) {
      return ((
        <Tooltip placement='top' arrow title={getOverflowTooltip()}>
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
          [`${prefixCls}-label-tooltip`]: !!tooltip && tooltipLayout === 'text',
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
        [`${prefixCls}-label-align-${labelAlign}`]: true,
        [`${prefixCls}-control-align-${wrapperAlign}`]: true,
        [`${prefixCls}-label-wrap`]: !!labelWrap,
        [`${prefixCls}-control-wrap`]: !!wrapperWrap,
        [`${className}`]: !!className,
      })}
    >
      <div className={cls({
        [`${prefixCls}-row`]: labelPosition === 'left',
        [`${prefixCls}-column`]: labelPosition === 'top',
        [`${prefixCls}-error`]: !!error,
        [`${prefixCls}-${feedbackStatus}-help`]: [ 'warning', 'error' ].includes(feedbackStatus),
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
                [`${prefixCls}-control-content-component-has-feedback-icon`]: feedbackLayout === 'popover' && [ 'warning', 'error', 'success' ].includes(feedbackStatus),
              })}
            >
              {children}
              {showFeedback && feedbackLayout === 'popover' && [ 'warning', 'error', 'success' ].includes(feedbackStatus) && (
                <Popover
                  triggerType='hover'
                  trigger={(
                    <div className={cls({
                      [`${prefixCls}-feedback-icon}`]: true,
                      [`${prefixCls}-${feedbackStatus}-help`]: !!feedbackStatus,
                    })}>
                      {feedbackIcon ?? ICON_MAP[feedbackStatus]}
                    </div>
                  )}
                  content={
                    <div className={cls({ [`${prefixCls}-help`]: true })} >
                      <span className={`${prefixCls}-${feedbackStatus}-help`}>{ICON_MAP[feedbackStatus]}</span>
                      {feedbackText}
                    </div>
                  }
                />
              )}
            </div>
            {!!addonAfter && (
              <div className={cls(`${prefixCls}-addon-after`)}>{addonAfter}</div>
            )}
          </div>
        </div>
      </div>
      { showFeedback && feedbackLayout !== 'popover' && (
        <div
          className={cls({
            [`${prefixCls}-${feedbackStatus}-help`]: !!feedbackStatus,
            [`${prefixCls}-help`]: true,
          })}
        >
          {feedbackText || <>&nbsp;</>}
        </div>
      )}
      { !!extra && (<div className={`${prefixCls}-extra`}>{extra}</div>)}
    </div>
  );
};

BaseItem.defaultProps = {
  prefixCls: 'iimm-formily-item',
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
      feedbackStatus: takeFeedbackStatus(),
      feedbackText: props.feedbackText ?? takeMessage(),
      required: props.required ?? takeRequired(),
      tooltip: props.tooltip ?? field.description,
      display: props.display ?? field.display,
      error: props.error ?? field.selfInvalid,
    };
  })
);

FormItem.BaseItem = BaseItem;

export default FormItem;
