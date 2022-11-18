import React from 'react';
import { useCreation } from 'ahooks';
import { observer } from '@formily/react';
import { Tooltip } from '@mui/material';
import { ErrorOutlineOutlined, HighlightOffOutlined, CheckCircleOutline, RemoveOutlined } from '@mui/icons-material';
import cls from 'classnames';

import './index.scss';
import { useFormLayout } from '../FormLayout';
import { useOverflow, useFormilyFieldProps } from '../../hooks';
import { Popover } from '../../utils/component';

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

export const FormItem = observer((props) => {
  const formatProps = useFormItemLayout(props);
  const formilyFieldProps = useFormilyFieldProps(formatProps, { tooltip: true, label: true, error: true, required: true, readOnly: false, disabled: false, feedbackStatus: true, feedbackText: true, defaultValue: false });
  const {
    prefixCls, labelPosition, labelWidth, labelAlign, labelWrap, wrapperAlign, wrapperWrap, wrapperWidth, fullWidth, colon, tooltipIcon, tooltipLayout, showFeedback, feedbackLayout,
    noLabel, label, labelStyle: labelSx, wrapperStyle: wrapperSx, tooltip, required, feedbackStatus, feedbackText, feedbackIcon, extra, addonBefore,
    addonAfter, children, className, style, error, feedbackClassName, extraClassName,
    keepTopSpace,
  } = formilyFieldProps;
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
    if (labelPosition === 'inner' && keepTopSpace) {
      return (
        <div className={`${prefixCls}-label-content`}>
          <span>
            <label>&nbsp;</label>
          </span>
        </div>
      );
    }
    const labelChildren = (
      <div className={cls({
        [`${prefixCls}-label-content`]: true,
      })} ref={containerRef}>
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
    if (tooltip && tooltipLayout === 'icon' && labelPosition !== 'inner') {
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
    if (noLabel || !label || (labelPosition === 'inner' && !keepTopSpace)) return null;
    return (
      <div
        style={labelStyle}
        className={cls({
          [`${prefixCls}-label`]: true,
          [`${prefixCls}-label-tooltip`]: !!tooltip && tooltipLayout === 'text' && labelPosition !== 'inner',
        })}
      >
        {renderLabelText()}
        {renderTooltipIcon()}
        {label !== ' ' && labelPosition !== 'inner' && !!colon && (
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
                [`${prefixCls}-control-content-component-has-feedback-icon`]: feedbackLayout === 'popover',
              })}
            >
              {children}
              { showFeedback && feedbackLayout === 'popover' && ([ 'warning', 'error', 'success' ].includes(feedbackStatus) ? (
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
              ) : (
                <div
                  className={cls({
                    [`${prefixCls}-feedback-icon}`]: true,
                    [`${prefixCls}-blank-help`]: true,
                  })}
                >
                  {feedbackIcon ?? <RemoveOutlined fontSize='small' />}
                </div>
              )
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
            [`${feedbackClassName}`]: !!feedbackClassName,
          })}
        >
          {feedbackText || <>&nbsp;</>}
        </div>
      )}
      { !!extra && (<div className={cls({ [`${prefixCls}-extra`]: true, [`${extraClassName}`]: !!extraClassName })}>{extra}</div>)}
    </div>
  );
});

FormItem.defaultProps = {
  prefixCls: 'iimm-formily-item',
};

FormItem.displayName = 'muiFormilyFormItem';
