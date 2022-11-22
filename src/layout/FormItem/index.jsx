import React from 'react';
import { useCreation } from 'ahooks';
import { observer } from '@formily/react';
import { Tooltip } from '@mui/material';
import { ErrorOutlineOutlined, HighlightOffOutlined, CheckCircleOutline, RemoveOutlined } from '@mui/icons-material';
import cls from 'classnames';

import './index.scss';
import { useOverflow, useFormilyFieldProps } from '../../hooks';
import { Popover } from '../../utils/component';
import { prefixCls } from '../../utils';

const ICON_MAP = {
  error: <HighlightOffOutlined fontSize='small' />,
  success: <CheckCircleOutline fontSize='small' />,
  warning: <ErrorOutlineOutlined fontSize='small' />,
};

export const FormItem = observer((props) => {
  const formilyFieldProps = useFormilyFieldProps(props, { tooltip: true, label: true, error: true, required: true, readOnly: false, disabled: false, feedbackStatus: true, feedbackText: true, defaultValue: false,
    labelPosition: true, labelAlign: true, labelWidth: true, labelWrap: true, wrapperAlign: true, wrapperWidth: true, wrapperWrap: true, fullWidth: true, colon: true, tooltipIcon: true, tooltipLayout: true, showFeedback: true, feedbackLayout: true,
  });
  const {
    labelPosition, labelWidth, labelAlign, labelWrap, wrapperAlign, wrapperWrap, wrapperWidth, fullWidth, colon, tooltipIcon, tooltipLayout, showFeedback, feedbackLayout,
    noLabel, label, labelStyle: labelSx, wrapperStyle: wrapperSx, tooltip, required, feedbackStatus, feedbackText, feedbackIcon, extra, addonBefore,
    addonAfter, children, className, style, error, feedbackClassName, extraClassName,
    keepTopSpace,
  } = formilyFieldProps;
  const prefix = `${prefixCls}-form-item`;
  const { overflow, containerRef, contentRef } = useOverflow();
  const labelStyle = useCreation(() => {
    const sx = labelSx || {};
    if (labelWidth && labelPosition === 'left') {
      sx.width = labelWidth === 'auto' ? undefined : labelWidth;
      sx.maxWidth = labelWidth === 'auto' ? undefined : labelWidth;
    }
    return sx;
  }, [labelSx, labelWidth, labelPosition]);
  const wrapperStyle = useCreation(() => {
    const sx = wrapperSx || {};
    if (wrapperWidth) {
      sx.width = wrapperWidth === 'auto' ? undefined : wrapperWidth;
      sx.maxWidth = wrapperWidth === 'auto' ? undefined : wrapperWidth;
    }
    return sx;
  }, [wrapperSx, wrapperWidth]);
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
        <div className={`${prefix}-label-content`}>
          <span>
            <label>&nbsp;</label>
          </span>
        </div>
      );
    }
    const labelChildren = (
      <div className={cls({
        [`${prefix}-label-content`]: true,
      })} ref={containerRef}>
        <span ref={contentRef}>
          {required && <span className={`${prefix}-required`}>{'*'}</span>}
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
            <span style={{ cursor: 'help' }}>{tooltipIcon}</span>
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
          [`${prefix}-label`]: true,
          [`${prefix}-label-tooltip`]: !!tooltip && tooltipLayout === 'text' && labelPosition !== 'inner',
        })}
      >
        {renderLabelText()}
        {renderTooltipIcon()}
        {label !== ' ' && labelPosition !== 'inner' && !!colon && (
          <span className={`${prefix}-colon`}>:</span>
        )}
      </div>
    );
  };
  return (
    <div
      style={style}
      className={cls({
        [`${prefix}`]: true,
        [`${prefix}-${feedbackStatus}`]: !!feedbackStatus,
        [`${prefix}-feedback-has-text`]: !!feedbackText,
        [`${prefix}-fullness`]: !!fullWidth || !!feedbackIcon,
        [`${prefix}-label-align-${labelAlign}`]: true,
        [`${prefix}-control-align-${wrapperAlign}`]: true,
        [`${prefix}-label-wrap`]: !!labelWrap,
        [`${prefix}-control-wrap`]: !!wrapperWrap,
        [`${className}`]: !!className,
      })}
    >
      <div className={cls({
        [`${prefix}-row`]: labelPosition === 'left',
        [`${prefix}-column`]: labelPosition === 'top',
        [`${prefix}-error`]: !!error,
        [`${prefix}-${feedbackStatus}-help`]: ['warning', 'error'].includes(feedbackStatus),
      })}>
        {renderLabel()}
        <div className={`${prefix}-control`}>
          <div className={cls(`${prefix}-control-content`)}>
            {!!addonBefore && (
              <div className={cls(`${prefix}-addon-before`)}>
                {addonBefore}
              </div>
            )}
            <div
              style={wrapperStyle}
              className={cls({
                [`${prefix}-control-content-component`]: true,
                [`${prefix}-control-content-component-has-feedback-icon`]: feedbackLayout === 'popover',
              })}
            >
              {children}
              { showFeedback && feedbackLayout === 'popover' && (['warning', 'error', 'success'].includes(feedbackStatus) ? (
                <Popover
                  triggerType='hover'
                  trigger={(
                    <div className={cls({
                      [`${prefix}-feedback-icon}`]: true,
                      [`${prefix}-${feedbackStatus}-help`]: !!feedbackStatus,
                    })}>
                      {feedbackIcon ?? ICON_MAP[feedbackStatus]}
                    </div>
                  )}
                  content={
                    <div className={cls({ [`${prefix}-help`]: true })} >
                      <span className={`${prefix}-${feedbackStatus}-help`}>{ICON_MAP[feedbackStatus]}</span>
                      {feedbackText}
                    </div>
                  }
                />
              ) : (
                <div
                  className={cls({
                    [`${prefix}-feedback-icon}`]: true,
                    [`${prefix}-blank-help`]: true,
                  })}
                >
                  {feedbackIcon ?? <RemoveOutlined fontSize='small' />}
                </div>
              )
              )}
            </div>
            {!!addonAfter && (
              <div className={cls(`${prefix}-addon-after`)}>{addonAfter}</div>
            )}
          </div>
        </div>
      </div>
      { showFeedback && feedbackLayout !== 'popover' && (
        <div
          className={cls({
            [`${prefix}-${feedbackStatus}-help`]: !!feedbackStatus,
            [`${prefix}-help`]: true,
            [`${feedbackClassName}`]: !!feedbackClassName,
          })}
        >
          {feedbackText || <>&nbsp;</>}
        </div>
      )}
      { !!extra && (<div className={cls({ [`${prefix}-extra`]: true, [`${extraClassName}`]: !!extraClassName })}>{extra}</div>)}
    </div>
  );
});

FormItem.defaultProps = {

};

FormItem.displayName = 'muiFormilyFormItem';
