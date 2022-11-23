import React from 'react';
import { useControllableValue, useMemoizedFn } from 'ahooks';
import { Button } from '@mui/material';
import classNames from 'classnames';

import { updateFileList, removeFileItem } from './util';
import { isImage, fileToBase64, prefixCls } from '../../utils';
import UploadZone from './UploadZone';
import UploadList from './UploadList';
import { FormItemBase } from '../../layout';
import './styles.scss';

const defaultPreviewFile = (file) => {
  if (isImage(file)) {
    return fileToBase64(file);
  }
  return new Promise((resolve) => resolve(''));
};

export const UploadBase = (props) => {
  const {
    labelPosition, labelWidth, labelAlign, labelWrap, wrapperAlign, wrapperWrap, wrapperWidth, fullWidth, colon, tooltipIcon, tooltipLayout, showFeedback, feedbackLayout,
    noLabel, label, labelStyle, wrapperStyle, tooltip, required, feedbackStatus, feedbackText, feedbackIcon, extra, addonBefore,
    addonAfter, formItemCls, formItemStyle: style, error, feedbackCls, extraCls,
    keepTopSpace,
    // eslint-disable-next-line no-unused-vars
    value: valueProp, onChange: onChangeProp, defaultValue, noField, noFormLayout, withFormItem,
    maxCount, transformFile,
    disabled, readOnly,
    onRemove, validator, onDropAccepted, accept, onDrop, onDropRejected, isImage: isImageProp = isImage, onPreview,
    previewFile, uploadListStyle, uploadListClassName, itemStyle, itemClassName, className,
    showPreviewIcon, showRemoveIcon, previewIcon, removeIcon, children, uploadButtonProps, uploadButtonText, uploadRef,
    ...restProps
  } = props;
  const [fileList, setFileList] = useControllableValue(props, { defaultValue: [] });
  const onInternalChange = useMemoizedFn(async (changedFileList) => {
    if (disabled || readOnly) return;
    let cloneList = [...(changedFileList || [])];
    if (maxCount === 1) {
      cloneList = cloneList.slice(-1);
    } else {
      cloneList = cloneList.slice(0, maxCount);
    }
    if (typeof transformFile === 'function') {
      for (let i = 0; i < cloneList.length; i++) {
        const file = await transformFile(cloneList[i]);
        cloneList[i] = file;
      }
    }
    setFileList(cloneList);
  });
  const handleRemove = useMemoizedFn(async (file) => {
    let res = onRemove;
    if (typeof res === 'function') {
      res = await onRemove();
    }
    if (res === false) { return; }
    const newFileList = removeFileItem(file, fileList);
    if (newFileList) {
      await onInternalChange(newFileList);
    }
  });
  const onInternalDropAccepted = useMemoizedFn(async (acceptedFiles, e) => {
    const newFileList = updateFileList(acceptedFiles, fileList);
    if (newFileList) {
      if (validator && typeof validator === 'function') {
        for (let i = 0; i < newFileList.length; i++) {
          const validatorStatus = await validator(newFileList[i]);
          if (validatorStatus) {
            newFileList[i].error = validatorStatus;
          }
        }
      }
      await onInternalChange(newFileList);
    }
    onDropAccepted?.(acceptedFiles, e);
  });
  const dom = (
    <div className={classNames({
      [`${prefixCls}-upload`]: true,
      [`${className}`]: !!className,
    })}>
      <UploadZone
        ref={uploadRef}
        multiple={maxCount !== 1}
        disabled={disabled || readOnly}
        accept={accept}
        onDrop={onDrop}
        onDropAccepted={onInternalDropAccepted}
        onDropRejected={onDropRejected}
        maxFiles={maxCount}
        validator={validator}
        {...restProps}
      >
        {children || (
          <Button variant='outlined' size='small' {...(uploadButtonProps || {})}>
            {uploadButtonText || '文件上传'}
          </Button>
        )}
      </UploadZone>
      <UploadList
        items={fileList || []}
        isImage={isImageProp}
        previewFile={previewFile}
        style={uploadListStyle ?? {}}
        className={uploadListClassName}
        itemClassName={itemClassName}
        itemStyle={itemStyle}
        onRemove={handleRemove}
        onPreview={onPreview}
        showPreviewIcon={showPreviewIcon}
        showRemoveIcon={showRemoveIcon && (!disabled && !readOnly)}
        previewIcon={previewIcon}
        removeIcon={removeIcon}
      />
    </div>
  );
  return withFormItem ? (
    <FormItemBase
      className={formItemCls}
      style={style}
      extra={extra}
      extraCls={extraCls}
      error={error}
      noLabel={noLabel}
      keepTopSpace={keepTopSpace}
      label={label}
      labelStyle={labelStyle}
      labelPosition={labelPosition}
      labelWidth={labelWidth}
      labelAlign={labelAlign}
      labelWrap={labelWrap}
      wrapperAlign={wrapperAlign}
      wrapperWrap={wrapperWrap}
      wrapperWidth={wrapperWidth}
      wrapperStyle={wrapperStyle}
      fullWidth={fullWidth}
      colon={colon}
      required={required}
      tooltip={tooltip}
      tooltipIcon={tooltipIcon}
      tooltipLayout={tooltipLayout}
      showFeedback={showFeedback}
      feedbackLayout={feedbackLayout}
      feedbackCls={feedbackCls}
      feedbackIcon={feedbackIcon}
      feedbackStatus={feedbackStatus}
      feedbackText={feedbackText}
      addonBefore={addonBefore}
      addonAfter={addonAfter}
    >
      {dom}
    </FormItemBase>
  ) : dom;
};

UploadBase.defaultProps = {
  showPreviewIcon: true,
  showRemoveIcon: true,
  previewFile: defaultPreviewFile,
};

UploadBase.displayName = 'muiFormilyUploadBase';
