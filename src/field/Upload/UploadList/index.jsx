import React from 'react';
import { useMemoizedFn, useSafeState, useUpdate } from 'ahooks';
import { ImageCarouselModal } from 'mui-component';
import { PhotoTwoTone, FilePresentTwoTone } from '@mui/icons-material';
import classNames from 'classnames';

import ListItem from './ListItem';
import { prefixCls } from '../../../utils';

const UploadList = (props) => {
  const {
    className,
    items,
    previewFile,
    onPreview,
    onRemove,
    iconRender,
    isImage,
    style,
    onClickThumb: onClickThumbProp,
    itemStyle,
    itemClassName,
    ...restProps
  } = props;
  const forceUpdate = useUpdate();
  const [open, setOpen] = useSafeState(false);
  const [selectedItem, setSelectedItem] = useSafeState(0);
  // 更新文件的预览图
  React.useEffect(() => {
    (items || []).forEach((file) => {
      if (!(typeof document === 'undefined' ||
        typeof window === 'undefined' ||
        !window?.FileReader ||
        !window?.File ||
        file.url !== undefined)) {
        file.url = '';
        if (previewFile) {
          previewFile(file).then((previewDataUrl) => {
          // Need append '' to avoid dead loop
            file.url = previewDataUrl || '';
            forceUpdate();
          });
        }
      }
    });
  }, [items, previewFile]);

  const internalIconRender = useMemoizedFn((file) => {
    if (typeof iconRender === 'function') {
      return iconRender(file);
    }
    return isImage?.(file) ?
      <PhotoTwoTone fontSize='large'/> :
      <FilePresentTwoTone fontSize='large'/>;
  });

  const imagesList = (items || []).filter((item) => isImage?.(item) && (item.url || item.thumbUrl)).map((item, index) => ({ src: item.url || item.thumbUrl, title: item.name, itemIndex: index }));

  const getImageIndex = useMemoizedFn((file, imagesList) => {
    const index = imagesList.filter((item) => item.src === file.url || item.src === file.thumbUrl)[0]?.itemIndex ?? -1;
    return index;
  });

  const onClickThumb = useMemoizedFn((index) => {
    if (index === -1) { return; }
    if (imagesList.length) {
      setSelectedItem(index);
      setOpen(true);
    }
    onClickThumbProp?.(index);
  });

  return (
    <div
      style={style}
      className={classNames({
        [`${prefixCls}-upload-list`]: true,
        [`${className}`]: !!className,
      })}
    >
      { !!imagesList.length && (
        <ImageCarouselModal
          images={imagesList}
          selectedItem={selectedItem}
          onChange={(index) => setSelectedItem(index)}
          open={open}
          onClose={() => setOpen(false)}
        />
      )}
      {items.map((file, index) => (
        <ListItem
          key={`${index}-${file.name}`}
          file={file}
          imagesList={imagesList}
          imageIndex={getImageIndex(file, imagesList)}
          onClickThumb={onClickThumb}
          onRemove={onRemove}
          onPreview={onPreview}
          iconRender={internalIconRender}
          isImage={isImage?.(file)}
          style={itemStyle}
          className={itemClassName}
          {...restProps}
        />
      ))}
    </div>
  );
};

export default UploadList;
