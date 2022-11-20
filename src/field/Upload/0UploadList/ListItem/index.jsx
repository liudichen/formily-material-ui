import { useMemoizedFn, useSafeState } from 'ahooks';
import { Box, Tooltip } from '@mui/material';
import classNames from 'classnames';

import { prefixCls as prefix } from '../../../../utils';
import { forwardRef, useEffect } from 'react';

const prefixCls = `${prefix}-upload`;

export const ListItem = forwardRef((props, ref) => {
  const {
    className,
    listType,
    file,
    locale,
    items,
    itemRender,
    iconRender,
    actionIconRender,
    isImgUrl,
    showPreviewIcon,
    showRemoveIcon,
    showDownloadIcon,
    previewIcon: customPreviewIcon,
    removeIcon: customRemoveIcon,
    downloadIcon: customDownloadIcon,
    onPreview,
    onDownload,
    onClose,
    sx,
  } = props;
  const { status } = file;
  const [mergedStatus, setMergedStatus] = useSafeState(status);
  useEffect(() => { if (status !== 'removed') setMergedStatus(status); }, [status]);

  const iconNode = iconRender(file);
  let icon = <div className={`${prefixCls}-text-icon`}> {iconNode}</ div>;
  if (listType === 'picture' || listType === 'picture-card') {
    if (!file.thumbUrl && !file.url) {
      const uploadingClassName = classNames({
        [`${prefixCls}-list-item-thumbnail`]: true,
        [`${prefixCls}-list-item-file`]: true,
      });
      icon = <div className={uploadingClassName}>{iconNode}</div>;
    } else {
      const isImg = isImgUrl?.(file);
      const thumbnail = isImg ? (
        <img
          src={file.thumbUrl || file.url}
          alt={file.name}
          className={`${prefixCls}-list-item-image`}
          crossOrigin={file.crossOrigin}
        />
      ) : (
        iconNode
      );
      const aClassName = classNames({
        [`${prefixCls}-list-item-thumbnail`]: true,
        [`${prefixCls}-list-item-file`]: !!isImgUrl && !isImg,
      });
      icon = (
        <a
          className={aClassName}
          onClick={(e) => onPreview(file, e)}
          href={file.url || file.thumbUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {thumbnail}
        </a>
      );
    }
  }
  const infoUploadingClass = classNames({
    [`${prefixCls}-list-item`]: true,
    [`${prefixCls}-list-item-${mergedStatus}`]: true,
    [`${prefixCls}-list-item-list-type-${listType}`]: true,
  });
  const linkProps =
      typeof file.linkProps === 'string' ? JSON.parse(file.linkProps) : file.linkProps;
  const removeIcon = showRemoveIcon
    ? actionIconRender(
      (typeof customRemoveIcon === 'function' ? customRemoveIcon(file) : customRemoveIcon) || (
        <DeleteOutlined />
      ),
      () => onClose(file),
      prefixCls,
      locale.removeFile
    )
    : null;
  const downloadIcon =
      showDownloadIcon && mergedStatus === 'done'
        ? actionIconRender(
          (typeof customDownloadIcon === 'function'
            ? customDownloadIcon(file)
            : customDownloadIcon) || <DownloadOutlined />,
          () => onDownload(file),
          prefixCls,
          locale.downloadFile
        )
        : null;
  const downloadOrDelete = listType !== 'picture-card' && (
    <span
      key="download-delete"
      className={classNames(`${prefixCls}-list-item-card-actions`, {
        picture: listType === 'picture',
      })}
    >
      {downloadIcon}
      {removeIcon}
    </span>
  );
  const listItemNameClass = classNames(`${prefixCls}-list-item-name`);
  const preview = file.url
    ? [
      <a
        key="view"
        target="_blank"
        rel="noopener noreferrer"
        className={listItemNameClass}
        title={file.name}
        {...linkProps}
        href={file.url}
        onClick={(e) => onPreview(file, e)}
      >
        {file.name}
      </a>,
      downloadOrDelete,
    ]
    : [
      <span
        key="view"
        className={listItemNameClass}
        onClick={(e) => onPreview(file, e)}
        title={file.name}
      >
        {file.name}
      </span>,
      downloadOrDelete,
    ];
  const previewStyle = {
    pointerEvents: 'none',
    opacity: 0.5,
  };
  const previewIcon = showPreviewIcon ? (
    <a
      href={file.url || file.thumbUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={file.url || file.thumbUrl ? undefined : previewStyle}
      onClick={(e) => onPreview(file, e)}
      title={locale.previewFile}
    >
      {typeof customPreviewIcon === 'function'
        ? customPreviewIcon(file)
        : customPreviewIcon || <EyeOutlined />}
    </a>
  ) : null;
  const actions = listType === 'picture-card' && mergedStatus !== 'uploading' && (
    <span className={`${prefixCls}-list-item-actions`}>
      {previewIcon}
      {mergedStatus === 'done' && downloadIcon}
      {removeIcon}
    </span>
  );
  let message;
  if (file.response && typeof file.response === 'string') {
    message = file.response;
  } else {
    message = file.error?.statusText || file.error?.message || locale.uploadError;
  }
  const spanClassName = `${prefixCls}-span`;
  const iconAndPreview = (
    <span className={spanClassName}>
      {icon}
      {preview}
    </span>
  );
  const dom = (
    <div className={infoUploadingClass}>
      <div className={`${prefixCls}-list-item-info`}>{iconAndPreview}</div>
      {actions}
    </div>
  );
  const listContainerNameClass = classNames(`${prefixCls}-list-${listType}-container`, className);
  const item =
      mergedStatus === 'error' ? (
        <Tooltip title={message} arrow placement='top'>
          {dom}
        </Tooltip>
      ) : (
        dom
      );
  return (
    <Box className={listContainerNameClass} sx={sx} ref={ref}>
      {itemRender
        ? itemRender(item, file, items, {
          download: onDownload.bind(null, file),
          preview: onPreview.bind(null, file),
          remove: onClose.bind(null, file),
        })
        : item}
    </Box>
  );
});
