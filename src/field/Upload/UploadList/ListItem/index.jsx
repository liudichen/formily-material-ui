import { useMemoizedFn } from 'ahooks';
import { Tooltip } from '@mui/material';
import { IconTrash } from '@tabler/icons';
import classNames from 'classnames';

import { prefixCls as prefix } from '../../../../utils';
const prefixCls = `${prefix}-upload`;

const ListItem = (props) => {
  const {
    className,
    style,
    file,
    onClickThumb,
    iconRender,
    isImage, imageIndex,
    showPreviewIcon,
    showRemoveIcon,
    previewIcon: customPreviewIcon,
    removeIcon,
    onPreview,
    onRemove,
  } = props;
  const { status, message } = file;
  const iconNode = iconRender?.(file) || customPreviewIcon;
  let icon = (
    <div className={`${prefixCls}-text-icon`}>
      {iconNode}
    </div>
  );

  const isImg = isImage?.(file);
  const thumbnail = isImg ? (
    <img
      src={file.thumbUrl || file.url}
      alt={file.name}
      className={`${prefixCls}-list-item-image`}
    />
  ) : (
    iconNode
  );
  const aClassName = classNames({
    [`${prefixCls}-list-item-thumbnail`]: true,
    // [`${prefixCls}-list-item-file`]: !!isImg && !isImg,
  });
  icon = (
    <div
      className={aClassName}
    >
      {thumbnail}
    </div>
  );
  const handleOnPreview = useMemoizedFn(async (file, e, imageIndex) => {
    if (typeof onPreview === 'function') {
      onPreview(file, e);
    } else if (imageIndex !== -1 && typeof imageIndex === 'number' && typeof onClickThumb === 'function') {
      onClickThumb(imageIndex);
    }
  });

  const tooltip = (
    <>
      <div>{file.name}</div>
      {status === 'error' && (
        <div style={{ color: 'red' }}>
          {message}
        </div>
      )}
    </>
  );
  return (
    <div
      className={classNames({
        [`${prefixCls}-list-text-container`]: true, [`${prefixCls}-upload-item-error`]: status === 'error',
        [`${className}`]: !!className,
      })}
      sx={style}
    >
      { showPreviewIcon && (
        <div
          onClick={(e) => handleOnPreview(file, e, imageIndex)}
        >
          {icon}
        </div>
      )}
      <Tooltip title={tooltip} arrow placement='top'>
        <div className={`${prefixCls}-item-name`}>
          {file.name}
        </div>
      </Tooltip>
      {showRemoveIcon && typeof onRemove === 'function' && (
        <Tooltip title='删除' arrow placement='top'>
          <div
            className={`${prefixCls}-action-icon`}
            onClick={() => onRemove(file)}
          >
            {removeIcon || <IconTrash size='1.2rem' />}
          </div>
        </Tooltip>
      )}
    </div>
  );
};

export default ListItem;
