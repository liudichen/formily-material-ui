import { useMemoizedFn, useSafeState } from 'ahooks';
import { Tooltip } from '@mui/material';
import classNames from 'classnames';

import { prefixCls as prefix } from '../../../../utils';
import { useEffect } from 'react';

const prefixCls = `${prefix}-upload`;

export const ListItem = (props) => {
  const {
    className,
    listType,
    file,
    items,
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
  } = props;
  const { status } = file;
  const [mergedStatus, setMergedStatus] = useSafeState(status);
  useEffect(() => { if (status !== 'removed') setMergedStatus(status); }, [status]);
  const [showProgress, setShowProgress] = useSafeState(false);


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
};
