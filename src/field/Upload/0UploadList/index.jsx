import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useSafeState, useUpdate } from 'ahooks';
import classNames from 'classnames';

const previewImage = (file) => {};
const isImageUrl = (file) => {};
const isValidElement = () => {};
const cloneElement = () => {};

const prefixCls = '';

export const UploadList = forwardRef((props, ref) => {
  const {
    listType = 'text',
    previewFile = previewImage,
    onPreview,
    onDownload,
    onRemove,
    locale,
    iconRender,
    isImageUrl: isImgUrl = isImageUrl,
    prefixCls: customizePrefixCls,
    items = [],
    showPreviewIcon = true,
    showRemoveIcon = true,
    showDownloadIcon = false,
    removeIcon,
    previewIcon,
    downloadIcon,
    progress = { strokeWidth: 2, showInfo: false },
    appendAction,
    appendActionVisible = true,
    itemRender,
  } = props;
  const forceUpdate = useUpdate();
  const [motionAppear, setMotionAppear] = useSafeState(false);

  useEffect(() => {
    if (listType !== 'picture' && listType !== 'picture-card') {
      return;
    }
    (items || []).forEach((file) => {
      if (
        typeof document === 'undefined' ||
        typeof window === 'undefined' ||
        !(window).FileReader ||
        !(window).File ||
        !(file.originFileObj instanceof File || (file.originFileObj) instanceof Blob) ||
        file.thumbUrl !== undefined
      ) {
        return;
      }
      file.thumbUrl = '';
      if (previewFile) {
        previewFile(file.originFileObj).then((previewDataUrl) => {
          // Need append '' to avoid dead loop
          file.thumbUrl = previewDataUrl || '';
          forceUpdate();
        });
      }
    });
  }, [listType, items, previewFile]);
  useEffect(() => {
    setMotionAppear(true);
  }, []);
  // ============================= Events =============================
  const onInternalPreview = (file, e) => {
    if (!onPreview) {
      return;
    }
    e?.preventDefault();
    return onPreview?.(file);
  };
  const onInternalDownload = (file) => {
    if (typeof onDownload === 'function') {
      onDownload?.(file);
    } else if (file.url) {
      window.open(file.url);
    }
    const onInternalClose = (file) => {
      onRemove?.(file);
    };
    const internalIconRender = (file) => {
      if (iconRender) {
        return iconRender(file, listType);
      }
      const isLoading = file.status === 'uploading';
      const fileIcon = isImgUrl && isImgUrl(file) ? <PictureTwoTone /> : <FileTwoTone />;
      let icon = isLoading ? <LoadingOutlined /> : <PaperClipOutlined />;
      if (listType === 'picture') {
        icon = isLoading ? <LoadingOutlined /> : fileIcon;
      } else if (listType === 'picture-card') {
        icon = isLoading ? locale.uploading : fileIcon;
      }
      return icon;
    };
    const actionIconRender = (
      customIcon,
      callback,
      prefixCls,
      title
    ) => {
      const btnProps = {
        type: 'text',
        size: 'small',
        title,
        onClick: (e) => {
          callback();
          if (isValidElement(customIcon) && customIcon.props.onClick) {
            customIcon.props.onClick(e);
          }
        },
        className: `${prefixCls}-list-item-card-actions-btn`,
      };
      if (isValidElement(customIcon)) {
        const btnIcon = cloneElement(customIcon, {
          ...customIcon.props,
          onClick: () => {},
        });

        return <Button {...btnProps} icon={btnIcon} />;
      }
      return (
        <Button {...btnProps}>
          <span>{customIcon}</span>
        </Button>
      );
    };
    useImperativeHandle(ref, () => ({
      handlePreview: onInternalPreview,
      handleDownload: onInternalDownload,
    }));

    const listClassNames = classNames({
      [`${prefixCls}-list`]: true,
      [`${prefixCls}-list-${listType}`]: true,
    });

    // >>> Motion config
    const motionKeyList = [
      ...items.map((file) => ({
        key: file.uid,
        file,
      })),
    ];
    const animationDirection = listType === 'picture-card' ? 'animate-inline' : 'animate';

    let motionConfig = {
      motionDeadline: 2000,
      motionName: `${prefixCls}-${animationDirection}`,
      keys: motionKeyList,
      motionAppear,
    };

    if (listType !== 'picture-card') {
      motionConfig = {
        // ...listItemMotion,
        ...motionConfig,
      };
    }
    return (
      <div className={listClassNames}>
        <CSSMotionList {...motionConfig} component={false}>
          {({ key, file, className: motionClassName, style: motionStyle }) => (
            <ListItem
              key={key}
              locale={locale}
              prefixCls={prefixCls}
              className={motionClassName}
              style={motionStyle}
              file={file}
              items={items}
              progress={progress}
              listType={listType}
              isImgUrl={isImgUrl}
              showPreviewIcon={showPreviewIcon}
              showRemoveIcon={showRemoveIcon}
              showDownloadIcon={showDownloadIcon}
              removeIcon={removeIcon}
              previewIcon={previewIcon}
              downloadIcon={downloadIcon}
              iconRender={internalIconRender}
              actionIconRender={actionIconRender}
              itemRender={itemRender}
              onPreview={onInternalPreview}
              onDownload={onInternalDownload}
              onClose={onInternalClose}
            />
          )}
        </CSSMotionList>

        {/* Append action */}
        {appendAction && (
          <CSSMotion {...motionConfig} visible={appendActionVisible} forceRender>
            {({ className: motionClassName, style: motionStyle }) =>
              cloneElement(appendAction, (oriProps) => ({
                className: classNames(oriProps.className, motionClassName),
                style: {
                  ...motionStyle,
                  // prevent the element has hover css pseudo-class that may cause animation to end prematurely.
                  pointerEvents: motionClassName ? 'none' : undefined,
                  ...oriProps.style,
                },
              }))
            }
          </CSSMotion>
        )}
      </div>
    );
  };
});
