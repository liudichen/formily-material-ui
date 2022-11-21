import React from 'react';
import { useControllableValue, useMemoizedFn } from 'ahooks';
import { Button } from '@mui/material';
import { observer } from '@formily/react';
import classNames from 'classnames';

import { updateFileList, removeFileItem } from './util';
import { isImage, fileToBase64, prefixCls } from '../../utils';
import './styles.scss';
import UploadZone from './UploadZone';
import UploadList from './UploadList';
import { useFormilyFieldProps } from '../../hooks';

const defaultPreviewFile = (file) => {
  if (isImage(file)) {
    return fileToBase64(file);
  }
  return new Promise((resolve) => resolve(''));
};

export const Upload = observer((props) => {
  const formilyFieldProps = useFormilyFieldProps(props);
  const {
    // eslint-disable-next-line no-unused-vars
    value: valueProp, onChange: onChangeProp, defaultValue,
    ref, maxCount, transformFile,
    disabled, readOnly,
    onRemove, validator, onDropAccepted, accept, onDrop, onDropRejected, isImage: isImageProp = isImage, onPreview,
    previewFile, uploadListStyle, uploadListClassName, itemStyle, itemClassName, className,
    showPreviewIcon, showRemoveIcon, previewIcon, removeIcon, children, uploadButtonProps, uploadButtonText,
    ...restProps
  } = formilyFieldProps;
  const [fileList, setFileList] = useControllableValue(formilyFieldProps, { defaultValue: [] });
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
  return (
    <div className={classNames({
      [`${prefixCls}-upload`]: true,
      [`${className}`]: !!className,
    })}>
      <UploadZone
        ref={ref}
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
}, { forwardRef: true });

Upload.defaultProps = {
  showPreviewIcon: true,
  showRemoveIcon: true,
  previewFile: defaultPreviewFile,
};

Upload.displayName = 'muiFormilyUpload';
